import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import ExpandedModal from "./ExpandedModal";

function MyButton() {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const handleExpandClick = (title, text) => {
    setModalTitle(title);
    setModalText(text);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div className="d-flex justify-content-center my-4">
      <Button
        onClick={() => handleExpandClick("Enter title", "")}
        variant="success"
        type="submit"
      >
        DUMP{" "}
        <i
          className="fa-regular fa-plus fa-1x"
          style={{ color: "#ffffff" }}
        ></i>
      </Button>
      <ExpandedModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        modalTitle={modalTitle}
        modalText={modalText}
      />
    </div>
  );
}

export default MyButton;
