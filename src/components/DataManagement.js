// Allow users perform data Export and Import operations
import React from "react";
import Export from "./Export";
import Import from "./Import";

// Render the data management page, main component
export default function DataManagement({ onImport }) {
  return (
    <div id="data-management">
      <h2>Data Export and Import</h2>
      <div>
        Manage application data. Save all your tasks or load them from a backup.
      </div>
      <Export />
      <Import onImport={onImport} />
    </div>
  );
}
