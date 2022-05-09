import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Login from './pages/Login';
import Home from "./pages/home/Home";
import ChatBox from "./pages/home/ChatBox";
import SignIp from "./pages/SignIn";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/SignUp" element={<SignIp />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/ChatBox" element={<ChatBox />} >
        </Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}
