import vizzyThemer from "./styles/vizzyThemer.css?inline";
import injectVizzard from "./vizzard";

window.addEventListener("load", function () {
    // load custom css
    GM_addStyle(vizzyThemer);
    // trigger vizzard reload
    vizzardReload();
  },
);


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
  const editorBase = document.querySelector("#editor-base");
  if (editorBase) {
    injectVizzard();
  }
  else {
    console.log("not in editor");
  }
};
