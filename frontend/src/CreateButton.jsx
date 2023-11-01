import Button from "react-bootstrap/Button";

function MyButton() {
  return (
    <div className="d-flex justify-content-center my-4">
      <Button variant="success" type="submit">
        DUMP{" "}
        <i
          className="fa-regular fa-plus fa-1x"
          style={{ color: "#ffffff" }}
        ></i>
      </Button>
    </div>
  );
}

export default MyButton;
