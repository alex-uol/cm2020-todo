import React from 'react';

/** NavBar is replaced by Layout in order to add routing feature
 * @deprecated
 * @param {object} param0 
 * @param {string} param0.setContext
 * @returns {React.JSX.Element}
 */
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