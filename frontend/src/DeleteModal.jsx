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
              const token = localStorage.getItem("token"); // Retrieve token from local storage

              const response = await fetch(
                `http://localhost:3000/data/${listId}/removeAtIndex/${index}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Include the token in the Authorization header
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
