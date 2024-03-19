const Navbar = () => {
    return (
        <div className="flex justify-between h-16 max-w-[90rem] mx-auto px-4 items-center shadow-sm">
            <div className="">
                <h1 className="font-bold text-3xl">PLD<sup>+</sup></h1>
            </div>
            <div className="flex">
                <button>Login</button>
                <button>Sign up</button>
            </div>
        </div>
    )
}

export default Navbar
