import { renderElement } from "../render.js";

let isDarkTheme = false;

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
      checked: isDarkTheme
    }
  );
  inputThemeToggle.addEventListener("change", () => {
    toggleThemeHandler();
  });
  renderElement("label", "", themeToggleContainer, {
    htmlFor: "theme-toggle",
  });
  renderElement("span", "", themeToggleContainer, {
    innerText: "Dark Theme",
  });
};

export const toggleThemeHandler = () => {
  const toggleCheckbox = document.getElementById("theme-toggle");
  const root = document.documentElement;
  if (toggleCheckbox.checked) {
    isDarkTheme = true;
    root.style.setProperty("--bg-color", "rgb(42, 42, 42)");
    root.style.setProperty("--border-color", "#fff");
    root.style.setProperty("--text-color", "#fff");
    root.style.setProperty("--text-color-secondary", "#fff");
    root.style.setProperty("--primary-color", "#fff");
    root.style.setProperty("--primary-color-hover", "#717171");
  } else {
    isDarkTheme = false;
    root.style.setProperty("--bg-color", "#fff");
    root.style.setProperty("--border-color", "#717171");
    root.style.setProperty("--text-color", "#000");
    root.style.setProperty("--text-color-secondary", "#4a4a4a");
    root.style.setProperty("--primary-color", "#1d2443");
    root.style.setProperty("--primary-color-hover", "#2d386b");
  }
};