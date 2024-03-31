import { FaCalendarDays, FaShareFromSquare, FaUsers } from "react-icons/fa6"

const BannerFeatures = () => {
    return (
        <div>
            <div className="md:flex justify-between ">

                {/* Component One*/}
                <div className=" shadow-md rounded-md bg-white2 p-6 flex justify-center items-center text-pri">
                    <div className="mr-4 text-2xl">
                        <FaCalendarDays />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold">Schedule meeting</h3>
                        <h6 className="text-lightgrey">Host a PLD meeting</h6>
                    </div>
                </div>
                {/* Component Two*/}
                <div className=" shadow-md rounded-md bg-white2 p-6 flex justify-center items-center text-pri">
                    <div className="mr-4 text-2xl">
                        <FaShareFromSquare />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold">Share group ID</h3>
                        <h6 className="text-lightgrey">Let peers join your meeting group</h6>
                    </div>
                </div>
                {/* Component Three*/}
                <div className=" shadow-md rounded-md bg-white2 p-6 flex justify-center items-center text-pri">
                    <div className="mr-4 text-2xl">
                        <FaUsers />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold">Enjoy meeting</h3>
                        <h6 className="text-lightgrey">Meet on preferred platform</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BannerFeatures
