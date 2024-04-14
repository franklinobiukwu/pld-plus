import ScheduleForm from "../../components/Dashboard-components/ScheduleForm"
import ScheduleCard from "../../components/Dashboard-components/ScheduleCard"
import { FaPlus } from "react-icons/fa"
import { useMemo, useState } from "react"
import EditScheduleForm from "../../components/Dashboard-components/EditScheduleForm.jsx"
import SearchBar from "../../components/Dashboard-components/SearchBar.jsx";
import { useSelector } from "react-redux"
import Skeleton from "react-loading-skeleton"
import Pagination from "../../components/Dashboard-components/Pagination.jsx";
import useLoadSchedules from "../../hooks/useLoadSchedules.jsx";

const Schedule = () => {
    const [openForm, setOpenForm] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [formData, setFormData] = useState({})
    const [query, setQuery] = useState("")
    const { loadSchedules } = useLoadSchedules()
    const schedules = useSelector(state => state.schedules.schedules)
    const schedulesInfo = useSelector(state => state.schedules.schedulesInfo)
    const [loading, setLoading] = useState(true)



    const filteredSchedules = useMemo(() => {
        setLoading(false)
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
        <div className="relative min-h-full flex flex-col">
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
            <div className="grow">
            <div className="md:grid sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-10 ease-in-out duration-300">
                {loading?(
                    <div className="w-96">
                        <Skeleton count={3}/>
                    </div>
                ):(
                    filteredSchedules.length > 0?filteredSchedules.map((schedule) => {
                        return (<ScheduleCard
                                    schedule={schedule}
                                    openForm={setOpenEdit}
                                    handleEdit={handleEdit}
                                    key={schedule.id}
                                />)
                }):<p className="text-lightgrey text-sm">No Schedule</p>)}
            </div>
            </div>
            {/* Pagination */}
            <div>
               { schedulesInfo && <Pagination
                    currentPage={schedulesInfo.current_page}
                    totalPages={schedulesInfo.total_pages}
                    totalItems={schedulesInfo.total_schedules}
                    loadItems={loadSchedules}
                    />
               }
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
