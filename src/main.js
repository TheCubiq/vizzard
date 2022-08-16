import myButton from "./components/customButton";
import vizzyThemer from "./styles/vizzyThemer.css?inline";

window.addEventListener("load", function () {
    // load custom css
    GM_addStyle(vizzyThemer);
    // trigger vizzard reload
    vizzardReload();
  },
);


const injectVizzard = () => {
  const header = document.querySelector("header");
  const playPanel = document.getElementsByClassName("MuiDivider-flexItem")[1]
    .parentElement;

  header.appendChild(myButton());
  playPanel.appendChild(myButton());
}

const vizzardReload = () => {
  // check if we are in an editor by searching for an element #editor-base 
  const editorBase = document.querySelector("#editor-base");
  if (editorBase) {
    injectVizzard();
  }
  else {
    console.log("not in editor");
  }
};
