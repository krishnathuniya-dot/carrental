import React from 'react'
import { Outlet } from 'react-router-dom'
import Siddebar from '../pages/Siddebar'
import Amindashboard from '../pages/Admindashboard'

export default function Adminnav() {
  return (
    
      <div style={{ display: "flex" }}>
      <Amindashboard></Amindashboard>
        <div style={{ flex: 1, padding: "20px" }}>
          <Outlet />
        </div>
    </div>
  )
}

    