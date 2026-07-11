import React from 'react'
import { Outlet } from 'react-router-dom'
import Siddebar from '../pages/Siddebar'

export default function Sidebar() {
  return (
    
    <div className='sidebarlay'>
        <Siddebar></Siddebar>
       <div className='sideout'>
          <Outlet />
        </div>
    </div>
  )
}
