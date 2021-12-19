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


export const setUser = (user) => {
  try {
    localStorage.setItem("user", JSON.stringify(user));
  } catch {
    // ignore write errors
  }
};

export const getUser = () => {
  try {
    const user = localStorage.getItem("user");
    if (user === null) {
      return false;
    }
    return user;
  } catch (err) {
    return false;
  }
};
export const checkUser = () => {
  try {
    const user = localStorage.getItem("user");
    if (user === null) {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
};