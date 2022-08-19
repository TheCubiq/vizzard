import floatingPanel from "./styles/floatingPanel.css?inline";
import colorPicker from "./styles/colorPicker.css?inline";
import vizzyThemer from "./styles/vizzyThemer.css?inline";
import Selectors from "./utils/selectors";
import injectVizzard from "./vizzard";

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
  // check if we are in an editor by searching for an element #editor-base 
  const editorBase = Selectors().editor;
  if (!editorBase) {
    console.log("not in editor");
    return;
  }

  // make sure that the vizzard is not already injected
  if (editorBase.classList.contains("vizzard-injected")) {
    console.log("vizzard already injected");
    return
  }
  
  // inject vizzard
  injectVizzard();
  editorBase.classList.add("vizzard-injected");
};
