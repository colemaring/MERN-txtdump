import Card from "react-bootstrap/Card";
import React, { useState } from "react";
import ExpandedModal from "./ExpandedModal";
import DeleteModal from "./DeleteModal";
import Button from "react-bootstrap/Button";
import CodeMirror from "@uiw/react-codemirror";
import ShareModal from "./ShareModal";

function PasteCard({ index, product, itemList, setitemList, setRefresh }) {
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalShare, setShowModalShare] = useState(false);

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

  const handleShowShareModal = () => {
    setShowModalShare(true);
  }

  const handleCloseShareModal = () => {
    setShowModalShare(false);
  }

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

        <Button
          onClick={() => handleShowShareModal()}
          varinant = "outline-secondary"
          size = "sm"
        > 
          Share
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
      <ShareModal
        setRefresh={setRefresh}
        showModalShare={showModalShare}
        handleCloseShareModal={handleCloseShareModal}
        index={index}
      />
      
    </Card>
  );
}
export default PasteCard;
