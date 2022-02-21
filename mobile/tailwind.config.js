const colors = {
  primary: {
    dark: "#55E58B",
    medium: "#61FFA0",
    light: "#96FFCD",
  },
  secondary: {
    dark: "#F95A80",
    medium: "#FB85A1",
    light: "#FDABBE",
  },
  dark: {
    darker: "#09051C",
    dark: "#252525",
    medium: "#86848F",
    light: "#CECDD2",
  },
  light: {
    dark: "#ECEEF2",
    medium: "#FAFAFA",
    light: "#FFFFFF",
  },
};

module.exports = {
  content: [],
  theme: {
    extend: {
      colors,
      fontFamily: {
        "main-regular": "Roboto_400Regular",
        "main-bold": "Roboto_700Bold",
        "main-light": "Roboto_300Light",
        "main-extralight": "Roboto_100Thin",
      },
    },
  },
  plugins: [],
};
