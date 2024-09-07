import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import TaskDetailForm from "../TaskDetailForm";

// Test task creation
describe("Create task", () => {
  // Cleanup after each test
  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

  // Helper function to render the task form inside a mock router
  function renderForm({ addTask, setSelectedTaskId }) {
    return render(
      <Router>
        <TaskDetailForm
          addTask={addTask}
          setSelectedTaskId={setSelectedTaskId}
          categories={[]}
          tags={[]}
        />
      </Router>
    );
  }

  // Load the form and verify its content
  test("loads the form", () => {
    renderForm({});

    // Verify content
    expect(screen.getByText("Create Task")).toBeInTheDocument();
  });

  test("submits unfinished form", () => {
    renderForm({});

    // Mock the alert() function
    const alertMock = jest.fn();
    global.alert = alertMock;

    // Submit the form
    const button = screen.getByText("Save Task");
    fireEvent.click(button);

    // Detect error/alert
    expect(alertMock).toHaveBeenCalledTimes(1);
  });

  test("submits valid form", () => {
    const addTaskMock = jest.fn();
    const setSelectedTaskIdMock = jest.fn();

    const { container } = renderForm({
      addTask: addTaskMock,
      setSelectedTaskId: setSelectedTaskIdMock,
    });

    // Mock the alert() function
    const alertMock = jest.fn();
    global.alert = alertMock;

    // Fill task title
    const taskTitle = "Test task title";
    const titleInput = container.querySelector("[name=title]");
    fireEvent.change(titleInput, {
      target: { value: taskTitle },
    });

    // Submit the form
    const button = screen.getByText("Save Task");
    fireEvent.click(button);

    // No errors/alerts
    expect(alertMock).toHaveBeenCalledTimes(0);

    // Check mock calls
    expect(addTaskMock).toHaveBeenCalledTimes(1);
    expect(setSelectedTaskIdMock).toHaveBeenCalledTimes(1);
  });
});
