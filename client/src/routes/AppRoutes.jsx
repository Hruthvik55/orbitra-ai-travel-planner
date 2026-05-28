import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LandingPage from "../pages/LandingPage";

import Login from "../pages/auth/Login";

import Register from "../pages/auth/Register";

import Dashboard from "../pages/dashboard/Dashboard";

import UploadPage from "../pages/dashboard/UploadPage";

import ItineraryDetails from "../pages/dashboard/ItineraryDetails";

import PublicItinerary from "../pages/public/PublicItinerary";

import ProtectedRoute from "../components/common/ProtectedRoute";


const AppRoutes = () => {
  return (
    <BrowserRouter>

      <Routes>

        {/* Landing */}
        <Route
          path="/"
          element={<LandingPage />}
        />


        {/* Public Routes */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/share/:shareId"
          element={<PublicItinerary />}
        />


        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/itinerary/:id"
          element={
            <ProtectedRoute>
              <ItineraryDetails />
            </ProtectedRoute>
          }
        />


        {/* Fallback */}
        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;