import Card from "react-bootstrap/Card";
import React, { useState } from "react";
import ExpandedModal from "./ExpandedModal";

const products = [
  { title: "cool code", text: "print(hello world)" },
  { title: "groceries", text: "apples, chicken, pasta, green beans" },
  { title: "recipe", text: "10tbs salt, preheat oven to 450" },
  {
    title: "Lorem ipsum",
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi
ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in
voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  },
  {
    title: "packages",
    text: `{
    "name": "frontend",
    "version": "0.1.0",
    "private": true,
    "dependencies": {
      "@codemirror/lang-javascript": "^6.2.1",
      "@testing-library/jest-dom": "^5.17.0",
      "@testing-library/react": "^13.4.0",
      "@testing-library/user-event": "^13.5.0",
      "@uiw/react-codemirror": "^4.21.20",
      "bootstrap": "^5.3.2",
      "font-awesome": "^4.7.0",
      "react": "^18.2.0",
      "react-bootstrap": "^2.9.1",
      "react-dom": "^18.2.0",
      "react-scripts": "5.0.1",
      "web-vitals": "^2.1.4"
    },
    "scripts": {
      "start": "react-scripts start",
      "build": "react-scripts build",
      "test": "react-scripts test",
      "eject": "react-scripts eject"
    },
    "eslintConfig": {
      "extends": [
        "react-app",
        "react-app/jest"
      ]
    },
    "browserslist": {
      "production": [
        ">0.2%",
        "not dead",
        "not op_mini all"
      ],
      "development": [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version"
      ]
    }
  }`,
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
      <ExpandedModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        modalTitle={modalTitle}
        modalText={modalText}
      />
    </div>
  );
}
export default TextExample;
