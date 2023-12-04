import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <>
    <div className='sidebar'>
        <h1>Karen</h1>

        <div className='apartados'>
            <Link to={'/admin'} className='link'>Administradores</Link>
        </div>
        <div className='apartados'>
            <Link to={'/lugar'} className='link'>Lugares</Link>
        </div>
    </div>
    </>
  )
}

export default Sidebar
