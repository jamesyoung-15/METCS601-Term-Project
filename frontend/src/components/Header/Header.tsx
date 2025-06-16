import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import { navigation } from "../../types/index";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <span className="logo-text">Portfolio</span>
        </Link>

        <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
          <ul className="nav-list">
            {navigation.map((item) => (
              <li key={item.path} className="nav-item">
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? "nav-link-active" : ""}`}
                  onClick={closeMenu}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isMenuOpen ? "hamburger-open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
