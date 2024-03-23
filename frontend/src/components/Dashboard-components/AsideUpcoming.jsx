import { useEffect, useState } from "react"
import UpcomingPldList from "./UpcomingList"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

const AsideUpcoming =() => {
    const [plds, setPlds] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const endpoint = `${import.meta.env.VITE_BASE_API}/schedules`

    useEffect(() => {
        const loadUpcomingPldList = async () => {
            const res = await fetch(endpoint)

            if (!res.ok){
                isLoading(false)
                console.log("Error loading upcoming pld list")
                throw new Error("Couldn't load upcoming pld list")
            }

            const data = await res.json()
            setPlds(data)
            setIsLoading(false)
        }

        loadUpcomingPldList()
    },[])

    return (
        <div>
            <h3 className="text-xs font-semibold border-b border-b-cream2 mt-4">UP COMING PLDS</h3>
            <div className="mt-2">
                { isLoading?(
                    <Skeleton/>
                ):(
                    plds.map((pld) => {
                        return <UpcomingPldList pld={pld} key={pld.id}/>
                    })
                )}
            </div>
        </div>
    )
}

export default AsideUpcoming
