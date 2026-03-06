import { BrowserRouter, Routes, Route } from "react-router-dom";
import HostScreen from "./HostScreen";
import PhoneScreen from "./PhoneScreen";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<HostScreen />} />
        <Route path="/phone" element={<PhoneScreen />} />

      </Routes>

    </BrowserRouter>

  );
}

export default App;