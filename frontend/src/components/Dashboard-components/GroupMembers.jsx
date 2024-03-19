import GroupMemberList from "./GroupMemberList"
import { TbPlugConnected } from "react-icons/tb"
import { IoExit } from "react-icons/io5"
import { RiLightbulbFlashLine } from "react-icons/ri"
import {FaCalendarAlt } from "react-icons/fa"
import { BsFillClockFill } from "react-icons/bs"
import bannerImg from "../../images/groupImg.png"


const GroupMembers = () => {

    const backgroundStyle = {
        backgroundImage: `url(${bannerImg})`
    }

    return (
        <div>
            <h3 className="text-xs font-medium border-b border-b-cream2">YOUR GROUP MEMBERS</h3>
        <div className="shadow-md border-t-8 rounded-md border-pri mt-2">
            <hr className="text-cream2 mt-4"/>

        <div className="px-4 pb-8">
            {/* Title Card */}
            <div
                className={`shadow-sm rounded-md py-4 px-4 mt-2 bg-cover`}
                style={backgroundStyle}
            >
                <div className="flex items-center text-xl font-medium">
                    <RiLightbulbFlashLine />
                    <p>Introduction to JavaScript</p> {/* Meeting Title*/}
                </div>

                <div className="flex justify-between">
                    <div className="flex">
                        <div className="flex items-center mr-10">
                            <FaCalendarAlt className="mr-2"/>
                            <span className="text-sm">Jun 4, 2024</span> {/* Date of Meeting */}
                        </div>
                        <div className="flex items-center">
                            <BsFillClockFill className="mr-2"/>
                            <span className="text-sm">10:30 am</span> {/* Time of Meeting*/}
                        </div>
                    </div>
                    <span className="flex items-center bg-white px-2 rounded-md text-xs font-medium">GHKDP</span> {/* Meeting Id*/}
                </div>
            </div>


            {/* Group Member List*/}
            <div className="mt-4">
                <GroupMemberList label="Host" name="Franklin Obiukwu"/>
                <GroupMemberList label="Member" name="Roman Sne"/>
            </div>
            {/* Buttons */}
            <div className="flex justify-around mt-8">
                <button className="rounded-md bg-red
                        px-4 py-2 flex justify-center items-center text-white">
                    <IoExit className="mr-2"/>
                    Leave group
                </button>
                <button className="rounded-md bg-blue
                        px-4 py-2 flex justify-center items-center text-white">
                    <TbPlugConnected className="mr-2"/>
                    Join meet
                </button>
            </div>
        </div>
        </div>
        </div>
    )
}

export default GroupMembers
