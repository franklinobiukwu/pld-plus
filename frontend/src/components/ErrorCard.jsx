import { MdOutlineClose } from "react-icons/md";


const ErrorCard = (props) => {
    const handleClose = () => {
        props.setDisplayError(false)
    }
    console.log(props.error)

    return(
        <div className="border border-errorRedBorder bg-errorRed rounded-md
        w-full text-center text-red py-1 px-4 relative">
            <div 
                className="flex justify-end cursor-pointer"
                onClick={handleClose}
            >
                <MdOutlineClose />
            </div>
            <div className="absolute top-0">
                {
                    props.message && 
                    <div>
                        {props.message}
                    </div>
                }
            </div>
        </div>
    )
}

export default ErrorCard
