import { useState } from "react";
import { socket } from "./socket";

function PhoneScreen() {

  const [text, setText] = useState("");

  const submit = () => {

    if (!text) return;

    socket.emit("submitAnswer", text);
    setText("");

  };

  return (

    <div style={{padding:20}}>

      <h2>Share your answer</h2>

      <input
        value={text}
        onChange={(e)=>setText(e.target.value)}
        placeholder="Type your answer"
      />

      <button onClick={submit}>Submit</button>

    </div>

  );

}

export default PhoneScreen;