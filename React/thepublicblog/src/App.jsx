import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import authService from "./appwrite/auth";
import { setUser, logoutUser } from "./store/authSlice";
import Header from "./components/Header/Header";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(setUser(userData));
        } else {
          dispatch(logoutUser());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-white bg-black min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <Header />
  );
}

export default App;