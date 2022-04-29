const colors = {
	primary: {
		darker: "#15BE77",
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
		darker: "#010101",
		dark: "#252525",
		medium: "#444",
		light: "#CECDD2",
		transparent: "rgba(206,205,210,0.15)",
	},
	light: {
		dark: "#ECEEF2",
		medium: "#FAFAFA",
		light: "#FFFFFF",
	},
};

module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	theme: {
		extend: {
			colors,
			fontFamily: {
				"main-regular": "Roboto_400Regular",
				"main-bold": "Roboto_700Bold",
				"main-light": "Roboto_300Light",
				"main-extralight": "Roboto_100Thin",
			},
			fontSize: {
				xxs: ".5rem",
			},
		},
	},
	plugins: [],
};