import { Link } from 'react-router'
import './Header.css'

function Header() {

  return (
    <div className="header">
      <Link className="header-link" to="/">
        <h1>AlcFinder2</h1>
      </Link>
      <p>Find the nearest breweries near you! #2 cuz i lost my project data TWICE!</p>
    </div>
  )
}

export default Header
