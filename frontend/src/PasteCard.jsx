import Card from "react-bootstrap/Card";

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
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {products.map((product, index) => (
        <Card key={index} style={{ width: "18rem", margin: "10px" }}>
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text style={{ maxHeight: "100px", overflow: "hidden" }}>
              {product.text}
            </Card.Text>
            <Card.Link href="#">View Text</Card.Link>
            <Card.Link href="#">Copy Text</Card.Link>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
export default TextExample;
