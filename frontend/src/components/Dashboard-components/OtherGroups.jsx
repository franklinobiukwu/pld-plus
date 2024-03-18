import GroupCard from "./GroupCard.jsx";


const OtherGroups = () => {

    return (
        <div>
            <h3 className="text-xs font-medium
                    border-b border-b-cream2">OTHER GROUPS</h3>
            <div className="border-t-8 rounded-md border-pri mt-2">
                <hr className="text-cream2 mt-4"/>

                <div>
                    {/* Group Member List*/}
                    <div className="mt-4">
                        <GroupCard members="7"/>
                        <GroupCard members="4"/>
                        <GroupCard members="10"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OtherGroups
