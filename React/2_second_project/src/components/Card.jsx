const Card = ({ title, description, image, someObj }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white h-110">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      {console.log(someObj)}

      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2">{title}</h2>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Card;
