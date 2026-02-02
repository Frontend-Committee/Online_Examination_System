import { useState, useEffect } from "react";

import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout/User";
import AdminLayout from "./components/Layout/AdminLayout/Admin";
import SubjectDetails from "./pages/Subjects/SubjectDetails";
import Subjects from "./pages/Subjects/SubjectsList";
import HistoryDetails from "./pages/History/ExamsHistory";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import RecoverPassword from "./pages/Auth/RecoverPassword";
import VerifyCode from "./pages/Auth/VerifyCode";
import ResetPassword from "./pages/Auth/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoutes";
import Register2 from "./pages/Auth/Register2";

const App = () => {
  const [view, setView] = useState("user");

  const navigate = useNavigate();

  const location = useLocation();

  const handleSwitchView = (target) => {
    setView(target);

    navigate(`/${target}`);
  };

  return (
    <>
      {/*only for demo purpose until we have a proper login system*/}
      <div className="fixed z-50 space-x-2 top-4 right-4">
        <button
          className={`px-3 py-1 text-white rounded ${view === "user" ? "bg-blue-600" : "bg-blue-300"}`}
          onClick={() => handleSwitchView("user")}
        >
          User View
        </button>

        <button
          className={`px-3 py-1 text-white rounded ${view === "admin" ? "bg-gray-900" : "bg-gray-500"}`}
          onClick={() => handleSwitchView("admin")}
        >
          Admin View
        </button>
      </div>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register2 />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/verifyCode" element={<VerifyCode />} />
        <Route path="/resetPassword" element={<ResetPassword />} />

        <Route
          path="/"
          element={
            <Navigate to={view === "user" ? "/user" : "/admin"} replace />
          }
        />
        <Route element={<ProtectedRoute />}>
          <Route path="/user" element={<UserLayout />}>
            <Route index element={<Navigate to="subjects" replace />} />
            <Route path="subjects" element={<Subjects />} />
            <Route path="subjects/:subjectId" element={<SubjectDetails />} />
            <Route path="history" element={<HistoryDetails />} />

            <Route path="history/:subjectId" element={<HistoryDetails />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="subjects" replace />} />
            <Route path="subjects" element={<Subjects />} />
            <Route path="subjects/:subjectId" element={<SubjectDetails />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
