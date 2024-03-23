import { ColorRing } from "react-loader-spinner"

const Loading = () => {
    return (
        render(
            <ColorRing
                visible={true}
                height={40}
                width={40}
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#05AF2B', '#F4A100', '#0A66C2', '#333333']}
            />
        )
    )
}

export default Loading
