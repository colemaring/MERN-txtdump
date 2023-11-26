import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function NotAPage() {
  const navigate = useNavigate();
  const timeout = 3000;

  useEffect(() => {
    setTimeout(() => {
      navigate("home");
    }, timeout);
  }, []);

  return (
    <div className="overlay bg-sign-up fs-1 p-5 d-flex justify-content-center align-items-center text-light flex-column font-monospace">
      <p className="text-danger fw-bolder text-outline">404</p>
      <p className="text-outline">Page not found.</p>
      <p className="text-decoration-underline text-outline">Redirecting...</p>
    </div>
  );
}
