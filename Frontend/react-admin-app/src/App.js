import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import HomePage from './Pages/HomePage/HomePage';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignupPage from './Pages/SignupPage/SignupPage';
import SHDashboard from './Pages/Dashboards/SHDashboard/SHDashboard';
import TDashboard from './Pages/Dashboards/TDashboard/TDashboard';
import MDashboard from './Pages/Dashboards/MDashboard/MDashboard';
import DDashboard from './Pages/Dashboards/DDashboard/DDashboard';
import UploadItemsPage from './Pages/UploadItemsPage/UploadItemsPage';
import EditProductPage from './Pages/EditProductsPage/EditProductsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/shdashboard" element={<SHDashboard />} />
        <Route path="/tdashboard" element={<TDashboard />} />
        <Route path="/mdashboard" element={<MDashboard />} />
        <Route path="/ddashboard" element={<DDashboard />} />
        <Route path="/upload-items" element={<UploadItemsPage />} />
        <Route path="/edit-items" element={<EditProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
