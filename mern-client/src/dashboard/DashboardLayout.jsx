import React from 'react';
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="flex gap-4 flex-col md:flex-row">

      <SideBar />

      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
