import Card from "react-bootstrap/Card";
import React, { useState } from "react";
import ExpandedModal from "./ExpandedModal";
import DeleteModal from "./DeleteModal";
import Button from "react-bootstrap/Button";
import CodeMirror from "@uiw/react-codemirror";

function PasteCard({ index, product, itemList, setitemList, setRefresh }) {
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const handleExpandClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseModalDelete = () => {
    setShowModalDelete(false);
  };

  const handleShowDeleteModal = () => {
    setShowModalDelete(true);
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
              handleShowDeleteModal();
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
      <DeleteModal
        setRefresh={setRefresh}
        showModalDelete={showModalDelete}
        handleCloseModalDelete={handleCloseModalDelete}
        index={index}
      />
    </Card>
  );
}
export default PasteCard;
