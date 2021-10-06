import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

export const Navbar = ({ auth, setAuth, clearStorage }) => {
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          {auth ? (
            <>
              <div className="main-nav">
                <p className="navbar-brand">MusicAppLogo</p>

                <ul className="navbar-nav">
                  <div className="nav-item nav-link active">
                    <Link to="/students">
                      <p>Students</p>
                    </Link>
                  </div>
                  <div className="nav-item nav-link active">
                    <Link to="/mydocs">
                      <p className="nav-doc">My Docs</p>
                    </Link>
                  </div>
                </ul>
              </div>
              <div className="end-nav">
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
                    <button type="button" className="btn btn-outline-dark">
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
