import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
export default function Github() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch(
//           "https://api.github.com/users/waseem-development",
//         );
//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         console.error("Error fetching GitHub data:", error);
//       }
//     }

//     fetchData();
//   }, []); // run once on mount

//   if (!data) {
//     return (
//       <div className="text-center m-4 bg-gray-600 text-white p-4 text-3xl">
//         Loading...
//       </div>
//     );
//   }

const data = useLoaderData()

  return (
    <>
      <div className="text-center m-4 bg-gray-600 text-white p-4 text-3xl rounded-lg shadow-lg">
        Github Followers: {data.followers}
      </div>
      <img src={data.avatar_url} alt="Github Profile Pic" />
    </>
  );
}

export const githubInfoLoader = async () => {
  const response = await fetch("https://api.github.com/users/waseem-development");
  return response.json();
};  