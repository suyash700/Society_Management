import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';  // No need to import BrowserRouter here anymore
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import UserDashboard from './components/UserDashboard';
import UserDetails from './components/UserDetails';
import EventPage from './components/EventPage';
import UpdateProfile from './components/UpdateProfile';
import PaymentPage from './components/PaymentPage';
import AdminDashboard from './components/AdminDashboard';
import UserMaintain from './components/UserMaintain';
import Residents from './minicomponents/Residents';
import Complaints from './minicomponents/Complaints';
import Maintenance from './minicomponents/Maintenance';
import Announcements from './minicomponents/Announcements';
import AdminLayout from './minicomponents/AdminLayout';
import EditUser from "./components/AdminUpdate";
import UpdateUserMaintenance from './components/UpdateMaintainance';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/details" element={<UserDetails />} />
        <Route path="/maintainanace" element={<UserMaintain />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/payment" element={<PaymentPage />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />

     {/* Nested Admin Routes */}
     <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<Residents />} />
            <Route path="complaints" element={<Complaints />} />
            <Route path="maintenance" element={<Maintenance />} />
            <Route path="announcements" element={<Announcements />} />
            <Route path="edit-user/:id" element={<EditUser />} />
            <Route path="update-maintenance/:id" element={<UpdateUserMaintenance />} />

          </Route>

      </Routes>
    </div>
  );
}

export default App;
