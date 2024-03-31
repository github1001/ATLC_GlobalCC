import { redirect } from "react-router-dom";

export function action() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.getItem("popupForOpen", true);
  localStorage.removeItem("expiration");

  return redirect("/");
}
