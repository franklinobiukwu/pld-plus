import { useState } from "react"
import { FaEdit } from "react-icons/fa"
import { IoCheckmarkDoneCircle } from "react-icons/io5"
import { MdCancel } from "react-icons/md"
import { ThreeDots } from "react-loader-spinner"


const ProfileBtns = (props) => {
    const [edit, setEdit] = useState(false)

    
    {/* Button Function Handlers */}
    const handleAccountEdit = () => {
        props.gather()
        setEdit(true)
        props.setFormEdit(true)
    }
    const handleAccountCancel = () => {
        setEdit(false)
        props.setFormEdit(false)
        props.cancel()
    }
    const handleAccountSave = () => {
        props.handleEdit()
        setEdit(false)
    }


    const btnStyle = `px-4 py-1 bg-gradient-to-t rounded-md font-medium
    text-white flex items-center`

    
    return (
        <div className="flex justify-end mt-5 md:mt-10">

            {edit?(
                <div className="flex">
                    <button
                        className={`${btnStyle} bg-red mr-4`}
                        onClick={() => handleAccountCancel()}
                    >
                        <span className="flex justify-center items-center">
                            <MdCancel className="mr-2" />
                            <span>Cancel</span>
                        </span>
                    </button>

                    <button
                        className={`${btnStyle} bg-whiten border-2 border-grey`}
                        onClick={handleAccountSave}
                    >
                        <span className="flex justify-center items-center text-grey">
                            <IoCheckmarkDoneCircle className="mr-2"/>
                             <span>Save</span>
                        </span>
                    </button>
        </div>
        ):(
        <button
            className={`${btnStyle} bg-blue ${props.loading && "bg-[#5967df]"}`}
            onClick={() => handleAccountEdit()}
            disabled={props.loading}
        >
            {props.loading? (
            <ThreeDots visible={true} height={20} width={20} color="#ffffff" radius={9} ariaLabel="loading" wrapperStyle={{}} wrapperClass=""/>
            ) : (
            <span className="flex items-center justify-center">
                <FaEdit className="mr-2"/>
                <span>Edit</span>
            </span>)
            }
        </button>
        )}
        </div>
    ) 

}

export default ProfileBtns
