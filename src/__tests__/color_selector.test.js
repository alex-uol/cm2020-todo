import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ColorSelector from "../ColorSelector";

// Tests for the ColorSelector component
describe("ColorSelector component", () => {
  // Add necessary tag to the document head
  beforeEach(() => {
    const colorSchemeMeta = document.createElement("meta");
    colorSchemeMeta.setAttribute("name", "color-scheme");
    document.head.appendChild(colorSchemeMeta);
  });

  function getMetaValue() {
    return document.head
      .querySelector("meta[name=color-scheme]")
      .getAttribute("content");
  }

  // Test component rendering
  test("loads and displays content", () => {
    // Render
    const { container } = render(<ColorSelector />);

    // Make sure all buttons are rendered
    const selectButtons = container.querySelectorAll("button");
    expect(selectButtons.length).toEqual(3);
  });

  test("switches to the light mode", () => {
    // Render
    render(<ColorSelector />);

    // Switch style
    const lightButton = screen.getByTitle("Color scheme: Light");
    fireEvent.click(lightButton);

    // Verify values
    expect(localStorage.getItem("colorScheme")).toEqual("light");
    expect(getMetaValue()).toEqual("only light");
  });

  test("switches to the dark mode", () => {
    // Render
    render(<ColorSelector />);

    // Switch style
    const lightButton = screen.getByTitle("Color scheme: Dark");
    fireEvent.click(lightButton);

    // Verify values
    expect(localStorage.getItem("colorScheme")).toEqual("dark");
    expect(getMetaValue()).toEqual("only dark");
  });

  test("switches to the auto mode", () => {
    // Render
    render(<ColorSelector />);

    // Switch style
    const lightButton = screen.getByTitle("Color scheme: Auto");
    fireEvent.click(lightButton);

    // Verify values
    expect(localStorage.getItem("colorScheme")).toEqual("auto");
    expect(getMetaValue()).toEqual("light dark");
  });
});
