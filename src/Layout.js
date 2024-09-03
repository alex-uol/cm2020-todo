import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import ColorSelector from './ColorSelector';

/** Returns a layout template, replaces NavBar
 * @returns {React.JSX.Element}
 */
export const Layout = () => {
  return (
    <div className="app">
      <nav className="navbar">
        <ul>
          <li>
            <NavLink to="/">All Tasks</NavLink>
          </li>
          <li>
            <NavLink to="/task">Create Task</NavLink>
          </li>
          <li>
            <NavLink to="/categoryManager">Categorie Manager</NavLink>
          </li>
          <li>
            <NavLink to="/tagManager">Tag Manager</NavLink>
          </li>
          <li className="divider"></li>
          <li>
            <NavLink to="/dataManagement">Export / Import</NavLink>
          </li>
          <li className="divider"></li>
          <li>
            <NavLink to="/resetApp">Reset App</NavLink>
          </li>
        </ul>
        <ColorSelector />
      </nav>
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};
