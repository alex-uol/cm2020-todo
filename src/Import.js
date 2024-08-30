// Import section of the Data Management page
import React, { useState } from "react";

// Data imoprt section
export default function Import({ onImport }) {
  const [fileData, setFileData] = useState();
  const [complete, setComplete] = useState();
  const [importError, setImportError] = useState();

  // Selected file was changed
  async function onFileChange(e) {
    const file = e.target.files[0];
    const text = await file.text();
    setFileData(text);
  }

  // Import data button was clicked
  function onImportClick() {
    try {
      // Parse data json
      let data = JSON.parse(fileData);
      // Clear localStorage and load with the new data
      localStorage.clear();
      for (const [key, value] of Object.entries(data)) {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      setImportError(e.toString());
      setFileData(null);
      return;
    }

    // Update state
    setComplete(true);
    onImport();
  }

  return (
    <section>
      <h3>Import</h3>
      <div style={{ marginBottom: "1rem" }}>
        Import data from a previous backup.
      </div>
      {!fileData ? (
        // File upload input
        <>
          {importError && (
            <div>
              <span class="error">Import Error: {importError} </span>
            </div>
          )}
          <input type="file" onChange={onFileChange} />
        </>
      ) : !complete ? (
        // Confirmation button
        <>
          <span className="warning">
            Warning! All the existing data will be lost.
          </span>
          <br />
          <button onClick={onImportClick}>Import anyway</button>
        </>
      ) : (
        // Success message
        <>
          <span className="success">
            Import complete! Please restart the application
          </span>
        </>
      )}
    </section>
  );
}
