import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication";
import { action as logoutAction } from "./pages/Logout";
import { tokenLoader } from "./util/auth";
import Dashboard from "./pages/Dashboard";
import DashError from "./pages/DashError";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    action: authAction,
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      { path: "dashboard", element: <DashboardGuard /> },
    ],
  },
  { path: "logout", action: logoutAction },
]);

function App() {
  return (
    <div style={{ position: "relative", zIndex: "1" }}>
      <RouterProvider router={router} />
    </div>
  );
}

function DashboardGuard() {
  const isAuthenticated = checkAuthentication(); // Placeholder function

  if (isAuthenticated) {
    return <Dashboard />;
  } else {
    // You can redirect the user to the login page or show an error message
    return <DashError />;
    //return <ErrorPage />;
  }
}

// Placeholder function for authentication
function checkAuthentication() {
  // Implement your own authentication logic here
  // For example, check if there's a token in local storage
  const token = localStorage.getItem("token");
  return !!token;
}

export default App;
