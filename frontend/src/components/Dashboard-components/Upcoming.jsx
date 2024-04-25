import { useEffect, useState } from "react"
import {FaUsers} from "react-icons/fa"
import useDispatchUser from "../../hooks/useDispatchUser.jsx";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { PiChalkboardTeacherDuotone } from "react-icons/pi";

const UpcomingCard = () => {
    const [upcomingPlds, setUpcomingPlds] = useState(null)
    const [hosting, setHosting] = useState(null)


    const pldGroups = useSelector(state => state.pldGroups.pldGroups)
    const { user } = useDispatchUser()

    useEffect(() => {
        // Upcoming PLDs
        if (pldGroups) {
            const filteredUpcoming = pldGroups.filter(pldGroup => {
                const dateObj = new Date(pldGroup.datetime)
                const now = new Date()
                if (dateObj >= now && pldGroup.members_id.includes(user.id)) return pldGroup
            })

            setUpcomingPlds(filteredUpcoming.length)
            
            // PLD You're Hosting
            let totalHosting = 0
            filteredUpcoming.map(pld => {
                if (pld.user_id === user.id) {
                    totalHosting += 1
                }
            })
            setHosting(totalHosting)
        }

    }, [pldGroups])


    return (
        <div>
                <div className="rounded-md shadow-md px-6 py-8 flex bg-white2">
                {/* First display */}
                <div className="flex mr-5 border-r border-r-cream2 pr-5">
                    <div 
                        className="flex rounded-md p-2 bg-pri
                                    h-10 w-10 mr-2 items-center justify-center text-white">
                        <FaUsers/>
                    </div>
                    <div>
                        <p>Upcoming PLDs</p>
                        <p>
                            { upcomingPlds === null? <Skeleton count={1}/>
                                : upcomingPlds 
                            }
                        </p>
                    </div>
                </div>
                {/* Second Display */}
                <div className="flex">
                    <div 
                        className="flex rounded-md p-2 bg-pri
                                    h-10 w-10 mr-2 items-center justify-center text-white">
                        <PiChalkboardTeacherDuotone />
                    </div>
                    <div>
                        <p>PLDs Hosting</p>
                        <p>
                            { hosting === null? <Skeleton count={1}/>
                                : hosting
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpcomingCard
