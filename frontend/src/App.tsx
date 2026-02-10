import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Share from "./component/share";
import Landing from "./component/landing";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/share/:id" element={<Share />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
