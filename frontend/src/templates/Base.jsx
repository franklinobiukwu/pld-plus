import { Outlet, useLocation } from "react-router-dom"
import Navbar from "../components/Navbar.jsx"
import useDispatchUser from "../hooks/useDispatchUser.jsx";
import Banner from "../components/Bannar.jsx";
import BannerImg from "../images/pld-plus-banner.jpg"
import BannerFeatures from "../components/BannerFeatures.jsx";
import LandingpageContent from "../components/LandingpageContent.jsx";
import { IoIosArrowDropupCircle } from "react-icons/io";
import ScrollIntoView from 'react-scroll-into-view'

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
        {location.pathname=='/'?(
            <>
            <div className="flex flex-col h-screen" id="home">
                {/* Banner */}
                <div
                    className="bg-cover bg-center w-full h-svh relative"
                    style={bannerImg}
                >
                    {/* Overlay */}
                    <div className="absolute bg-[#0000008c] w-full h-full z-[1]"></div>
                    <div className="flex flex-col z-[10] absolute w-full h-full overflow-hidden">
                        {/* Header */}
                        <div>
                            <Navbar />
                        </div>
                        <div>
                            {/* Banner */}
                            <div className="w-full h-full">
                                <Banner />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {/* Body */}
            <div className="mt-[-20%] md:mt-[-5%] lg:mt-[-3%] z-20 w-[90%] mx-auto relative">
                <BannerFeatures />
            </div>
                {/* Other page content */}
            <div>
                <LandingpageContent />
            </div>
            {/* Button to scroll up*/}
            <ScrollIntoView selector="#home" smooth={true}>
                <button className="fixed bottom-2 right-2 text-blue hover:text-pri">
                   <IoIosArrowDropupCircle className="text-3xl"/> 
                </button>
            </ScrollIntoView>
            </>
        ):(
            <div className="grow bg-white h-full w-full">
                <Outlet />
            </div>
        )}
        </div>
    );
}

export default Base;
