import Card from "react-bootstrap/Card";
import React, { useState, useEffect } from "react";
import ExpandedModal from "./ExpandedModal";
import Button from "react-bootstrap/Button";
import CodeMirror from "@uiw/react-codemirror";
import Alert from "react-bootstrap/Alert";

const products = [
  { title: "auth codes", text: "1234-2344" },
  {
    title: "groceries",
    text: `apples
    potatoes
    tortilla
    lean ground beef
    shampoo
    eggs
    flour`,
  },
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
  const [alertVariant, setAlertVariant] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);

  const handleExpandClick = (title, text) => {
    setModalTitle(title);
    setModalText(text);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCopyClick = (textToCopy) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setAlertVariant("success");
        setAlertMessage("Text copied to clipboard");
        setAlertVisible(true);
      })
      .catch((err) => {
        setAlertVariant("danger");
        setAlertMessage("Copy failed: " + err.message);
        setAlertVisible(true);
      });
  };

  useEffect(() => {
    if (alertVisible) {
      const timeoutId = setTimeout(() => {
        setAlertVisible(false);
      }, 3000); // in ms

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [alertVisible]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        maxWidth: "100vw",
      }}
    >
      {alertVisible && (
        <div className="position-absolute" style={{ top: "10px", zIndex: 999 }}>
          <Alert
            variant={alertVariant}
            onClose={() => setAlertVisible(false)}
            dismissible
          >
            {alertMessage}
          </Alert>
        </div>
      )}
      {products.map((product, index) => (
        <Card
          key={index}
          style={{ height: "16rem", width: "20rem", margin: "10px" }}
        >
          <Card.Header>{product.title}</Card.Header>
          <Card.Body style={{ padding: 0, margin: 0 }}>
            <CodeMirror
              value={product.text}
              height="10.3rem"
              className="custom-codemirror"
              options={{
                // disable autocorrect and grammarly
                spellcheck: false,
                "data-gramm": "false",
              }}
            />
          </Card.Body>

          <Card.Footer
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              onClick={() => handleExpandClick(product.title, product.text)}
              variant="outline-secondary"
              size="sm"
            >
              Expand
            </Button>
            <Card.Link href="#">
              <i
                className="fa-regular fa-copy fa-1x"
                style={{ color: "#000000" }}
                onClick={() => handleCopyClick(product.text)}
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
