import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './nav.css';

const Nav = ({ user, onLogout, cartCount }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="logo-text">SportSpot</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="navbar-links">
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/products" className="nav-link">Products</NavLink>
          <NavLink to="/cart" className="nav-link cart-nav">
            Cart
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </NavLink>
        </div>

        {/* Right Section - Auth & Profile */}
        <div className="navbar-actions">
          {user ? (
            <div className="profile-section">
              <Link to="/profile" className="profile-trigger">
                <div className="profile-avatar">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="Profile" />
                </div>
                <div className="profile-info desktop-only">
                  <span className="profile-name">{user.name}</span>
                </div>
              </Link>
              <button className="logout-btn desktop-only" onClick={onLogout}>Logout</button>
            </div>
          ) : (
            <div className="auth-links desktop-only">
              <Link to="/account/login" className="login-link">Login</Link>
              <Link to="/account/signup" className="signup-btn">Sign Up</Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <NavLink to="/" className="mobile-link" onClick={toggleMobileMenu}>Home</NavLink>
          <NavLink to="/products" className="mobile-link" onClick={toggleMobileMenu}>Products</NavLink>
          <NavLink to="/cart" className="mobile-link" onClick={toggleMobileMenu}>Cart ({cartCount})</NavLink>
          {user ? (
            <>
              <NavLink to="/profile" className="mobile-link" onClick={toggleMobileMenu}>Profile</NavLink>
              <button className="mobile-link logout-link" onClick={() => { onLogout(); toggleMobileMenu(); }}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/account/login" className="mobile-link" onClick={toggleMobileMenu}>Login</NavLink>
              <NavLink to="/account/signup" className="mobile-link" onClick={toggleMobileMenu}>Sign up</NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Nav;