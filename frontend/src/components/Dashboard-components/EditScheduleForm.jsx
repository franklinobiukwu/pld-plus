import {Form} from "react-router-dom"
import { MdCancel } from "react-icons/md";
import { useEffect, useState } from "react";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { useDispatch } from "react-redux";
import useDispatchUser from "../../hooks/useDispatchUser";

const EditScheduleForm = (props) => {
    console.log(props.formData)
    const utcDateString = props.formData.datetime
    const formattedDataString = utcDateString?new Date(utcDateString).toISOString().slice(0, 16):""

    const [cohort, setCohort] = useState(props.formData.cohort || "")
    const [topic, setTopic] = useState(props.formData.topic || "")
    const [datetime, setDatetime] = useState(formattedDataString)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (props.formData) {
            setCohort(cohort?cohort:props.formData.cohort || "")
            setTopic(topic?topic:props.formData.topic || "")
            setDatetime(datetime?datetime:formattedDataString)
        }
    }, [props.formData, cohort, topic, datetime])

    // Set Cohorts
    const cohorts = []
    for (let i = 1; i <= 18; i++){
        cohorts.push(i)
    }


    const endpoint = `${import.meta.env.VITE_BASE_API}/dashboard/schedule/update/${props.formData.id}`
    const {user} = useDispatchUser()


    {/* Edit Schedule Handler */}
    const handleEditSchedule = () => {
        setLoading(true)
        const updatedSchedule = {
            cohort: cohort?cohort:props.formData.cohort,
            topic: topic?topic:props.formData.topic,
            date: datetime?datetime:formattedDataString,
            current_user_id: props.formData.user_id
        }
            
        {/* Delete this block: Testing Block */}
        console.log("updated schedule", updatedSchedule)

        // Post newSchedule to backend
        const editSchedule = async () => {
            try{
               const response = await fetch(endpoint, {
                    method: "PUT",
                   headers: {
                        "Content-Type": "application/json",
                       "Authorization": `Bearer ${user.token}`
                   },
                   body: JSON.stringify(updatedSchedule)
               }) 

                if (!response.ok){
                    const err = await response.json()
                    setLoading(false)
                    throw new Error("Sorry, couldn't edit schedule", err)
                }

                const data = await response.json()
                console.log("Edited!!", data.schedule)
                // Close Form View
                props.openForm(false)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.error(error.message)
                console.log(error.message)
            }
        }
        editSchedule()

        // Reset form fields
        setCohort("")
        setTopic("")
        setDatetime("")


    }

    const cancelSchedule = () => {
            // Reset form fields
            setCohort("")
            setTopic("")
            setDatetime("")
            props.openForm(false)
    }


    return (
        <div>
            <div className="bg-white2 px-6 py-6 rounded-md shadow-md max-w-md">
                <Form>
                    <h3 className="font-medium text-lg text-center mb-6">
                        Edit PLD Schedule
                    </h3>
                    <div>
                        <label htmlFor="cohort">Choose Cohort</label>
                        <select
                            name="cohort" id="cohort" 
                            className="px-2 border border-cream rounded-md w-full mb-4"
                            onChange={(e)=>setCohort(e.target.value)}
                            value={cohort}
                        >
                            <option value="" disabled>Select Cohort</option>
                            {cohorts.map((cohort, id )=>{
                                return <option value={cohort} key={id}>{`${cohort}`}</option>
                            })}
                        </select>

                        <label htmlFor="topic" className="">Topic</label>
                        <input
                            name="topic"
                            className="px-2 border border-cream rounded-md w-full mb-4" 
                            type="text"
                            placeholder="Intro to Python OOP"
                            onChange={(e)=>setTopic(e.target.value)}
                            value={topic}
                        />

                        <label htmlFor="date">Date / Time</label>
                        <input
                            className="px-2 border border-cream rounded-md w-full mb-10"
                            type="datetime-local"
                            onChange={(e)=>setDatetime(e.target.value)}
                            value={datetime}
                        />
        
                        {/* Form Buttons */}
                        <div className="flex justify-end">
                            <button onClick={cancelSchedule} className="flex items-center bg-red text-white px-4 py-1 rounded-md justify-end mr-4">
                                <MdCancel className="mr-2" />
                                Cancel
                            </button>
                            <button onClick={handleEditSchedule} className="flex items-center bg-blue text-white px-4 py-1 rounded-md justify-end">
                                <IoCheckmarkDoneCircle className="mr-2"/>
                                Done
                            </button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default EditScheduleForm
