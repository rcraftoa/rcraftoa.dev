(function () {
  const storageKey = "theme";
  const darkTheme = "dark";
  const lightTheme = "light";
  const prefersDarkTheme =
    globalThis.matchMedia("(prefers-color-scheme: dark)").matches;
  const storedTheme = localStorage.getItem(storageKey);

  function setTheme(isDarkTheme) {
    document.documentElement.classList.add(
      isDarkTheme ? darkTheme : lightTheme,
    );
    document.documentElement.classList.remove(
      isDarkTheme ? lightTheme : darkTheme,
    );
  }

  if (storedTheme !== null) {
    setTheme(storedTheme === darkTheme);
  } else {
    setTheme(prefersDarkTheme);
    localStorage.setItem(
      storageKey,
      prefersDarkTheme ? darkTheme : lightTheme,
    );
  }
})();
