
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import HomePage from './Pages/HomePage/HomePage';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignupPage from './Pages/SignupPage/SignupPage';
import IMDashboard from './Pages/Dashboards/IMDashboard/IMDashboard';
import GMDashboard from './Pages/Dashboards/GMDashboard/GMDashboard';
import DDashboard from './Pages/Dashboards/DDashboard/DDashboard';
import ADashboard from './Pages/Dashboards/ADashboard/ADashboard';
import CSODashboard from './Pages/Dashboards/CSODashboard/CSODashboard';
import DSDashboard from './Pages/Dashboards/DSDashboard/DSDashboard';
import UploadItemsPage from './Pages/UploadItemsPage/UploadItemsPage';
import EditProductPage from './Pages/EditProductsPage/EditProductsPage';
import ProductList from './Pages/ProductList/ProductList';
import AdminList from './Pages/AdminList/AdminList';
import CustomerList from './Pages/CustomerList/CustomerList';
import SupplierList from "./Pages/SupplierList/SupplierList";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/imdashboard" element={<IMDashboard />} />
        <Route path="/gmdashboard" element={<GMDashboard />} />
        <Route path="/ddashboard" element={<DDashboard />} />
        <Route path="/adashboard" element={<ADashboard />} />
        <Route path="/csodashboard" element={<CSODashboard />} />
        <Route path="/dsdashboard" element={<DSDashboard />} />
        <Route path="/upload-items" element={<UploadItemsPage />} />
        <Route path="/edit-items" element={<EditProductPage />} />
        <Route path="/view-items" element={<ProductList />} />
        <Route path="/admins" element={<AdminList />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/suppliers" element={<SupplierList />} />
      </Routes>
    </Router>
  );
}

export default App;
