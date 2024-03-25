import LinkThumbnail from "../../components/Dashboard-components/LinkThumbnail.jsx"

const Resources = () => {
    const resources = ["https://roadmap.sh/", "https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world",
            "https://www.freecodecamp.org/", "https://www.w3schools.com/"]
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-2 text-center">Helpful Resources</h2>
            {resources.map((resource, id) => {
                return <LinkThumbnail url={resource} key={id}/>
            })}
        </div>
    )
}

export default Resources
