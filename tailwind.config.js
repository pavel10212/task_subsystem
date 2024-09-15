/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{html,js,jsx}',
        './components/**/*.{html,js,jsx}',
        './layouts/**/*.{html,js,jsx}',
        './pages/**/*.{html,js,jsx}',
        './templates/**/*.{html,js,jsx}',
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
        },
    },
    plugins: [],
};