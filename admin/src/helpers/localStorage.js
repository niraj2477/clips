export const loadTheme = () => {
  try {
    const isDark = localStorage.getItem("IsDark");
    if (isDark === null) {
      return false;
    }
    return JSON.parse(isDark);
  } catch (err) {
    return false;
  }
};

export const saveTheme = (theme) => {
  try {
    localStorage.setItem("IsDark", theme);
  } catch {
    // ignore write errors
  }
};
