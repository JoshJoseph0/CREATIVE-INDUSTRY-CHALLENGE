import { useEffect, useState } from "react";
import { socket } from "./socket";
import { QRCodeCanvas } from "qrcode.react";

function HostScreen() {

  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState("");

  useEffect(() => {

    socket.on("init", (data) => {
      setAnswers(data.answers);
      setQuestion(data.question);
    });

    socket.on("newAnswer", (answer) => {
      setAnswers((prev) => [...prev, answer]);
    });

    socket.on("questionChanged", (q) => {
      setQuestion(q);
      setAnswers([]);
    });

  }, []);

  return (
    <div style={{padding:40}}>

      <h1>{question}</h1>

      {/* Use 192.168.0.51 to ensure the QR code always has the network IP for the phone. */}
      {/* If your IP ever changes from 192.168.0.51, you will need to update this line! */}
      <QRCodeCanvas value={`http://192.168.0.51:6194/phone`} size={200} />

      <div style={{marginTop:40}}>

        {answers.map((a, i) => (
          <p key={i}>{a.text}</p>
        ))}

      </div>

    </div>
  );
}

export default HostScreen;