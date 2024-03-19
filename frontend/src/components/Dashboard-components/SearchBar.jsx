import { FaSearch } from "react-icons/fa"

const SearchBar = () => {
    return (
        <div>
            <div>
                <form className="flex items-center">
                    <input type="text" placeholder="search pld id" className="shadow-md px-2 py-1 bg-white2 mr-2 md:w-80"/>
                    <button className="bg-pri text-white p-2 rounded-md shadow-md">
                        <FaSearch/>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SearchBar
