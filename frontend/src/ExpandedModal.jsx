import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

const ModalComponent = ({
  showModal,
  handleCloseModal,
  modalTitle,
  modalText,
}) => {
  return (
    <Modal size="lg" show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CodeMirror
          value={modalText}
          height="70vh"
          extensions={[javascript({ jsx: true })]}
          options={{
            // disable autocorrect and grammarly
            spellcheck: false,
            "data-gramm": "false",
          }}
        />
      </Modal.Body>
      <Modal.Footer
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          paddingTop: 8,
          paddingBottom: 8,
        }}
      >
        <Card.Link href="#">
          <i
            className="fa-regular fa-copy fa-lg"
            style={{ color: "#000000" }}
          ></i>
        </Card.Link>
        <Button variant="success">Save Changes</Button>
        <Card.Link href="#">
          <i
            className="fa-regular fa-trash-can fa-lg"
            style={{ color: "#000000" }}
          ></i>
        </Card.Link>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
