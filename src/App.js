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
import SignIp from "./pages/SignIn";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/SignUp" element={<SignIp />} />
          <Route path="/SignIn" element={<SignIp />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/ChatBox" element={<ChatBox />} >
        </Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}
