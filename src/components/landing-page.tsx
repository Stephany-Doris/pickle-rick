import { KeyboardEvent, useState } from "react";
import Image from "next/image";
import rickImg from "public/img5.jpg";

const LandingPage = ({ setData }: any) => {
  const [state, setState] = useState("");

  const handler = (event: KeyboardEvent<HTMLButtonElement> | any) => {
    // changing the state to the name of the key
    // which is pressed
    console.log(event.target.value, event.key);

    if(event.key === "Enter"){
    setData(event.target.value);
    }

    setState(event.key);
  };

  // allow searching characters of rick and morty and return resolved result with cats field
  return (
    <div className="landing-page">
      <input onKeyDown={(e) => handler(e)} placeholder="search here!" />
    </div>
  );
};

export default LandingPage;
