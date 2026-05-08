/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        accent: '#F8E71C',       // jaune vif — identité visuelle originale
        'text-main': '#1C1C1C',  // texte principal
        // TYPO À VALIDER — couleurs de fond des sections à relever via DevTools
      },
      fontFamily: {
        // TYPO À VALIDER — familles à confirmer via DevTools sur lesecranspastoutletemps.fr
        heading: ['Raleway', 'sans-serif'],
        body: ['Nunito', 'sans-serif'],
      },
      fontSize: {
        // TYPO À VALIDER — tailles à confirmer via DevTools
      },
    },
  },
  plugins: [],
};
