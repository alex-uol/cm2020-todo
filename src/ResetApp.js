import React, { useState } from "react";

const ResetApp = ({ setTasks, setCategories, setTags }) => {
  const [complete, setComplete] = useState(false);
  
  const handleClearLocalStorage = () => {
    
    const userConfirmed = window.confirm('Are you sure you want to clear local storage?');

    if (userConfirmed) {
      localStorage.clear();
      alert('Local storage has been cleared.');

      // Clear state data
      setTasks([]);
      setCategories([]);
      setTags([]);

      setComplete(true);
    }
  };

  return (
    <div id="reset-app">
    <h2>Reset Application by clearing all data in local storage!</h2>
    <div>
       Are you sure you want to clear local storage?
    </div>
    <div style={{ margin: "1rem 0" }}>
        {!complete ? (
          <button onClick={handleClearLocalStorage}>Clear Local Storage</button>
        ) : (
          <span className="label-success">Cleared Local Storage!</span>
        )}
      </div>
      
    </div>
  );
};

export default ResetApp;