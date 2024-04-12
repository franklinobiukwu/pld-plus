import { FaGithub, FaMedium } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoPersonCircleSharp } from "react-icons/io5";
import { GiLoveMystery } from "react-icons/gi";
import { Link } from "react-router-dom"
import ScrollIntoView from 'react-scroll-into-view'


const Footer = () => {
    return (
        <div>
            {/* Navigation */}
            <div className="px-6 py-6">
                <nav className="flex list-none gap-4 justify-center">
                    <ScrollIntoView selector="#home" smooth={true} className="transition ease-in-out duration-300 hover:-translate-y-1"> 
                        <Link to="/">
                            <li>Home</li>
                        </Link>
                    </ScrollIntoView>

                    <ScrollIntoView selector="#about" smooth={true} className="transition ease-in-out duration-300 hover:-translate-y-1">
                        <Link to="/">
                            <li>About</li>
                        </Link>
                    </ScrollIntoView>

                    <ScrollIntoView selector="#features" smooth={true} className="transition ease-in-out duration-300 hover:-translate-y-1">
                        <Link to="/">
                            <li>Features</li>
                        </Link>
                    </ScrollIntoView>
                </nav>

            </div>

        <div className="text-center text-pri">
            <div className="flex justify-center items-center">
            <span className="flex justify-center items-center bg-white2 px-4 py-1 rounded-md">Built with &nbsp; <GiLoveMystery className="text-red"/> &nbsp; by</span>
            </div>
        </div>

            <div className="flex justify-between">
                <Roman/>
                <Franklin/>
            </div>
        </div>
        
    )
}
export default Footer


const Roman = () => {
    return (
                <div className="mr-4">
                    <div className="flex justify-center items-center">
                        <IoPersonCircleSharp  className="text-4xl"/>
                        <p>Siduduzile Snenhlanhla Mdima</p>
                    </div>
                    <div className="flex gap-4 justify-center items-center">
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

    )    
}

const Franklin = () => {
    return (
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

    )
}
