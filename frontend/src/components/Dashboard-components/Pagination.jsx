import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";


const Pagination = (props) => {

    // Items per page
    const itemsPerPage = Math.ceil(props.totalItems/props.totalPages)
    // Set all page info in state
    const [currentPage, setCurrentPage] = useState(props.currentPage)

    const beginning = (currentPage * itemsPerPage) - (itemsPerPage - 1)
    const end = Math.min(currentPage * itemsPerPage, props.totalItems)


    const handlePrev = () => {
        props.loadItems((currentPage - 1))
        .then(() => {
            if (currentPage > 1) {
                setCurrentPage(prev => prev - 1)
            }
        })
    }

    const handleNext = () => {
        props.loadItems((currentPage + 1))
        .then(() => {
            if (end < props.totalItems) {
                setCurrentPage(currentPage + 1)
            }
        })
    }

    return (
        <div className="flex justify-end">
            <div className="flex justify-center items-center border-cream2 border rounded-md">
                {/* Items per page */}
                <div
                    className="flex justify-center items-center border-r-cream2
                                border-r p-1 px-4 bg-cream2">
                    <FiSettings className="mr-2"/>
                    <span>{itemsPerPage} per page</span>
                </div>
                {/* Paginate */}
                <div className="flex justify-center items-center">
                    <button
                        className="mr-2 px-2"
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                    >
                        <IoIosArrowBack className={`${currentPage=== 1 && "text-cream" }`}/>
                    </button>
                    <span className="px-2 py-1">{ beginning } - { end }</span>
                    <button
                        className="ml-2 px-2"
                        onClick={handleNext}
                        disabled={end >= props.totalItems}
                    >
                        <IoIosArrowForward className={`${end >= props.totalItems && "text-cream"}`}/>
                    </button>
                </div>
            </div>
        </div>

    )
}
export default Pagination
