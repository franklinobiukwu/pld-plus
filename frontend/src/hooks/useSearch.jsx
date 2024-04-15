import { useState } from "react"
import useDispatchUser from "./useDispatchUser.jsx";

const useSearch = (field) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [results, setResults] = useState([])
    const {user} = useDispatchUser()

    const search = async (search_query) => {
        console.log("This is the search query",search_query)
        const endpoint = `${import.meta.env.VITE_BASE_API}/dashboard/discover-groups/search-bar/`
        console.log(endpoint)

        try{
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`,
                },
                body: JSON.stringify(search_query)
            })

            if (!response.ok){
                setError(true)
                setLoading(false)
                const err = await response.json()
                throw new Error(`Couldn't get search result: ${err}`)
            }

            const data = await response.json()
            console.log(data["data"])
            console.log(data["data"][0]["pld_group"])
            const res = data["data"].map(data => data[field])
            console.log(res)
            setResults(data)
            setLoading(false)
            // Return details
        } catch (error) {
            console.error(error)
        }
    }

    return {loading, error, results, search}
}
export default useSearch
