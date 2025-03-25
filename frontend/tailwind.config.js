module.exports = {
	darkMode: ["class"],
	content: [
		"./src/**/*.{html,js,jsx,ts,tsx}", // Adjust this according to your file structure
		"./public/index.html", // If you're using a single HTML file
	],
	theme: {
		extend: {
			fontFamily: {
				exo: ['"Exo 2"', 'sans-serif'],
				raleway: ['Raleway', 'sans-serif']
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				'neon-cyan': '#00FFFF',
				'deep-space-black': '#1A1A2E',
				'vivid-purple': '#8A2BE2',
				'hot-pink': '#FF69B4',
				'cool-gray': '#B0C4DE',
				'lime-green': '#32CD32',
				'cyber-glow-start': '#00FFFF',
				'cyber-glow-end': '#8A2BE2',
				'night-pulse-start': '#1A1A2E',
				'night-pulse-end': '#FF69B4',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
};
