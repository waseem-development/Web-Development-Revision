import Card from "./components/Card";
import Image from "../public/blablabla.jpg";

function App() {
  let myObj = {
    username: "Waseem",
    age: 23,
  };
    let yourObj = {
    username: "Summiya",
    age: 23,
  };
  return (
    <div className="flex flex-wrap gap-6 justify-center items-center mt-10">
      <Card
        title="Card One"
        description="This is the first card with the same image."
        image={Image}
        someObj={myObj}
      />
      <Card
        title="Card Two"
        description="This is the second card with the same image."
        image={Image}
        someObj={yourObj}
      />
    </div>
  );
}

export default App;
