export default function Selectors() {
  return {
    editor: document.querySelector("#editor-base"),
    header: document.querySelector("header"),
    playPanel: document.getElementsByClassName("MuiDivider-flexItem")[1]
      .parentElement,
  };
};