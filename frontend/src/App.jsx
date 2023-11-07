import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import PasteCard from "./PasteCard";
import React, { useState, useEffect } from "react";
import CreateButton from "./CreateButton";
import items from "./itemsList";
import AlertComponent from "./Alert";
import { Route, Routes } from "react-router-dom";
import TxtDump from "./TxtDump";
import Login from "./Login";
import SignUp from "./SignUp";

export default function Main() {
  const [itemList, setitemList] = useState(items);

  useEffect(() => {
    console.log("loaded");
    fetch("http://localhost:3000/data")
      .then((res) => res.json())
      .then((val) => setitemList(val));
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <Navbar />
            <CreateButton itemList={itemList} setitemList={setitemList} />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                maxWidth: "100vw",
              }}
            >
              {itemList.map((product, index) => (
                <PasteCard
                  key={index}
                  index={index}
                  product={product}
                  itemList={itemList}
                  setitemList={setitemList}
                />
              ))}
            </div>
          </div>
        }
      />
      <Route path="login" element={<Login />} />
      <Route path="sign-up" element={<SignUp />} />
    </Routes>
  );
}
