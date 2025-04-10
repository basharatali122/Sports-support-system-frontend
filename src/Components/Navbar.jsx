import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar bg-primary text-primary-content px-6 shadow-lg flex pt-5 pb-3">
      {/* Left Section: Brand Name */}
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-2xl font-bold">
          VU Sports Society
        </Link>
      </div>

      {/* Right Section: Navigation Links */}
      <div className="flex gap-4 align-middle">
        <Link to="/login" className="btn btn-ghost text-lg py-2 font-semibold">Login</Link>
        <Link to="/register" className="btn btn-accent text-lg px-4 py-2 font-semibold rounded-lg">
          Register
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
