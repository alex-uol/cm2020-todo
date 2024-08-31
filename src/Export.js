// Export section of the Data Management page
import React, { useState } from "react";

// Export and download all settings
// Helper function for the Export component
function downloadExport() {
  const fileType = "application/json";
  const fileName = "todoapp_backup.json";

  // Create export data blob
  const blob = new Blob([JSON.stringify(localStorage)], {
    type: fileType,
  });
  const url = URL.createObjectURL(blob);

  // Create a link element
  const link = document.createElement("a");
  link.download = fileName;
  link.href = url;
  link.dataset.downloadurl = `${fileType}:${fileName}:${url}`;
  link.style.display = "none";

  // Append to the body and click
  document.body.appendChild(link);
  link.click();

  // Remove the link after a timeout
  setTimeout(function () {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 1000);
}

// Data export section
export default function Export() {
  // State that indicates when the data was exported
  const [complete, setComplete] = useState(false);

  function onClick() {
    downloadExport();
    setComplete(true);
  }

  return (
    <section>
      <h3>Export</h3>
      <div>Export all existing tasks and all associated data.</div>
      <div style={{ margin: "1rem 0" }}>
        {!complete ? (
          <button onClick={onClick}>Export Data</button>
        ) : (
          <span className="success">Export complete!</span>
        )}
      </div>

      <div>
        Keep the file safe and protected. Especially if it contains confidentail
        information
      </div>
    </section>
  );
}
