module.exports = {
	purge: [
		"./public/**/*.html",
		"./src/**/*.{ts,tsx}",
	],
	plugins: [
		require("@tailwindcss/forms"),
	],
};
