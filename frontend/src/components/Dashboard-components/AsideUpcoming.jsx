import UpcomingPldList from "./UpcomingList"

const AsideUpcoming =() => {
    return (
        <div>
            <h3 className="text-xs font-semibold border-b border-b-cream2 mt-4">UP COMING PLDS</h3>
            <div className="mt-2">
                <UpcomingPldList/>
                <UpcomingPldList/>
                <UpcomingPldList/>
            </div>
        </div>
    )
}

export default AsideUpcoming
