import vizzyThemer from "./styles/vizzyThemer.css?inline";

function run() {
  // if (self != top) return
  GM_addStyle(vizzyThemer);
  console.log("Vizzard Has Loaded!");
}

run();
