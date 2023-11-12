import Card from "react-bootstrap/Card";
import React, { useState } from "react";
import ExpandedModal from "./ExpandedModal";
import Button from "react-bootstrap/Button";
import CodeMirror from "@uiw/react-codemirror";

function PasteCard({ index, product, itemList, setitemList, setRefresh }) {
  const [showModal, setShowModal] = useState(false);

  const handleExpandClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(product.text);
  };

  return (
    <Card
      key={index}
      style={{ height: "16rem", width: "20rem", margin: "10px" }}
    >
      <Card.Header>{index >= 0 ? itemList[index].title : ""}</Card.Header>
      <Card.Body style={{ padding: 0, margin: 0 }}>
        <CodeMirror
          value={index >= 0 ? itemList[index].text : ""}
          height="10.3rem"
          className="custom-codemirror"
          readOnly
          options={{
            // disable autocorrect and grammarly
            spellcheck: false,
            "data-gramm": "false",
          }}
        />
      </Card.Body>

      <Card.Footer
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          onClick={() => handleExpandClick()}
          variant="outline-secondary"
          size="sm"
        >
          Expand
        </Button>
        <Card.Link href="#">
          <i
            className="fa-regular fa-copy fa-1x"
            style={{ color: "#000000" }}
            onClick={handleCopyClick}
          ></i>
        </Card.Link>

        <Card.Link href="#">
          <i
            className="fa-regular fa-trash-can"
            style={{ color: "#000000" }}
            onClick={async () => {
              const listId = localStorage.getItem("listId");
              const response = await fetch(
                `http://localhost:3000/data/${listId}/removeAtIndex/${index}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              if (!response.ok) {
                console.error("Failed to remove data");
              }
              setRefresh((prev) => !prev);
            }}
          ></i>
        </Card.Link>
      </Card.Footer>
      <ExpandedModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        modalTitle={product.title}
        modalText={product.text}
        language={product.language}
        itemList={itemList}
        setitemList={setitemList}
        create={false}
        index={index}
        setRefresh={setRefresh}
      />
    </Card>
  );
}
export default PasteCard;
