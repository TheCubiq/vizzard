import styleBundle from "./styles/dist/main.css?inline";

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
      GM_addStyle(styleBundle);
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
  }, 2000);
};
