import { useEffect, useState } from "react"
import UpcomingPldList from "./UpcomingList"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import { useSelector } from "react-redux"
import useDispatchUser from "../../hooks/useDispatchUser.jsx"
import { Link } from "react-router-dom"

const AsideUpcoming =() => {
    const pldGroups = useSelector(state => state.pldGroups.pldGroups)
    const [filteredPlds, setFilteredPlds] = useState([])
    const [more, setMore] = useState(false)
    const { user } = useDispatchUser()



    useEffect(() => {
        if (pldGroups){
            const filtered = pldGroups.filter((pldGroup) => {
                const dateObj = new Date(pldGroup.datetime)
                const now = new Date()
                if (dateObj >= now && pldGroup.members_id.includes(user.id)) return pldGroup
            })
            // Sort filtered
            filtered.sort((a, b) => new Date(a.datetime) - new Date(b.datetime))

            // Setmore if pldgroup is more than 3
            if (filtered.length > 3) {
                setMore(true)
            }
            setFilteredPlds(filtered.slice(0, 3))
        }
    }, [pldGroups])

    return (
        <div>
            <h3 className="text-xs font-semibold border-b border-b-cream2 mt-4">UP COMING PLDS</h3>
            <div className="mt-2">
                { !pldGroups?(
                    <Skeleton/>
                ):
                    filteredPlds.length > 0 ?
                        filteredPlds.map((pldGroup) => {
                            return <UpcomingPldList pld={pldGroup} key={pldGroup.id}/>
                    }) : (<p className="text-sm mt-2 text-lightgrey">No up coming plds</p>)
                }
            </div>
            <div>
                { more &&
                <p className="flex justify-end">
                    <Link to="my-groups" className="text-pri text-sm mt-1">See more</Link>
                </p>
                }
            </div>
        </div>
    )
}

export default AsideUpcoming
