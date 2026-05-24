import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import AddLead from './pages/AddLead';
import Employees from './pages/Employees';
import Pipeline from './pages/Pipeline';
import ProtectedRoute from './components/ProtectedRoute';
import FollowUps from './pages/FollowUps';
import Performance from './pages/Performance';
import AdminRoute from './components/AdminRoute';
import EmployeeRoute from './components/EmployeeRoute';
import CreateEmployee from './pages/CreateEmployee';
import MyLeads from './pages/MyLeads';
import LeadDetails from './pages/LeadDetails';
function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leads"
          element={
            <ProtectedRoute>
              <Leads />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-lead"
          element={
            <ProtectedRoute>
              <AddLead />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <Employees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pipeline"
          element={
            <ProtectedRoute>
              <Pipeline />
            </ProtectedRoute>
          }
        />
        <Route
          path="/followups"
          element={
            <ProtectedRoute>
              <FollowUps />
            </ProtectedRoute>
          }
        />
        <Route
          path="/performance"
          element={
            <ProtectedRoute>
              <Performance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-employee"
          element={
            <AdminRoute>
              <CreateEmployee />
            </AdminRoute>
          }
        />
        <Route
          path="/my-leads"
          element={
            <EmployeeRoute>
              <MyLeads />
            </EmployeeRoute>
          }
        />  
        <Route
          path="/lead-details/:id"
          element={
            <ProtectedRoute>
              <LeadDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;