import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Products from './Pages/Products/ProductsPage';
import AdminPage from './Pages/Admin/AdminPage';
import RequireAuth from './RequireAuth';
import SignUp from './Pages/SignUp/SignUp';
import SignIn from './Pages/SignIn/SignIn';
import Dashboard from './Pages/Dashboard/Dashboard';
import NotFound from './Pages/NotFound';
import { ExportDataProvider } from './context/DataExport';

const MainRoutes = () => {
  return (
    <ExportDataProvider>
      <Routes>

        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} /> */}
      </Routes>
    </ExportDataProvider>
  );
};

export default MainRoutes;
