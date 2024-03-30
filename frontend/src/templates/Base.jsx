import { Outlet, useLocation } from "react-router-dom"
import Navbar from "../components/Navbar.jsx"
import useDispatchUser from "../hooks/useDispatchUser.jsx";
import Banner from "../components/Bannar.jsx";
import BannerImg from "../images/pld-plus-banner.jpg"

// ... (other imports and code)

const Base = () => {
    const { user, dispatchUser } = useDispatchUser();
    const location = useLocation()

    // Dispatch user to state if in localStorage
    dispatchUser();

    const bannerImg = {
        backgroundImage: `url(${BannerImg})`,
    };

    return (
        <div>
            <div className="flex flex-col h-screen">
                <div
                    className="bg-cover bg-center w-full h-svh relative"
                    style={bannerImg}
                >
                    {/* Overlay */}
                    <div className="absolute bg-[#0000008c] w-full h-full z-[1]"></div>
                    <div className="flex flex-col z-[10] absolute w-full h-full">
                        {/* Header */}
                        <div>
                            <Navbar />
                        </div>
                        <div>
                        {location.pathname=='/'?(
                            // Banner
                            <div className="w-full h-full">
                            <Banner />
                            </div>

                        ):(
                            <div className="grow bg-white h-full w-full">
                             <Outlet />
                            </div>
                        )
                        }
                        </div>
                    </div>
                </div>

                {/* Body */}
            </div>
        </div>
    );
};

export default Base;

