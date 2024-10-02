import React from 'react'
import { Outlet } from 'react-router-dom'

const ALayout = () => {


  return (
    <div>
      <h1>Page admin hhhh 
        {/* { login } */}

      </h1>
        <Outlet/>
    </div>
  )
}

export default ALayout
