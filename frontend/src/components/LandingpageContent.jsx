import IntroImg from "../images/intro.jpg"
import AboutImg from "../images/about.jpg"
import Footer from "./Footer.jsx";
import CarouselCard from "./CarouselCard.jsx";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Images
import TimeImg from "../images/time2.jpg"
import { MdMarkEmailUnread } from "react-icons/md";
import ConnectImg from "../images/connect.jpg"
import HostImg from "../images/host.jpg"
import EmailImg from "../images/email.jpg"


const LandingpageContent = () => {

    const carouselData = [
        {
            img: TimeImg,
            title: "Time Zone Coordination",
            subtitle: "Say goodbye to scheduling conflicts!",
            content: "PLD+ automatically adjusts meeting times to accommodate participants across different time zones, ensuring everyone can join PLD sessions at a convenient time.",
        },
        {
            img: HostImg,
            title: "Leadership Facilitation",
            subtitle: "Take the lead in your PLD sessions!",
            content: "With PLD+, hosts can easily create and facilitate productive discussions, empowering students to share knowledge, ask questions, and learn from each other.",
        },
        {
            img: ConnectImg,
            title: "Seamless Integration",
            subtitle: "Join meetings with ease!",
            content: "PLD+ seamlessly integrates with third-party meeting platforms like Google Meet and Discord, providing one-click access to meeting groups and eliminating the hassle of navigating multiple platforms",
        },
        {
            img: EmailImg,
            title: "Email Reminders (Coming Soon)",
            subtitle: "Never miss a PLD session again!",
            content: "PLD+ sends email reminders to participants before scheduled sessions, keeping you informed and prepared to join meetings on time.",
        }
    ]

    const settings = {
        dots: true,
        infinite: true,
        speed: 100,
        slidesToShow: 3,
        slidesToScroll: 1,
        accessibility: true,
        arrows: true
    }


    return (
        <div>
            <div className="mt-10 p-10">
                {/* Intro Section*/}
                <div className="md:grid grid-cols-12 gap-4 text-grey">
                    {/* Intro Content */}
                    <div className="col-span-8 max-w-xl flex justify-center items-center mx-auto text-center md:text-justify">
                        <div>
                        <h2 className="text-2xl font-medium">Welcome to PLD<sup>+</sup></h2>
                        <h6 className="font-medium text-lightgrey text-sm mb-2">Empowering Your Peer Learning Experience</h6>
                        <p className="mt-1 mb-4 md:mb-0">
                             At PLD+, we believe that collaborative learning is the
                            key to unlocking your full potential as a software engineering
                            student. With PLD+, you can seamlessly connect with peers from
                            around the world, engage in meaningful discussions, and take your
                            learning to new heights. Join us on a journey of discovery,
                            innovation, and growth as we revolutionize the way you approach
                            peer learning.           
                        </p>
                        </div>
                    </div>
                    {/* Intro Image*/}
                    <div className="rounded-md overflow-hidden shadow-md col-span-4 max-w-lg">
                        <img src={IntroImg} className="object-cover w-full h-full"/>
                    </div>
                </div>
                {/* About Section */}
                <div className="md:grid grid-cols-12 gap-4 mt-24 bg-white2  rounded-md p-10 md:py-20 shadow-md" id="about">
                    {/* About Image*/}
                    <div className="rounded-md overflow-hidden shadow-md col-span-4 max-w-lg">
                        <img src={AboutImg} className="object-cover w-full h-full"/>
                    </div>
                    {/* About Content */}
                    <div className="col-span-8 max-w-xl flex justify-center items-center mx-auto text-center md:text-justify">
                        <div>
                        <h2 className="text-2xl font-medium mt-4 md:mt-0">About PLD<sup>+</sup></h2>
                        <p className="mt-1">
                            PLD+ is a revolutionary web application designed to
                            enhance the Peer Learning Day (PLD) experience for students
                            enrolled in the ALX Software Engineering Program. Built with
                            the specific needs of ALX students in mind, PLD+ offers a
                            suite of features to streamline the PLD process, including
                            time zone coordination, leadership facilitation, and
                            integration with third-party meeting platforms. Our mission
                            is to empower students to lead and learn together, fostering
                            collaboration, creativity, and success in their software
                            engineering journey.
                        </p>
                        </div>
                    </div>
                </div>
                {/* Features Section */}
                <div className="mt-24" id="features">
                    {/* Intro Image*/}
                    <div>
                        <h2 className="font-medium text-2xl mb-6 text-center text-grey">Productivity and Organisation at it's peak</h2>
                    </div>
                    {/* Intro Content */}
                    <div className="">
                        <Slider {...settings} >
                        {carouselData.map((data, id) => <CarouselCard data={data} key={id}/>)}
                        </Slider>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-gradient-to-br from-pri to-blue text-white2 mt-4 p-10 px-20">
                <Footer/>
            </div>
        </div>
    )
}

export default LandingpageContent
