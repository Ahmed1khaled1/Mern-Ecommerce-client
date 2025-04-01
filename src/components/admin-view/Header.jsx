import React from 'react'
import { Button } from '../ui/button'
import { LogOut, Menu } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/store/auth-slice';

function AdminHeader({ setOpen }) {
const dispatch = useDispatch()
  const handleLogout = ()=>{
    dispatch(logoutUser())
  }

  return (
    <header className="sticky top-0 z-10 flex justify-between items-center px-5 py-3 border-b bg-white">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <Menu />
        <span className="sr-only">Toggle Menue</span>
      </Button>
      <div className="flex justify-end flex-1">
        <Button onClick={handleLogout} className="font-medium shadow">
          <LogOut />
          <span>Logout</span>
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader