const MemberLabel = (props) => {
    return (
        <div>
            <div className={ `w-[77px] rounded-full text-white ${props.label === 'Host' ? 'bg-pri' : 'bg-yellow'} px-4 py-1 flex justify-center items-center` }>
                <p className="text-xs">{props.label}</p>
            </div>
        </div>
    )
}
export default MemberLabel 
