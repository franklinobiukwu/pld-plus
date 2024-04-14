const CarouselCard = ({ data }) => {
    return (
        <div className="bg-gradient-to-br from-[#0000ff0d] to-[#0000ff0d] shadow-md rounded-md text-center mr-2 max-w-lg">
            <div
                className="relative w-full min-h-72 aspect-w-16 aspect-h-16 overflow-hidden rounded-t-md bg-cover bg-center"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${data.img})`, width: '100%', height: '100%' }}
                ></div>
            </div>
            <div className="p-6">
                <h4 className="text-lg font-medium text-blue">{data.title}</h4>
                <h6 className="text-sm font-medium text-lightgrey">{data.subtitle}</h6>
                <p>{data.content}</p>
            </div>
        </div>
    );
};

export default CarouselCard;

