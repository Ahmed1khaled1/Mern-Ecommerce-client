import React from 'react'
import { Outlet } from 'react-router-dom';

function authLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center bg-black px-12 w-1/2">
        <div className="text-center max-w-md space-y-6 text-primary">
          <h1 className='text-4xl font-extrabold tracking-tight text-white'>Welcome to shoping App</h1>
        </div>
      </div>
      <div className='flex flex-1 justify-center items-center bg-background py-12 px-4 sm:px-6 lg:px-8  '>
        <Outlet/>
      </div>
    </div>
  );
}

export default authLayout;