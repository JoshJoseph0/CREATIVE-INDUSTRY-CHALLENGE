import { useState, useEffect } from "react";
import { socket } from "./socket";

function PhoneScreen() {

  const [text, setText] = useState("");
  const [question, setQuestion] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [connected, setConnected] = useState(socket.connected);

  useEffect(() => {

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.on("init", (data) => {
      setQuestion(data.question);
    });

    socket.on("questionChanged", (q) => {
      setQuestion(q);
      setSubmitted(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("init");
      socket.off("questionChanged");
    };

  }, []);

  const submit = () => {
    if (!text) return;
    socket.emit("submitAnswer", text);
    setText("");
    setSubmitted(true);
  };

  if (!connected) {
    return (
      <div style={{ padding: 20, textAlign: "center", marginTop: 60 }}>
        <p style={{ fontSize: 18 }}>⏳ Connecting to host...</p>
        <p style={{ color: "gray", fontSize: 14 }}>Make sure you're on the same Wi-Fi as the host.</p>
      </div>
    );
  }

  return (

    <div style={{ padding: 20 }}>

      {question && <h2 style={{ marginBottom: 20 }}>{question}</h2>}

      {submitted ? (
        <p style={{ color: "green", fontSize: 18 }}>✅ Answer submitted!</p>
      ) : (
        <>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your answer"
            style={{ width: "100%", padding: 10, fontSize: 16, marginBottom: 10, boxSizing: "border-box" }}
          />
          <button
            onClick={submit}
            style={{ width: "100%", padding: 12, fontSize: 16, backgroundColor: "#4f46e5", color: "white", border: "none", borderRadius: 8 }}
          >
            Submit
          </button>
        </>
      )}

    </div>

  );
}

export default PhoneScreen;