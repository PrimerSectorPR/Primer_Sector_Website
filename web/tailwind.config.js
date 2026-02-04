/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#00A3E0',
                accent: '#F4D000',
                ink: '#000000',
                paper: '#F7F2E8', // Warmer paper background
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'], // Or a more grunge font if available
            }
        },
    },
    plugins: [],
}
