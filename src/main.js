import myButton from "./components/customButton";
import vizzyThemer from "./styles/vizzyThemer.css?inline";

function run() {
  // if (self != top) return
  GM_addStyle(vizzyThemer);
  injectVizzard();
  console.log("Vizzard Has Loaded!");
}

const injectVizzard = () => {
  const header = document.querySelector("header");
  const playPanel = document.getElementsByClassName("MuiDivider-flexItem")[1]
    .parentElement;

  header.appendChild(myButton());
  playPanel.appendChild(myButton());
}

run();
