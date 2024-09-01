import React from 'react';
import { Outlet, Link } from "react-router-dom";

/** Returns a layout template, replaces NavBar
 * @returns {React.JSX.Element}
 */
export const Layout = () => {
  return (
    <div className="app">
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/">All Tasks</Link>
          </li>
          <li>
            <Link to="/task">Create Task</Link>
          </li>
          <li>
            <Link to="/categorieManager">Categorie Manager</Link>
          </li>
          <li>
            <Link to="/tagManager">Tag Manager</Link>
          </li>
          <li className="divider"></li>
          <li>
            <Link to="/dataManagement">Export / Import</Link>
          </li>
        </ul>
      </nav>
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  )
}