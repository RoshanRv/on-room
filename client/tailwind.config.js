/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                dPri: "#eab308",
                back: "#111827",
            },
            fontFamily: {
                disp: ["Raleway", " sans-serif"],
            },
        },
    },
    plugins: [],
}
