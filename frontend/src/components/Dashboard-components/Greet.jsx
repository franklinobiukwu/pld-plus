import { useSelector } from "react-redux"
import greetImg from "../../images/greetImg.png"
import { ReactTyped } from "react-typed"

const Greet = () => {

    const user = useSelector(state => state.user.user)

    const backgroundStyle = {
        backgroundImage: `url(${greetImg})`
    }

    return (
        <div>
            <div
                className={`rounded-md shadow-sm px-6 
                            py-3 bg-cover bg-center bg-white2`}
                style={backgroundStyle}
            >
                <h1 className="font-medium text-2xl">
                    <ReactTyped 
                        startWhenVisible
                        strings={[`Hello, ${user.firstname}`]}
                        typeSpeed={40}
                        onComplete={(self) => self.cursor.remove()}
                        //showCursor={false}
                    />
                </h1>
            </div>
        </div>
    )
}

export default Greet
