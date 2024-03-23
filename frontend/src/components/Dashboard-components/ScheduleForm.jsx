import { Form } from "react-router-dom"
import { AiFillSchedule } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { useState } from "react";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

const ScheduleForm = (props) => {
    const [cohort, setCohort] = useState("")
    const [topic, setTopic] = useState("")
    const [datetime, setDatetime] = useState("")

    {/* Set Cohorts */}
    const cohorts = []
    for (let i = 1; i <= 18; i++){
        cohorts.push(i)
    }

    {/* Submit Schedule */}
    const handleSibmitSchedule = () => {
        if (cohort && topic && datetime) {
            const newSchedule = {
                cohort: cohort,
                topic: topic,
                datetime: datetime
            }

            {/* Delete this block: Testing Block*/}
            console.log(newSchedule)
            alert("Fake Post! Posting Form Details")

            {/* Post newSchedule to backend*/}

            {/* Reset form fields */}
            setCohort("")
            setTopic("")
            setDatetime("")

            {/* Close Form View */}
            props.openForm(false)
        }

    }

    const cancelSchedule = () => {
            {/* Reset form fields */}
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
                        Schedule PLD
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
                            <button onClick={handleSibmitSchedule} className="flex items-center bg-blue text-white px-4 py-1 rounded-md justify-end">
                                <AiFillSchedule className="mr-2"/>
                                Schedule
                            </button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default ScheduleForm
