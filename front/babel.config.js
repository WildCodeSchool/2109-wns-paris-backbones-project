const presets =
	process.env["NODE_ENV"] !== "production"
		? [
				["@babel/preset-env", { targets: { node: "current" } }],
				["@babel/preset-react", { runtime: "automatic" }],
				"@babel/preset-typescript",
		  ]
		: null;

const plugins =
	process.env["NODE_ENV"] !== "production"
		? [["babel-plugin-transform-vite-meta-env"]]
		: null;

module.exports = { presets, plugins };
