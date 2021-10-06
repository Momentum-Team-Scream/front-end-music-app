import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

export const Navbar = ({ auth, setAuth, clearStorage }) => {
  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          {auth ? (
            <>
              <div className="main-nav">
                <p className="navbar-brand">MusicAppLogo</p>

                <ul className="navbar-nav">
                  <Link to="/students">
                    <div className="nav-link text-white text-uppercase">
                      <p>Students</p>
                    </div>
                  </Link>
                  <Link to="/mydocs">
                    <div className="nav-link text-white text-uppercase">
                      <p className="nav-doc">My Docs</p>
                    </div>
                  </Link>
                </ul>
              </div>
              <div className="end-nav text-white">
                <div className="loggedin">
                  <div className="username">
                    <p>Welcome, username!</p>
                  </div>
                  <a
                    href
                    onClick={() => {
                      clearStorage('auth');
                      clearStorage('user');
                    }}
                  >
                    <button type="button" className="btn btn-outline-light">
                      Logout
                    </button>
                  </a>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="main-nav">
                <p className="navbar-brand">MusicAppLogo</p>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};
