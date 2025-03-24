import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import HomePage from './Pages/HomePage/HomePage';
import AboutUs from './Pages/AboutUs/AboutUs';
import Contact from './Pages/Contact/Contact';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignupPage from './Pages/SignupPage/SignupPage';
import CustomerHomePage from './Pages/CustomerHomePage/CustomerHomePage';
import CusAboutUs from './Pages/CusAboutUs/CusAboutUs';
import CusContact from './Pages/CusContact/CusContact';
import SupplierHomePage from './Pages/SupplierHomePage/SupplierHomePage';
import SupAboutUs from './Pages/SupAboutUs/SupAboutUs';
import SupContact from './Pages/SupContact/SupContact';
import CusProfilePage from './Pages/CusProfilePage/CusProfilePage';
import SupProfilePage from './Pages/SupProfilePage/SupProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/cushome" element={<CustomerHomePage />} />
        <Route path="/cusabout" element={<CusAboutUs />} />
        <Route path="/cuscontact" element={<CusContact />} />
        <Route path="/suphome" element={<SupplierHomePage />} />
        <Route path="/supabout" element={<SupAboutUs />} />
        <Route path="/supcontact" element={<SupContact />} />
        <Route path="/cusprofile" element={<CusProfilePage />} />
        <Route path="/supprofile" element={<SupProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
