import { IoMdCheckmark } from "react-icons/io"
import MemberLabel from "./MemberLabel"

const GroupMemberList = (props) => {
    return (
        <div className="pt-2">
            <div className="flex justify-between items-center px-4">
                <div className="flex">
                {/* Image */}
                <div className="rounded-full max-w-24 mr-4">
                    <img src="iok"/>
                </div>
                {/* Name */}
                <p>{props.name}</p>
                </div>
                {/* Label */}
                <MemberLabel label={props.label}/>               
                {/* Check */}
                <IoMdCheckmark className="text-green"/>
            </div>
        </div>
    )
}

export default GroupMemberList
