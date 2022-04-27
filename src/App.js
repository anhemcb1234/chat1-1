import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Login from './pages/Login';
import SignIn from './pages/SignIn';
import Home from './pages/Home/Home'
import ChatBox from './pages/ChatBox'
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/ChatBox" element={<ChatBox />} >
        </Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}
