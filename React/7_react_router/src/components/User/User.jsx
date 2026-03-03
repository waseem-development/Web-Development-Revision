import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams, useNavigate } from "react-router-dom";
import mainImage from "../../assets/main_image.webp";

export default function User() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const defaultUsername = "waseem-development";

    const users = [
      {
        userid: "1",
        name: "Hafiz Waseem Ahmed",
        username: "waseem-development",
        email: "waseemdevelopment2002@gmail.com",
        phone: "+92-3412011877",
        location: "Quetta, Pakistan",
        bio: "Fullstack Developer passionate about building modern web applications with React and Tailwind CSS.",
      },
      {
        userid: "2",
        name: "Lamiah",
        username: "lamiah-dev",
        email: "lamiah@gmail.com",
        phone: "+20-10-44006598",
        location: "Al Saadat City, Egypt",
        bio: "Frontend Developer who loves building beautiful UI with React and Tailwind CSS.",
      },
    ];

    // If no username in URL → redirect to default
    if (!username) {
      navigate(`/user/${defaultUsername}`, { replace: true });
      return;
    }

    const foundUser = users.find((u) => u.username === username);

    // If username not found → redirect to default
    if (!foundUser) {
      navigate(`/user/${defaultUsername}`, { replace: true });
      return;
    }

    setUser(foundUser);
  }, [username, navigate]);

  // Prevent crash before user loads
  if (!user) {
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  }

  return (
    <div className="mx-auto w-full max-w-7xl">
      {/* Hero Section */}
      <aside className="relative overflow-hidden text-black rounded-lg sm:mx-16 mx-2 sm:py-16 bg-gray-100">
        <div className="relative z-10 max-w-screen-xl px-4 pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-xl space-y-6">
            <h2 className="text-4xl font-bold sm:text-5xl">
              {user.name}
              <span className="block text-xl text-gray-600 mt-2">
                {user.username}
              </span>
            </h2>

            <p className="text-lg text-gray-700">{user.bio}</p>

            <div className="flex gap-4">
              <Link
                to="/contact"
                className="inline-flex text-white items-center px-6 py-3 font-medium bg-orange-700 rounded-lg hover:opacity-80 transition"
              >
                Contact
              </Link>

              <NavLink
                to="/"
                className="inline-flex items-center px-6 py-3 font-medium border border-gray-400 rounded-lg hover:bg-gray-200 transition"
              >
                Go Home
              </NavLink>
            </div>
          </div>
        </div>

        <div className="absolute right-0 top-10 hidden sm:block">
          <img
            className="w-80 rounded-lg shadow-lg"
            src={mainImage}
            alt="user"
          />
        </div>
      </aside>

      {/* Details Section */}
      <div className="grid md:grid-cols-2 gap-8 sm:mt-20 mt-10 sm:px-16 px-4">
        <div className="bg-white shadow-md rounded-lg p-6 border">
          <h3 className="text-2xl font-bold mb-4">User Details</h3>

          <div className="space-y-3 text-gray-700">
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {user.phone}
            </p>
            <p>
              <span className="font-semibold">Location:</span>{" "}
              {user.location}
            </p>
          </div>
        </div>

        <div className="bg-gray-100 shadow-md rounded-lg p-6">
          <h3 className="text-2xl font-bold mb-4">About</h3>
          <p className="text-gray-700 leading-relaxed">{user.bio}</p>
        </div>
      </div>

      {/* Footer Title */}
      <h1 className="text-center text-2xl sm:text-4xl py-16 font-medium">
        Welcome to {user.name}'s Profile
      </h1>
    </div>
  );
}
