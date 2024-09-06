import { RedirectToPage } from "./RedirectToPage";

export default function RedirectToLogin(navigate, errorMessage) {
  navigate("/login", {
    state: { message: "Session expired. Please log in again." },
  });
}
