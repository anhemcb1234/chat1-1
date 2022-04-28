import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Login from './pages/Login';
import Home from "./pages/Home/Home";
import ChatBox from "./pages/Home/ChatBox";
import SignUp from "./pages/SignUp";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/ChatBox" element={<ChatBox />} >
        </Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}
