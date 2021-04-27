/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
	mount: {
		public: { url: "/", static: true },
		src: { url: "/dist" },
	},
	plugins: [
		"@snowpack/plugin-react-refresh",
		"@snowpack/plugin-dotenv",
		"@snowpack/plugin-typescript",
		"@snowpack/plugin-postcss",
	],
	routes: [
		{
			"match": "routes",
			"src": ".*",
			"dest": "/index.html",
		},
	],
	optimize: {
		bundle: true,
		minify: true,
	},
	devOptions: {
		port: 3000,
		open: "none",
	},
	buildOptions: {
		sourcemap: true,
	},
};

