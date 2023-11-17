import { Modal, Button } from "react-bootstrap";

function DeleteModal({
  showModalDelete,
  handleCloseModalDelete,
  index,
  setRefresh,
  handleCloseModal,
}) {
  return (
    <>
      <Modal show={showModalDelete} onHide={handleCloseModalDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleCloseModalDelete();
            }}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              const listId = localStorage.getItem("listId");
              const response = await fetch(`http://localhost:3000/data/${listId}/removeAtIndex/${index}`, {
                  method: "PUT",
                  headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('loginToken'),
                    "Content-Type": "application/json",
                  },
                }
              );

              if (!response.ok) {
                console.error("Failed to remove data");
              }
              handleCloseModalDelete();
              if (handleCloseModal) handleCloseModal();
              // refresh list with new data
              setRefresh((prev) => !prev);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;
