import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import DataManagement from "../DataManagement";
import Import from "../Import";
import Export from "../Export";

// Tests for the DtaManagement component
// Coverts both data Import and Export
describe("DataManagement component", () => {
  test("loads and displays import and export sections", async () => {
    // Render
    render(<DataManagement onImport={() => {}} />);

    // Check content
    expect(screen.getByText("Data Export and Import")).toBeInTheDocument();
    expect(screen.getByText("Import")).toBeInTheDocument();
    expect(screen.getByText("Export")).toBeInTheDocument();
  });

  // Test importing data using file upload
  test("imports data", async () => {
    let importHandlerMock = jest.fn();

    // Simulate File API as jsdom doesn't support it yet
    class MockFile {
      constructor(data) {
        this.data = data;
      }
      async text() {
        return this.data;
      }
    }

    // Create an upload file mock
    const importData = {
      appParam: "abc",
    };
    const file = new MockFile(JSON.stringify(importData));

    // Render the import component
    const { container } = render(<Import onImport={importHandlerMock} />);

    // Simulate file selection
    const fileInput = container.querySelector("input[type=file]");
    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    // Upload button
    const uploadButton = container.querySelector("button");
    fireEvent.click(uploadButton);

    // Verify that the callback was executed
    expect(importHandlerMock).toHaveBeenCalledTimes(1);

    // Verify localStorage state
    expect(localStorage.getItem("appParam")).toEqual(importData.appParam);
  });

  // Test exporting data to a JSON file
  test("exports data", () => {
    // Render the export component
    const { container } = render(<Export />);

    // Mock URL.createObjectURL
    const createObjectURL = jest.fn();
    global.URL.createObjectURL = createObjectURL;

    // Click the export button
    const exportButton = container.querySelector("button");
    fireEvent.click(exportButton);

    // Check state update
    expect(screen.getByText("Export complete!")).toBeInTheDocument();

    // And mock calls
    expect(createObjectURL).toHaveBeenCalledTimes(1);
  });
});
