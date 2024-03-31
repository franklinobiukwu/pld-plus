import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { loginState } from "../features/userSlice"

const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    // redux store redux
    const dispatch = useDispatch()

    // useNavigate to navigate to another page
    const navigate = useNavigate()

    // Login FUnction
    const endpoint = `${import.meta.env.VITE_BASE_API}/auth/login`

    const login = async (email, password) => {
        setIsLoading(true)
        setError('')

        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        })

        const json = await response.json()

        if (!response.ok){
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok){
            const user = json.user
            user['token'] = json.token
            // store user info in local storage
            console.log(user)
            localStorage.setItem("user", JSON.stringify(user))
            // update global user
            dispatch(loginState(user))

            setIsLoading(false)
            navigate("/dashboard")
        }
    }

    return { login, isLoading, error }
}

export default useLogin
