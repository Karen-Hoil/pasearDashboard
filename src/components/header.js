import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
    <div className='header'>
        <img className="logo" src="https://cdn-icons-png.flaticon.com/512/2045/2045891.png" alt="Logo" />
        <h2>HORA DE PASEAR</h2>
        <Link to={'/'} className='cerrar'>Cerrar</Link>
    </div>
    )
}

export default Header
