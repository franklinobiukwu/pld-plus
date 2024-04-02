import IntroImg from "../images/intro.jpg"
import AboutImg from "../images/about.jpg"
import { FaGithub, FaMedium } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoPersonCircleSharp } from "react-icons/io5";


const LandingpageContent = () => {
    return (
        <div>
            <div className="mt-10 p-10">
                {/* Intro Section*/}
                <div className="md:grid grid-cols-12 gap-4 text-grey">
                    {/* Intro Content */}
                    <div className="col-span-8 max-w-xl flex justify-center items-center mx-auto text-justify">
                        <div>
                        <h2 className="text-2xl font-medium">Welcome to PLD<sup>+</sup></h2>
                        <h6 className="font-medium text-lightgrey text-sm">Empowering Your Peer Learning Experience</h6>
                        <p className="mt-1">
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
                <div className="md:grid grid-cols-12 gap-4 text-grey mt-24 bg-pri text-white2 rounded-md p-4" id="about">
                    {/* About Image*/}
                    <div className="rounded-md overflow-hidden shadow-md col-span-4 max-w-lg">
                        <img src={AboutImg} className="object-cover w-full h-full"/>
                    </div>
                    {/* About Content */}
                    <div className="col-span-8 max-w-xl flex justify-center items-center mx-auto text-justify">
                        <div>
                        <h2 className="text-2xl font-medium">About PLD<sup>+</sup></h2>
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
                        <h2 className="font-medium text-2xl">Productivity and Organisation at it's peak</h2>
                    </div>
                    {/* Intro Content */}
                    <div>
                        <h2>Unlock Your Learning Potential with PLD+</h2>
                        <div>
                            <h3>Time Zone Coordination</h3>
                            <p>
                                Say goodbye to scheduling conflicts! PLD+ automatically adjusts meeting times to accommodate participants across different time zones, ensuring everyone can join PLD sessions at a convenient time.
                            </p>                                     
                        </div>
                        <div>
                            <h3>Leadership Facilitation</h3>
                            <p>
                                 Take the lead in your PLD sessions! With PLD+, hosts can easily create and facilitate productive discussions, empowering students to share knowledge, ask questions, and learn from each other.
                            </p>
                        </div>
                        <div>
                            <h3>Seamless Integration</h3>
                            <p>Join meetings with ease! PLD+ seamlessly integrates with third-party meeting platforms like Google Meet and Discord, providing one-click access to meeting groups and eliminating the hassle of navigating multiple platforms.</p>
                        </div>
                        <div>
                            <h3>Email Reminders (Coming Soon)</h3>
                            <p>Never miss a PLD session again! PLD+ sends email reminders to participants before scheduled sessions, keeping you informed and prepared to join meetings on time.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-pri text-white2 mt-4 p-4">
                <div>
                    
                </div>
                <div className="flex">
                {/* Roman */}
                <div className="mr-4">
                    <div className="flex justify-center items-center">
                        <IoPersonCircleSharp  className="text-4xl"/>
                        <p>Siduduzile Snenhlanhla Mdima</p>
                    </div>
                    <div className="flex gap-4 justify-center items-center" target="_blank">
                        {/* GitHub */}
                        <a href="https://github.com/MDIMACat" target="_blank">
                            <FaGithub />
                        </a>
                        {/* LinkedIn */}
                        <a href="http://www.linkedin.com/in/s-nenhlanhla-siduduzile-mdima-a309761aa" target="_blank">
                            <BsLinkedin />
                        </a>
                        {/* Medium */}
                        <a href="https://medium.com/@romanmdima" target="_blank">
                            <FaMedium />
                        </a>
                        {/* Twitter*/}
                        <a href="">
                            <FaSquareXTwitter />
                        </a>
                        {/* Email */}
                        <a href="mailto:romanmdima@gmail.com" target="_blank">
                            <MdEmail />
                        </a>
                    </div>
                </div>
                {/* Franklin */}
                <div>
                    <div className="flex justify-center items-center">
                        <IoPersonCircleSharp className="text-4xl"/>
                        <p>Franklin Obiukwu</p>
                    </div>
                    <div className="flex gap-4 justify-center items-center">
                        {/* GitHub */}
                        <a href="https://github.com/franklinobiukwu" target="_blank">
                            <FaGithub />
                        </a>
                        {/* LinkedIn */}
                        <a href="https://www.linkedin.com/in/franklinobiukwu/" target="_blank">
                            <BsLinkedin />
                        </a>
                        {/* Medium */}
                        <a href="https://medium.com/@franklinobiukwu" target="_blank">
                            <FaMedium />
                        </a>
                        {/* Twitter*/}
                        <a href="https://twitter.com/OfrankC" target="_blank">
                            <FaSquareXTwitter />
                        </a>
                        {/* Email */}
                        <a href="mailto:obiukwuchibuisi@gmail.com" target="_blank">
                            <MdEmail />
                        </a>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default LandingpageContent