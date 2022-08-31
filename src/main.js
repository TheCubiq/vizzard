// styles:
import floatingPanel from "./styles/floatingPanel.css?inline";
import colorPicker from "./styles/colorPicker.css?inline";
import vizzyThemer from "./styles/vizzyThemer.css?inline";
import others from "./styles/others.css?inline";
import customFolds from "./styles/customFolds.css?inline";
import expandViews from "./styles/expandViews.css?inline";
// scripts:
import Selectors from "./utils/selectors";
import injectVizzard from "./vizzard";
import makeLogoClickable from "./scripts/vizzyLogoClickable";

window.addEventListener("load", function () {
  // trigger vizzard reload and inject styles as well
  vizzardReload(true);
});

// run function when navigating to a different page
new MutationObserver(function () {
  vizzardReload();
}).observe(document.querySelector("title"), {
  subtree: true,
  characterData: true,
  childList: true,
});

const vizzardReload = (inj_styles = false) => {
  setTimeout(() => {
    if (inj_styles) {
      // load custom css
      GM_addStyle(vizzyThemer);
      GM_addStyle(colorPicker);
      GM_addStyle(floatingPanel);
      GM_addStyle(others);
      GM_addStyle(customFolds);
      GM_addStyle(expandViews);
    }

    // inject scripts that will run on any vizzy page
    makeLogoClickable();

    const editorBase = Selectors().editor;
    // make sure we are in an editor
    // make sure that the vizzard is not already injected
    if (!editorBase || editorBase?.classList.contains("vizzard-injected"))
      return;

    // inject vizzard
    injectVizzard();
    editorBase.classList.add("vizzard-injected");
  }, 3000);
};
