import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"

const Navbar = () => {
  return (
    <div>
        <nav>
        <div className='weblogo'><Link  to="/"><h3>KryptoN</h3></Link></div>
            <div className='navlinks'>
            <Link to="/">Home</Link>
            <Link to="/coins">Coins</Link>
            <Link  to="/exchanges">Exchanges</Link>
            </div>
        </nav>
    </div>
  )
}

export default Navbar