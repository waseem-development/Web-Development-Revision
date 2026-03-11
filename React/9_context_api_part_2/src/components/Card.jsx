export default function TutorCard() {
    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                {/* Updated to match the classroom image */}
                <img 
                    className="p-4 rounded-t-lg object-cover h-64 w-full" 
                    src="https://images.pexels.com/photos/5212351/pexels-photo-5212351.jpeg" 
                    alt="Geometry Tutoring Session" 
                />
            </a>
            <div className="px-5 pb-5">
                <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        Advanced Geometry & Math Mastery Class
                    </h5>
                </a>
                
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Master area formulas, shapes, and logical reasoning with personalized 1-on-1 sessions.
                </p>

                <div className="flex items-center mt-3 mb-5">
                    {/* Simplified Star Rating Logic */}
                    {[...Array(4)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-300 mr-1" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                    ))}
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                        4.8 (120 reviews)
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">$25/hr</span>
                    <a
                        href="#"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Book Session
                    </a>
                </div>
            </div>
        </div>
    );
}