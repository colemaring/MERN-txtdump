import Card from "react-bootstrap/Card";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const products = [
  { title: "cool code", text: "print(hello world)" },
  { title: "groceries", text: "apples, chicken, pasta, green beans" },
  { title: "recipe", text: "10tbs salt, preheat oven to 450" },
  {
    title: "Lorem ipsum ",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

function TextExample() {
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        maxWidth: "100vw",
      }}
    >
      {products.map((product, index) => (
        <Card key={index} style={{ width: "18rem", margin: "10px" }}>
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text style={{ maxHeight: "100px", overflow: "hidden" }}>
              {product.text}
            </Card.Text>
          </Card.Body>
          <Card.Footer
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Card.Link
              href="#"
              style={{ color: "black" }}
              onClick={() => handleExpandClick(product.title, product.text)}
            >
              Expand
            </Card.Link>
            <Card.Link href="#">
              <i
                className="fa-regular fa-copy fa-1x"
                style={{ color: "#000000" }}
              ></i>
            </Card.Link>
            <Card.Link href="#">
              <i
                className="fa-regular fa-pen-to-square"
                style={{ color: "#000000" }}
              ></i>
            </Card.Link>
            <Card.Link href="#">
              <i
                className="fa-regular fa-trash-can"
                style={{ color: "#000000" }}
              ></i>
            </Card.Link>
          </Card.Footer>
        </Card>
      ))}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalText}</Modal.Body>
      </Modal>
    </div>
  );
}
export default TextExample;
