import React from "react";
import { Link } from "react-router-dom";


export const Navbar = () => (
    <div>
        <nav className="navbar p-4  navbar-expand-lg navbar-light bg-info">
            <Link className="navbar-brand signature-link" to="/">React & Flask</Link>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link signature-link" to="/">Users</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link signature-link" to="/about">About</Link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
)
