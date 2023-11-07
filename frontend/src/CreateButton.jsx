import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import ExpandedModal from "./ExpandedModal";

function MyButton({ itemList, setitemList }) {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="d-flex justify-content-center my-4">
      <Button
        onClick={() => setShowModal(true)}
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
        modalTitle={"Enter a title"}
        modalText={""}
        itemList={itemList}
        setitemList={setitemList}
        create={true}
        index={-1}
      />
    </div>
  );
}

export default MyButton;
