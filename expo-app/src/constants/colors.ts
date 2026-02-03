type ThemeColorsType = {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  border: string;
  inactive: string;
  error: string;
};

const darkColors: ThemeColorsType = {
  primary: "#1E90FF",
  secondary: "#FF69B4",
  background: "#121212",
  text: "#FFFFFF",
  border: "#272727",
  inactive: "#f4f3f4",
  error: "#ff3333",
};

const useColors = () => {
  return darkColors;
};

export { useColors };
