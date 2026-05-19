import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./i18n";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import AuthProvider from "./context/auth/authProvider";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import GuestRoute from "./context/GuestRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {UserRoutes()}
          {AdminRoutes()}

          <Route
            path="login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="register"
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />

          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
