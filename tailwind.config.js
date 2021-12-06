module.exports = {
  important: true,
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      colors: {
        "bb-purple": "#5469D4",
        "bb-env": "#F1F5F9",
        "bb-border": "#E4E4E7",
        "bb-gray-700": "#37415",
        "bb-gray-600": "#4B5563",
        "bb-red": "#F56565",
        "bb-green": "#31C48D",
        "bb-yellow": "#F6B100",
        "nitro-gray-800": "#1F2937",
        "nitro-indigo": "#EEF2FF",
        "simple-bg-gray": "#F8F9F9",
        "bb-indigo-500": "#6366F1"
      },
      boxShadow: {
        "custom-box-shadow": "10px 10px 5px 200px rgba(0,0,0,1)"
      }
    },
  },
  variants: {
    backgroundColor: ["even"],
    textColor: ["first","hover"]
  },
  plugins: [],
}
