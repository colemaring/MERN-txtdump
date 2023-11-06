import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { java } from "@codemirror/lang-java";
import { html } from "@codemirror/lang-html";
import { cpp } from "@codemirror/lang-cpp";
import { json } from "@codemirror/lang-json";
import { php } from "@codemirror/lang-php";
import { python } from "@codemirror/lang-python";
import { sql } from "@codemirror/lang-sql";
import { markdown } from "@codemirror/lang-markdown";
import Dropdown from "react-bootstrap/Dropdown";

const ExpandedModal = ({
  showModal,
  handleCloseModal,
  modalTitle,
  modalText,
  itemList,
  setitemList,
  create,
  index,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState(markdown());
  const [selectedLanguageLabel, setSelectedLanguageLabel] =
    useState("markdown");
  const [text, setText] = useState(modalText);

  const handleLanguageChange = (language) => {
    setSelectedLanguageLabel(language);
    switch (language) {
      case "javascript":
        setSelectedLanguage(javascript({ jsx: true }));
        break;
      case "java":
        setSelectedLanguage(java);
        break;
      case "html":
        setSelectedLanguage(html());
        break;
      case "cpp":
        setSelectedLanguage(cpp());
        break;
      case "json":
        setSelectedLanguage(json());
        break;
      case "php":
        setSelectedLanguage(php());
        break;
      case "python":
        setSelectedLanguage(python());
        break;
      case "sql":
        setSelectedLanguage(sql());
        break;
      // add other languages as needed
      default:
        setSelectedLanguage(markdown());
    }
  };

  const [title, setTitle] = useState(
    index >= 0 ? itemList[index].title : "Enter a title"
  );

  useEffect(() => {
    setTitle(index >= 0 ? itemList[index].title : "Enter a title");
  }, [index, itemList]);

  return (
    <Modal size="lg" show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ fontSize: "1.25rem", fontWeight: "500" }}
        />
        <Dropdown style={{ marginLeft: "2rem" }}>
          <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
            {selectedLanguageLabel}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleLanguageChange("markdown")}>
              markdown
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleLanguageChange("javascript")}>
              javascript
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleLanguageChange("python")}>
              python
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleLanguageChange("java")}>
              java
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleLanguageChange("html")}>
              html
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleLanguageChange("cpp")}>
              c++
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleLanguageChange("json")}>
              json
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleLanguageChange("php")}>
              php
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleLanguageChange("sql")}>
              sql
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Modal.Header>
      <Modal.Body style={{ padding: 0, margin: 0 }}>
        <CodeMirror
          value={index >= 0 ? itemList[index].text : ""}
          height="70vh"
          extensions={[selectedLanguage]}
          options={{
            spellcheck: false,
            "data-gramm": "false",
          }}
          onChange={(value) => {
            setText(value);
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
        <Button
          variant="success"
          onClick={() => {
            if (create) {
              setitemList([...itemList, { title: title, text: text }]);
              setTitle("Enter a title");
              setText("");
              handleCloseModal();
            }
            if (index != -1) {
              itemList[index].title = title;
              itemList[index].text = text;
              setitemList([...itemList]);
              handleCloseModal();
            }
          }}
        >
          Save Changes
        </Button>
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

export default ExpandedModal;
