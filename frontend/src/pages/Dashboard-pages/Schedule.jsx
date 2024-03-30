import ScheduleForm from "../../components/Dashboard-components/ScheduleForm"
import ScheduleCard from "../../components/Dashboard-components/ScheduleCard"
import { FaPlus } from "react-icons/fa"
import { useEffect, useMemo, useState } from "react"
import EditScheduleForm from "../../components/Dashboard-components/EditScheduleForm.jsx"
import SearchBar from "../../components/Dashboard-components/SearchBar.jsx";
import { useDispatch, useSelector } from "react-redux"
import useDispatchUser from "../../hooks/useDispatchUser.jsx"
import {setSchedule} from "../../features/scheduleSlice.jsx"
import Skeleton from "react-loading-skeleton"

const Schedule = () => {
    const [openForm, setOpenForm] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [formData, setFormData] = useState({})
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState("")
    const dispatch = useDispatch()

    const endpoint = `${import.meta.env.VITE_BASE_API}/dashboard/schedules`
    const schedules = useSelector(state => state.schedules.schedules)

    const {user} = useDispatchUser()

    useEffect(()=>{
        const getSchedules = async () => {
            try {
                const response = await fetch(endpoint, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user.token}`
                    }
                })

                if (!response.ok){
                    setLoading(false)
                    throw Error("Error getting Schedule")
                }

                const data = await response.json()
                console.log(data.schedules)
                const allSchedules = data.schedules.map(item => {
                    const {date, ...rest} = item
                    return {...rest, datetime: date}
                })
                console.log(allSchedules)
                 // Set Schedule
                dispatch(setSchedule(allSchedules))
                setLoading(false)
            } catch (error) {
                console.error("Error fetching schedules:", error.message)
            }
        }
        getSchedules()
    }, [])
    

    const filteredSchedules = useMemo(() => {
        return schedules.filter(schedule => {
        return (String(schedule.unique_group_id).toLowerCase().includes(query.toLowerCase()) ||
            String(schedule.topic).toLowerCase().includes(query.toLowerCase()) || String(schedule.cohort).toLowerCase().includes(query.toLowerCase()))
    })}, [schedules, query])

    const handleOpenForm = () => {
        setOpenForm(prevOpenForm => !prevOpenForm)
    }
    const handleEdit = (schedule) => {
        setFormData(schedule)
        setOpenEdit(true)
    }

    const genStyle = `ease-in-out duration-500`

    return (
        <div className="relative min-h-full">
            {/* Search Schedule*/}
            <SearchBar useQuery={{'query': query, 'setQuery': setQuery}} placeholder="search schedule id"/>
            {/* Add New Schedule Button */}
            <div className="flex mt-10">
                <button
                    onClick={handleOpenForm}
                    className="bg-pri text-white flex items-center px-4 py-2 rounded-md"
                >
                    <FaPlus className="text-white mr-2"/>
                    New
                </button>
            </div>
            {/* Schedule Cards*/}
            <div className="md:grid sm:grid-cols-2 gap-4 mt-10">
                {loading?(
                    <Skeleton count={3}/>
                ):(
                    filteredSchedules?filteredSchedules.map((schedule) => {
                        return (<ScheduleCard
                                    schedule={schedule}
                                    openForm={setOpenEdit}
                                    handleEdit={handleEdit}
                                    key={schedule.id}
                                />)
                }):"No Schedule")}
            </div>
            {/* Schedule Form */}
            <div  className={openForm?`${genStyle} absolute top-0 bg-[#ffffffe6] w-full h-full flex
                                            justify-center`:`${genStyle} w-0 h-0 overflow-hidden`}>
                <div className="mt-[20vh]">
                    <ScheduleForm
                        openForm={setOpenForm}
                    />
                </div>
            </div>

            {/* Edit Schedule Form */}
            <div  className={openEdit?`${genStyle} absolute top-0 bg-[#ffffffe6] w-full h-full flex
                                            justify-center`:`${genStyle} w-0 h-0 overflow-hidden`}>
                <div className="mt-[20vh]">
                    <EditScheduleForm
                        openForm={setOpenEdit}
                        formData={formData}
                        setFormData={setFormData}
                        handleEdit={handleEdit}
                    />
                </div>
            </div>
        </div>
    )
}

export default Schedule
