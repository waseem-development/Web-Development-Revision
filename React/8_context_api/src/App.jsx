// App.jsx
import Login from "./components/Login";
import Profile from "./components/Profile";
import UserContextProvider from "./context/UserContextProvider";

function App() {
  return (
    <UserContextProvider>
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        <div className="max-w-md mx-auto space-y-8">
          <Login />
          <Profile />
        </div>
      </div>
    </UserContextProvider>
  );
}

export default App;