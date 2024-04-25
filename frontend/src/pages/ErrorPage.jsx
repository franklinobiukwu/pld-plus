import { Link, useRouteError } from "react-router-dom"
import ErrorImg from "../images/error.jpg"
import Navbar from "../components/Navbar.jsx";

const ErrorPage = () => {

    const error = useRouteError()
    const bgImg = `url(${ErrorImg})`

    return (
        <div className="h-screen flex flex-col">
            <Navbar />

            <div className="w-full h-full grow flex justify-center items-center">
                <div
                    className="w-[40%] h-[40%] rounded-md mr-20"
                    style={{backgroundImage: `${bgImg}`,
                            backgroundSize: "cover",
                            backgroundPosition: "center"}}
                >
                </div>
                <div className="absolute md:static">
                    <h3 className="font-semibold text-6xl text-pri">Ouch!</h3>
                    <p className="text-center text-lightgrey">Page { error.statusText || error.message }</p>
                    <p className=" text-center">
                        <Link to="/" className="text-blue underline text-center">Go home</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage
