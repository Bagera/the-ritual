const baseUrl = "https://the-ritual.netlify.app/";
// const baseUrl = "";
// const baseUrl = "http://127.0.0.1:5500/";
window.story.state.currentLoc = "St Mary";

function setBase(baseUrl) {
  const base = document.createElement("base");
  base.setAttribute("href", baseUrl);
  document.head.prepend(base);
}

if(baseUrl) {
	setBase(baseUrl);
}

Utils.addStyle(baseUrl + "css/style.css");
Utils.addStyle(baseUrl + "css/fonts.css");
Utils.addScript(baseUrl + "js/splat.js");

Utils.addScript(baseUrl + "js/ritual-map.js");
Utils.addStyle(baseUrl + "css/ritual-map.css");

Utils.addScript(baseUrl + "js/ritual-clock.js");
Utils.addStyle(baseUrl + "css/ritual-clock.css");

Utils.addScript(baseUrl + "js/ritual-inventory.js");
Utils.addStyle(baseUrl + "css/ritual-inventory.css");

Utils.addScript(baseUrl + "js/ritual-modal.js");
Utils.addStyle(baseUrl + "css/ritual-modal.css");

Utils.addScript(baseUrl + "js/main.js");
