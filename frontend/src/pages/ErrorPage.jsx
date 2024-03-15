import { useRouteError } from "react-router-dom"

const ErrorPage = () => {

    const error = useRouteError()
    return (
        <div>
            <p>Error Page</p>
            <p>{ error.statusText || error.message }</p>
        </div>
    )
}

export default ErrorPage
