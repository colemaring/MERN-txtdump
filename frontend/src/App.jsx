import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import PasteCard from "./PasteCard";
import React, { useState, useEffect } from "react";
import CreateButton from "./CreateButton";
import items from "./itemsList";
import { Route, Routes } from "react-router-dom";
import TxtDump from "./TxtDump";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import SignUp from "./SignUp";

export default function Main() {
  const [itemList, setitemList] = useState([{ title: " ", text: "" }]);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false); // refresh the page
  const navigate = useNavigate();

  useEffect(() => {
    const listId = localStorage.getItem("listId"); // Retrieve listId from local storage
    const token = localStorage.getItem("token"); // Retrieve token from local storage

    if (!listId || listId == "null") {
      navigate("/login");
      return;
    }

    // console.log(listId);
    fetch(`http://localhost:3000/data/${listId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    })
      .then((res) => {
        if (res.status === 403) {
          navigate("/login"); // Redirect to login page
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((val) => {
        // console.log(val.items);
        if (val.items) {
          setitemList(val.items); // set itemList to val.items
        } else {
          setitemList([]); // set itemList to an empty array
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [refresh]);

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <div>
            <Navbar />
            <CreateButton
              itemList={itemList}
              setitemList={setitemList}
              setRefresh={setRefresh}
            />
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
                  setRefresh={setRefresh}
                />
              ))}
            </div>
          </div>
        }
      />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  );
}
