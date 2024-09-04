import React, { useState, useEffect } from "react";

// Color scheme config key stored in localStorage
const colorSchemeKey = "colorScheme";

// Color selector component
// Allows selecting auto, light, dark modes
// auto is enabled by default
export default function ColorSelector() {
  const [colorScheme, setColorScheme] = useState(() => {
    // Get the initial value from localStorage or default to 'auto'
    return localStorage.getItem(colorSchemeKey) || "auto";
  });

  // Update document.body class to reflect current color scheme
  useEffect(() => {
    // Set <meta> color-scheme
    let content = "light dark";
    if (colorScheme === "light") {
      content = "only light";
    }
    if (colorScheme === "dark") {
      content = "only dark";
    }
    document
      .querySelector("meta[name=color-scheme]")
      .setAttribute("content", content);
    // Save the selected color scheme to localStorage
    localStorage.setItem(colorSchemeKey, colorScheme);
  }, [colorScheme]);

  function onColorSchemeSelect(value) {
    setColorScheme(value);
  }

  return (
    <div id="color-mode">
      <button
        disabled={colorScheme == "auto"}
        onClick={() => onColorSchemeSelect("auto")}
        title="Color scheme: Auto"
      >
        <span className="material-icons">&#xe3ab;</span>
      </button>
      <button
        disabled={colorScheme == "light"}
        onClick={() => onColorSchemeSelect("light")}
        title="Color scheme: Light"
      >
        <span className="material-icons">&#xe518;</span>
      </button>
      <button
        disabled={colorScheme == "dark"}
        onClick={() => onColorSchemeSelect("dark")}
        title="Color scheme: Dark"
      >
        <span className="material-icons">&#xe51c;</span>
      </button>
    </div>
  );
}
