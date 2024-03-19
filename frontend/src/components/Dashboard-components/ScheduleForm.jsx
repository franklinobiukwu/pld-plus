import { Form } from "react-router-dom"
import { AiFillSchedule } from "react-icons/ai";

const ScheduleForm = () => {
    const cohorts = [11, 12, 13, 14, 15, 16, 17, 18]

    return (
        <div>
            <div className="bg-white2 px-6 py-6 rounded-md shadow-md max-w-md">
                <Form>
                    <h3 className="font-medium text-lg text-center mb-6">Schedule PLD</h3>
                    <div>
                        <label for="cohort">Choose Cohort</label>
                        <select name="cohort" id="cohort" className="px-2 border border-cream rounded-md w-full mb-4">
                            <option value="" disabled selected>Select Cohort</option>
                            {cohorts.map((cohort, id )=>{
                                return <option value={cohort} key={id}>{`${cohort}`}</option>
                            })}
                        </select>

                        <label for="topic" className="">Topic</label>
                        <input name="topic" className="px-2 border border-cream rounded-md w-full mb-4" type="text" placeholder="Intro to Python OOP"/>

                        <label for="date">Date / Time</label>
                        <input className="px-2 border border-cream rounded-md w-full mb-10" type="datetime-local" placeholder="Date/Time"/>
                        <div className="flex justify-end">
                        <button className="flex items-center bg-blue text-white px-4 py-1 rounded-md justify-end">
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
