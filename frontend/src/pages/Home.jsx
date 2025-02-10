import React from 'react'
import Sidebar from '../components/Home/Sidebar'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex flex-col md:flex-row h-[98vh] gap-4'>
      {/* Sidebar */}
      <div className='w-full md:w-1/4 lg:w-1/6 border border-gray-500 rounded-xl p-4 flex flex-col justify-between'>
        <Sidebar />
      </div>

      {/* Konten Utama */}
      <div className='w-full md:w-3/4 lg:w-5/6 border border-gray-500 rounded-xl p-4 overflow-auto'>
        <Outlet />
      </div>
    </div>
  )
}

export default Home
