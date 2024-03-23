import { useState } from "react"

const ProfileBtns = () => {
    const [edit, setEdit] = useState(false)

    
    {/* Button Function Handlers */}
    const handleAccountEdit = () => {
        setAccountEdit(true)
    }
    const handleAccountCancel = () => {
        setAccountEdit(false)
    }
    const handleAccountSave = () => {
        setAccountEdit(false)
    }

    const backgroundStyle = {
        backgroundImage: `url(${ProfileBg})`
    }


    return (
        <div className="flex justify-end mt-5 md:mt-10">

            {edit?(
                <div className="flex">
                    <button
                        className={`${btnStyle} bg-red mr-4`}
                        onClick={() => handleAccountCancel()}
                    >
                        <span className="flex justify-center items-center">
                            <IoCheckmarkDoneCircle className="mr-2"/>
                            <span>Cancel</span>
                        </span>
                    </button>

                    <button
                        className={`${btnStyle} bg-whiten border-2 border-grey`}
                        onClick={() => handleAccountSave()}
                    >
                        <span className="flex justify-center items-center text-grey">
                            <IoCheckmarkDoneCircle className="mr-2"/>
                             <span>Save</span>
                        </span>
                    </button>
        </div>
        ):(
        <button
            className={`${btnStyle} bg-blue`}
            onClick={() => handleAccountEdit()}
        >
            <span className="flex items-center justify-center">
                <FaEdit className="mr-2"/>
                <span>Edit</span>
            </span>
        </button>
        )}
        </div>
    ) 

}

export default ProfileBtns
