import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import PasteCard from "./PasteCard";
import CreateButton from "./CreateButton";

export default function Main() {
  return (
    <div>
      <Navbar></Navbar>
      <CreateButton></CreateButton>
      <PasteCard></PasteCard>
    </div>
  );
}
