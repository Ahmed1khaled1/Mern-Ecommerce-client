import React from 'react'
import { Outlet } from 'react-router-dom'
import ShoppingHeader from './Header';

function ShoppingLayout() {
  return (
    <div className='flex flex-col h-screen overflow-y-auto '>
      {/* commen header  */}
      <ShoppingHeader/>
      <main className='flex flex-col w-full'>
        <Outlet/>
      </main>
    </div>
  )
}

export default ShoppingLayout;