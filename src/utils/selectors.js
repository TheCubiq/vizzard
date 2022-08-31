export default function Selectors() {
  const panels = document.querySelectorAll('.mosaic-tile');
  return {
    editor: document.querySelector("#editor-base"),
    rootStyle: document.documentElement.style,
    header: document.querySelector("header"),
    headerButtons: document.querySelector("#editor-base > header > div:nth-child(2)"),
    panels,
    fullBottomPanel: panels[3],
    popupDialog: document.querySelector("body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div"),
    playPanel: document.getElementsByClassName("MuiDivider-flexItem")[1]?.parentElement,
    clipPanel: document.getElementsByClassName("ps")[3],
    vizzyLogo: document.querySelector("#root > div > header > div.MuiToolbar-root.MuiToolbar-regular.MuiToolbar-gutters > div > div:nth-child(1) > div"),
    vizzyLogoEditor: document.querySelector("#editor-base > header > .MuiBox-root"),
  };
}
