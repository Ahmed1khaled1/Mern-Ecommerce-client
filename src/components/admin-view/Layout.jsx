import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AdminHeader from "./Header";

function Layout() {
  const [open,setOpen] =useState(false)
  return (
    <div className="h-screen w-full flex overflow-y-auto">
      {/* sidebar component  */}
      <Sidebar open={open} setOpen={setOpen} />
      <div className="flex flex-1 flex-col">
        {/* header component  */}
        <AdminHeader setOpen={setOpen} />
        <main className="flex-1 flex bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
