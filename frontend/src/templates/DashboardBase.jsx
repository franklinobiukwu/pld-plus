import { Outlet } from "react-router-dom"

const DashboardBase = () => {
    return (
        <div>
            <aside>
                <p>Side Nav</p>
            </aside>
            <div>
                <Outlet/>
            </div>
        </div>
    )
}

export default DashboardBase
