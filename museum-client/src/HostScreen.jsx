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

      {/* Dynamically builds the QR URL using the current machine's IP — works on any network! */}
      <QRCodeCanvas value={`http://${window.location.hostname}:6194/phone`} size={200} />

      <div style={{marginTop:40}}>

        {answers.map((a, i) => (
          <p key={i}>{a.text}</p>
        ))}

      </div>

    </div>
  );
}

export default HostScreen;