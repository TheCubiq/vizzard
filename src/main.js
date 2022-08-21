import floatingPanel from "./styles/floatingPanel.css?inline";
import colorPicker from "./styles/colorPicker.css?inline";
import vizzyThemer from "./styles/vizzyThemer.css?inline";
import Selectors from "./utils/selectors";
import injectVizzard from "./vizzard";
import makeLogoClickable from "./scripts/vizzyLogoClickable";

window.addEventListener("load", function () {
  // load custom css
  GM_addStyle(vizzyThemer);
  GM_addStyle(colorPicker);
  GM_addStyle(floatingPanel);
  // trigger vizzard reload
  vizzardReload();
});

// run function when navigating to a different page
new MutationObserver(function () {
  vizzardReload();
}).observe(document.querySelector("title"), {
  subtree: true,
  characterData: true,
  childList: true,
});


const vizzardReload = () => {
  // inject scripts that will run on any vizzy page
  makeLogoClickable();
  
  const editorBase = Selectors().editor;
  // make sure we are in an editor 
  // make sure that the vizzard is not already injected
  if (!editorBase || editorBase?.classList.contains("vizzard-injected"))  return;

  // inject vizzard
  injectVizzard();
  editorBase.classList.add("vizzard-injected");
};
