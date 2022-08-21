export default function Selectors() {
  return {
    editor: document.querySelector("#editor-base"),
    header: document.querySelector("header"),
    playPanel: document.getElementsByClassName("MuiDivider-flexItem")[1]?.parentElement,
    rootStyle: document.documentElement.style,
    clipPanel: document.getElementsByClassName("ps")[3],
    fullBottomPanel: document.querySelector("#editor-base > div > div > div.mosaic-root > div:nth-child(7)"),
    vizzyLogo: document.querySelector("#root > div > header > div.MuiToolbar-root.MuiToolbar-regular.MuiToolbar-gutters > div > div:nth-child(1) > div"),
    vizzyLogoEditor: document.querySelector("#editor-base > header > .MuiBox-root"),
  };
}
