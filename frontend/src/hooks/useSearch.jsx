import { useState } from "react"

const useSearch = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [results, setResults] = useState([])

    const search = async (search_query) => {
        const endpoint = `${import.meta.env.VITE_BACKEND_API}/dashboard/discover-groups/search-bar/`

        try{
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`,
                },
                body: search_query
            })

            if (!response.ok){
                setError(true)
                setLoading(false)
                throw new Error("Couldn't get search result")
            }

            const data = await response.json()
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
