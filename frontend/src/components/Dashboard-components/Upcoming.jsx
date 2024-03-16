import {FaUsers} from "react-icons/fa"

const UpcomingCard = () => {
    return (
        <div className="mt-5">
            <div className="rounded-md shadow-md px-6 py-8 flex">
                {/* First display */}
                <div className="flex mr-5 border-r border-r-cream pr-5">
                    <div 
                        className="flex rounded-md p-2 bg-pri
                                    h-10 w-10 mr-2 items-center justify-center text-white">
                        <FaUsers/>
                    </div>
                    <div>
                        <p>Upcoming PLDs</p>
                        <p>3</p>
                    </div>
                </div>
                {/* Second Display */}
                <div className="flex">
                    <div 
                        className="flex rounded-md p-2 bg-pri
                                    h-10 w-10 mr-2 items-center justify-center text-white">
                        <FaUsers/>
                    </div>
                    <div>
                        <p>Upcoming PLDs</p>
                        <p>3</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpcomingCard
