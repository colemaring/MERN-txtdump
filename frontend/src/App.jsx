import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import { Route, Routes } from "react-router-dom";
import TxtDump from "./TxtDump";
import Login from "./Login";
import SignUp from "./SignUp";

export default function Main() {
  return (
    <Routes>
      <Route element={<Navbar />}>
        <Route path="/" element={<TxtDump />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="sign-up" element={<SignUp />} />
    </Routes>
  );
}
