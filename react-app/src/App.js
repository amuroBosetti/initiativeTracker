import React from "react";
import "./styles.css";
import {Route, Routes} from "react-router-dom";
import {Admin} from "./routes/Admin.js";

export default function App() {
    return (
        <Routes>
            <Route path="/admin" element={<Admin/>}/>
        </Routes>
    );
}
