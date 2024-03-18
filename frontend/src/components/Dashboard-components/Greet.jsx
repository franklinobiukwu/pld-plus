import greetImg from "../../images/greetImg.png"

const Greet = () => {

    const backgroundStyle = {
        backgroundImage: `url(${greetImg})`
    }

    return (
        <div>
            <div
                className={`rounded-md shadow-sm px-6 
                            py-3 bg-cover bg-center`}
                style={backgroundStyle}
            >
                <h1 className="font-medium text-2xl">Hello, Roman</h1>
            </div>
        </div>
    )
}

export default Greet
