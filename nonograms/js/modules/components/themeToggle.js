import { renderElement } from "../render.js";
import { state } from "../main.js";

export const renderThemeToggle = () => {
  const themeToggleContainer = renderElement(
    "div",
    "theme-toggle-container",
    document.getElementById('mainHeader')
  );
  const inputThemeToggle = renderElement(
    "input",
    "theme-toggle-input",
    themeToggleContainer,
    {
      type: "checkbox",
      id: "theme-toggle",
    }
  );
  inputThemeToggle.addEventListener("change", () => {
    toggleThemeHandler();
  });
  const labelThemeToggle = renderElement("label", "", themeToggleContainer, {
    htmlFor: "theme-toggle",
  });
  const spanThemeToggle = renderElement("span", "", themeToggleContainer, {
    innerText: "Dark Theme",
  });
};

export const toggleThemeHandler = () => {
  const root = document.documentElement;
  if (state.isLightTheme) {
    state.isLightTheme = false;
    root.style.setProperty("--bg-color", "rgb(42, 42, 42)");
    root.style.setProperty("--border-color", "#fff");
    root.style.setProperty("--text-color", "#fff");
    root.style.setProperty("--text-color-secondary", "#fff");
    root.style.setProperty("--primary-color", "#fff");
  } else {
    state.isLightTheme = true;
    root.style.setProperty("--bg-color", "#fff");
    root.style.setProperty("--border-color", "#717171");
    root.style.setProperty("--text-color", "#000");
    root.style.setProperty("--text-color-secondary", "#4a4a4a");
    root.style.setProperty("--primary-color", "#1d2443");
  }
};