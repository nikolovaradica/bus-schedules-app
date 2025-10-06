import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BusCompaniesPage from './pages/BusCompaniesPage';
import BusSchedulesPage from "./pages/BusSchedulesPage.tsx";
import * as React from "react";
import Layout from "./components/Layout.tsx";
import HomePage from "./pages/HomePage.tsx";
import './App.css'
import LoginPage from "./pages/LoginPage.tsx";
import CompanySchedulesPage from "./pages/CompanySchedulesPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="avtobuski-linii" element={<BusSchedulesPage />} />
                    <Route path="kompanii" element={<BusCompaniesPage />} />
                    <Route path="najavi-se" element={<LoginPage />} />
                    <Route path="registriraj-se" element={<RegisterPage />} />
                    <Route path="moi-linii" element={<CompanySchedulesPage />} />
                </Route>
                <Route path="*" element={<div>404 - Not Found</div>} />
            </Routes>
        </Router>
    );
}

export default App
