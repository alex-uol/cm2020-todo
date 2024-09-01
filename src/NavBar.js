import React from 'react';

function NavBar({ setContext }) {
  return (
    <nav className="navbar">
      <ul>
        <li onClick={() => setContext('list')}>All Tasks</li>
        <li onClick={() => setContext('create')}>Create Task</li>
        <li onClick={() => setContext('categorieManager')}>Category Manager</li>
        <li onClick={() => setContext('tagManager')}>Tag Manager</li>
        <li className="divider"></li>
        <li onClick={() => setContext("dataManagement")}>Export / Import</li>
        <li className="divider"></li>
        <li onClick={() => setContext("resetApp")}>Reset Application</li>
      </ul>
    </nav>
  );
}

export default NavBar;