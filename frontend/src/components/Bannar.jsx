import { ReactTyped } from "react-typed"
import {FaCalendarAlt} from "react-icons/fa"
import { useNavigate } from "react-router-dom"


const Banner = () => {
    const navigate = useNavigate()

    const handleSchedule = () => {
       navigate("/login") 
    }

    return (
        <div className="w-full h-full">
            <div
                className="h-svh w-full"
            >
                <div
                    className="text-white text-center w-full h-full flex flex-col
                    items-center mt-[50%] md:mt-[20%] lg:mt-[15%]">
                    <h1
                        className="text-2xl md:text-3xl font-bold lg:text-6xl lg:leading-[1.3]">
                        Coordinate and Conduct<br/>
                        <span className="bg-white text-pri rounded-md px-2 mr-1">
                            <ReactTyped
                                strings={["Effective", "Productive", "Successful"]}
                                typeSpeed={40}
                                backSpeed={50}
                                loop
                            />
                        </span> 
                        Peer Learning <br/>Sessions
                    </h1>
                    <h5 className="mt-5">Unlock Collaborative Learning</h5>
                    <button
                        className="bg-gradient-to-r from-blue to-pri px-4 py-3 pr-6
                            rounded-full mt-10 font-medium shadow-md flex justify-center items-center"
                        onClick={handleSchedule}
                    >
                        <FaCalendarAlt className="mr-2 ml-2"/>
                        Schedule a meeting
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Banner
