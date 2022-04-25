import { useState, useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import MainRoutes from './MainRoutes';
import { AuthContext } from './context/auth';
import { DashboardLayoutRoot } from './styles/styledComponents';

const MainLayout = () => {

  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <MainRoutes />
    </BrowserRouter>
  );
};

export default MainLayout;
