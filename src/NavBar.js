import React from 'react';

function NavBar({ setContext }) {
  return (
    <nav className="navbar">
      <ul>
        <li onClick={() => setContext('list')}>All Tasks</li>
        <li onClick={() => setContext('create')}>Create Task</li>
      </ul>
    </nav>
  );
}

export default NavBar;
