// Profile.jsx
import { useContext } from "react";
import UserContext from "../context/UserContext";

function Profile() {
  const { user } = useContext(UserContext);

  if (!user) {
    return (
      <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 text-center">
        <p className="text-gray-400 text-lg">Please Login</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 text-center">
      <p className="text-white text-2xl">
        Welcome <span className="text-teal-400 font-bold">{user.username}</span>
      </p>
    </div>
  );
}

export default Profile;