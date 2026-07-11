import React from 'react'
import Navbar from '../component/Navbar'
import Home from '../pages/Home'
import { Outlet } from 'react-router-dom'
import TopHeader from '../component/Topheader'

export default function Homenav() {
  return (
    <div>
      <TopHeader></TopHeader>
        <Navbar></Navbar>
        <div>
          <Outlet />
        </div>
    </div>
  )
}
