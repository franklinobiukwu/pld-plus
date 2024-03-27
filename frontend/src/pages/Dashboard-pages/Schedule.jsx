import ScheduleForm from "../../components/Dashboard-components/ScheduleForm"
import ScheduleCard from "../../components/Dashboard-components/ScheduleCard"
import { FaPlus } from "react-icons/fa"
import { useEffect, useMemo, useRef, useState } from "react"
import { useLoaderData } from "react-router-dom"
import EditScheduleForm from "../../components/Dashboard-components/EditScheduleForm.jsx"
import SearchBar from "../../components/Dashboard-components/SearchBar.jsx";

const Schedule = () => {
    const [openForm, setOpenForm] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [formData, setFormData] = useState({})
    const [query, setQuery] = useState("")

    const schedules = useLoaderData()

    const filteredSchedules = useMemo(() => {
        return schedules.filter(schedule => {
        return (schedule.group_id.toLowerCase().includes(query.toLowerCase()) ||
            schedule.topic.toLowerCase().includes(query.toLowerCase()))
    })}, [schedules, query])

    const handleOpenForm = () => {
        setOpenForm(!openForm)
    }
    const handleEdit = (schedule) => {
        setFormData(schedule)
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
                {filteredSchedules?filteredSchedules.map((schedule) => {
                   return (<ScheduleCard
                                schedule={schedule}
                                openForm={setOpenEdit}
                                handleEdit={handleEdit}
                                key={schedule.id}
                            />)
                }):"No Schedule"}
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

export const scheduleLoader = async () => {
    const api = `${import.meta.env.VITE_BASE_API}/schedules`
    const res = await fetch(api)

    return res.json()
}
