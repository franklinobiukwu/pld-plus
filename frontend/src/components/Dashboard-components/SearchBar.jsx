import { useState } from "react"
import { FaSearch } from "react-icons/fa"

const SearchBar = (props) => {
    return (
        <div>
            <div>
                <form className="flex items-center">
                    <input
                        value={props.useQuery.query}
                        type="search" 
                        placeholder={props.placeholder}
                        className="shadow-md px-2 py-1 bg-white2 mr-2 md:w-80 border-cream2 border rounded-md"
                        onChange={(e)=>props.useQuery.setQuery(e.target.value)}
                    />
                    <button className="bg-pri text-white p-2 rounded-md shadow-md">
                        <FaSearch/>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SearchBar
