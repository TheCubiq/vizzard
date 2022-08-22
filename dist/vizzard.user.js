// ==UserScript==
// @name              Vizzard
// @version           0.0.70-1
// @description       customize the look and feel of the vizzy website!
// @author            Cubiq The Creator
// @namespace         https://github.com/TheCubiq/vizzard
// @license           GPL-3.0
// @match             https://vizzy.io/*
// @require           https://greasyfork.org/scripts/449986-vizzardvers/code/VizzardVers.user.js
// @icon              https://vizzy.io/favicon.ico
// @supportURL        https://github.com/TheCubiq/vizzard
// @grant             GM_addStyle
// @grant             GM_getValue
// @grant             GM_setValue
// @grant             GM_info
// @grant             unsafeWindow
// ==/UserScript==

(function() {
  "use strict";
  ;
  const floatingPanel = ":root {\r\n  /* set the height of the panel in closed state */\r\n  --floatingPanelClosed: calc(100% - 50px);\r\n}\r\n\r\n@media (pointer: coarse){\r\n  :root {\r\n    --floatingPanelClosed: calc(100% - 59px);\r\n  }\r\n}\r\n\r\n/* apply transitions to all these: */\r\n\r\n/* canvas tile */\r\n.mosaic-root .mosaic-tile:nth-child(5),\r\n\r\n/* when panelFloat: */\r\n.panelFloat .mosaic-root .mosaic-tile,\r\n/* splitters */\r\n.panelFloat .mosaic-root .mosaic-split {\r\n  transition: top 0.3s 0.2s, bottom 0.3s 0.2s;\r\n}\r\n\r\n/* shrink/expand navbar button */\r\n/* explore projects button */\r\n.panelFloat div.mosaic-window-body > div > nav > button,\r\n.panelFloat\r\n  .mosaic-root\r\n  > div:nth-child(1)\r\n  > div\r\n  > div.mosaic-window-body\r\n  > div\r\n  > div\r\n  > div\r\n  > div:nth-child(3)\r\n  > button {\r\n  bottom: 15px;\r\n}\r\n\r\n/* waveform anim */\r\n.ps > div > div:nth-child(1) > div:nth-child(1) > canvas {\r\n  transition: all 0.3s;\r\n}\r\n\r\n/* in folded state hide the waveform */\r\n.panelFloat .ps > div > div:nth-child(1) > div:nth-child(1) > canvas {\r\n  opacity: 0;\r\n}\r\n\r\n/* waveform bg in folded state */\r\n.panelFloat .ps > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) {\r\n  background-color: transparent !important;\r\n}\r\n\r\n/* waveform in open state */\r\n.panelFloat.clipHover .ps > div > div:nth-child(1) > div:nth-child(1) > canvas {\r\n  filter: invert(1) drop-shadow(5px 0px 10px var(--cubiq-accent-light))\r\n    brightness(0.7);\r\n  opacity: 1;\r\n}\r\n\r\n/* opaque panel looks too sicc */\r\n.panelFloat div.mosaic-root > div:nth-child(7) > div > div.mosaic-window-body {\r\n  transition: background 0.3s;\r\n  backdrop-filter: blur(20px) brightness(0.2);\r\n}\r\n.panelFloat.floatingPanelOpaque\r\n  div.mosaic-root\r\n  > div:nth-child(7)\r\n  > div\r\n  > div.mosaic-window-body {\r\n  background: none !important;\r\n}\r\n\r\n/* remove lines between clips */\r\n.panelFloat\r\n  .mosaic-root\r\n  > div:nth-child(7)\r\n  > div\r\n  > div.mosaic-window-body\r\n  > div\r\n  > div\r\n  > div.ps\r\n  > div\r\n  > .ps\r\n  > div:nth-child(1)\r\n  > div\r\n  > div,\r\n.panelFloat\r\n  .mosaic-root\r\n  > div:nth-child(7)\r\n  > div\r\n  > div.mosaic-window-body\r\n  .ps\r\n  > div\r\n  > .ps\r\n  > div:nth-child(1)\r\n  > div {\r\n  background-size: unset !important;\r\n}\r\n\r\n/* increase the height of objects window  */\r\n.panelFloat\r\n  .mosaic-root\r\n  > div\r\n  > div\r\n  > div.mosaic-window-body\r\n  > div\r\n  > div\r\n  > div\r\n  > div.scrollbar-container.ps\r\n  > div:nth-child(1) {\r\n  height: calc(100% - 9px);\r\n}\r\n\r\n/* move the panel to the bottom when it's not open and floating */\r\n.panelFloat:not(.clipHover) .mosaic-root .mosaic-tile:nth-child(7) {\r\n  top: var(--floatingPanelClosed) !important;\r\n  z-index: 2;\r\n}\r\n\r\n/* style our nice pin */\r\n.vizzard-pin {\r\n  -webkit-user-select: none; /* Safari */\r\n  -ms-user-select: none; /* IE 10 and IE 11 */\r\n  user-select: none; /* Standard syntax */\r\n  transition: box-shadow, background-color, opacity,\r\n    150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;\r\n  border-radius: 50%;\r\n  /* background-color: transparent; */\r\n  filter: grayscale(100%);\r\n  opacity: 0.7;\r\n  cursor: pointer;\r\n}\r\n\r\n.vizzard-pin:hover {\r\n  background-color: rgba(255, 255, 255, 0.16);\r\n  box-shadow: 0px 0px 0px 4px rgba(255, 255, 255, 0.16);\r\n}\r\n\r\n.panelFloat .vizzard-pin {\r\n  opacity: 0.3;\r\n}\r\n\r\n/* if panelFloat, stretch all the views except the panel to very bottom */\r\n.panelFloat .mosaic-root .mosaic-tile:not(:nth-child(7)),\r\n.panelFloat .mosaic-root .mosaic-split.-row {\r\n  bottom: 44px !important;\r\n}\r\n\r\n.panelFloat .mosaic-root .mosaic-split.-column {\r\n  cursor: default;\r\n  pointer-events: none;\r\n}\r\n\r\n.panelFloat:not(.clipHover) .mosaic-root .mosaic-split.-column {\r\n  top: var(--floatingPanelClosed) !important;\r\n}\r\n";
  const colorPicker = ".mySlider{\r\n    width: 10px;\r\n    height: 3px;\r\n    appearance: none;\r\n    outline: none;\r\n    padding: 0;\r\n    margin-right: 10px;\r\n    opacity: 0.5;\r\n    border-radius: 1em;\r\n    transition: width, opacity, 0.3s ease-in-out;\r\n}\r\n\r\n.mySlider:hover{\r\n    opacity: 1;\r\n}\r\n\r\n.mySlider.unfolded{\r\n    width: 10em;\r\n    opacity: 1;\r\n}\r\n\r\n.mySlider::-webkit-slider-runnable-track {\r\n    cursor: pointer;\r\n    transform: scale(1.05);\r\n    border-radius: 0;\r\n}\r\n\r\n.mySlider::-webkit-slider-thumb {\r\n    -webkit-appearance: none;\r\n    appearance: none;\r\n    width: 10px;\r\n    aspect-ratio: 1;\r\n    border-radius: 50%;\r\n    /* box-shadow: 0px 0px 0px 0px var(--cubiq-accent-dark); */\r\n    background: var(--cubiq-accent-light);\r\n    cursor: pointer;\r\n    box-sizing: border-box;\r\n    transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;\r\n}\r\n\r\n.mySlider::-webkit-slider-thumb:hover {\r\n    box-shadow: 0px 0px 0px 6px rgba(255, 255, 255, 0.16);\r\n}\r\n\r\n.myGradient{\r\n    /* padding: 0;\r\n    margin: 0; */\r\n    align-items: center;\r\n    justify-content: center;\r\n    display:flex;\r\n    border-radius: 1em;\r\n    border: 1px solid #000;\r\n}";
  const vizzyThemer = `/* \r
    ----- Cubiq's Vizzy Themer v1.0 -----\r
\r
    Thank you so much for using my Vizzy Themer\r
    February 2022\r
    Love, \r
    Cubiq\r
*/\r
\r
:root {\r
    /* ACCENT */\r
    --cubiq-accent-color-raw: 315, 50%;\r
/* \r
       - if no color is selected,\r
         there will be no accent and\r
         so it will become white\r
                 \r
       - to select the color, just uncomment it lol\r
  \r
       select your color here:\r
*/\r
/*\r
    grey   \r
    0,   0%;\r
    \r
    red     \r
    0, 100%; \r
    \r
    orange  \r
    20, 100%; \r
    \r
    gold    \r
    45, 100%; \r
    \r
    lime    \r
    100, 100%; \r
    \r
    green   \r
    120, 100%; \r
    \r
    cyan    \r
    165, 100%; \r
    \r
    lightblue  \r
    200, 100%; \r
    \r
    darkblue \r
    220, 100%;\r
    \r
    purple  \r
    270, 100%;\r
    \r
    pink   \r
    315, 50%; \r
    \r
    magenta \r
    330, 100%;\r
\r
/*\r
       base accent colors are in hs(l) format\r
*/\r
\r
    --cubiq-accent: hsl(var(--cubiq-accent-color-raw), 50%);\r
    --cubiq-accent-light: hsl(var(--cubiq-accent-color-raw), 65%);\r
    --cubiq-accent-dark: hsl(var(--cubiq-accent-color-raw), 20%);\r
    --cubiq-accent-light-transparent: hsla(var(--cubiq-accent-color-raw), 50%, .2);\r
    --cubiq-accent-dark-transparent: hsla(var(--cubiq-accent-color-raw), 20%, .2);\r
\r
    --cubiq-primary-bgcolor: #000;\r
    --cubiq-secondary-bgcolor: hsla(var(--cubiq-accent-color-raw), 30%, .2);\r
    --cubiq-bordercolor: #333;\r
\r
    --cubiq-primary-text1color: #fff;\r
    --cubiq-darker-color: #aaa;\r
}\r
\r
\r
/* \r
    cool little trick to move the\r
    top actions panel to the bottom\r
    just uncomment and see :)\r
*/\r
/*\r
#editor-base\r
{\r
    flex-direction: column-reverse;\r
}\r
*/\r
\r
\r
/* closed arrow */\r
path[d="M10 17l5-5-5-5v10z"] {\r
    color: var(--cubiq-primary-text1color) !important;\r
}\r
\r
\r
/* little icons color */\r
/*\r
    since there's no way to edit the second color,\r
    its up to you if you want this on or off\r
    just uncomment and see :)\r
*/\r
/*\r
.MuiIconButton-root\r
{\r
    color: var(--cubiq-primary-text1color) !important; \r
}\r
*/\r
\r
\r
\r
/* sidemenu button color */\r
.MuiSvgIcon-fontSizeLarge {\r
    color: var(--cubiq-primary-text1color) !important;\r
}\r
\r
\r
/* sliders */\r
input[type="number"] {\r
    background: var(--cubiq-accent-light-transparent) !important;\r
}\r
\r
\r
/* selectors */\r
.MuiSelect-select.MuiSelect-select {\r
    background: var(--cubiq-accent-light-transparent) !important;\r
}\r
\r
\r
/* sidemenu text color */\r
.mosaic-window-body>div>nav>span>span {\r
    color: var(--cubiq-primary-text1color) !important;\r
}\r
\r
/* properties window opened element name */\r
.MuiTypography-colorTextPrimary {\r
    color: var(--cubiq-primary-text1color) !important;\r
}\r
\r
\r
/* selected resolution text color */\r
.MuiToggleButton-root.Mui-selected {\r
    color: var(--cubiq-primary-text1color) !important;\r
}\r
\r
\r
/* unselected resolution text color */\r
.MuiToggleButton-root {\r
    color: var(--cubiq-darker-color) !important;\r
}\r
\r
\r
/* clip name color, xyz and more */\r
.MuiTypography-colorTextSecondary {\r
    color: var(--cubiq-primary-text1color) !important;\r
}\r
\r
\r
/* a lot of the texts color */\r
.MuiTypography-root {\r
    /* \r
    if !important, even the 3D/2D icons \r
    that are blue and green will be overridden \r
*/\r
    color: var(--cubiq-primary-text1color);\r
\r
    /* color: var(--cubiq-primary-text1color) !important; */\r
}\r
\r
\r
/* 3D / 2D icons color */\r
/*\r
    since there's no way to edit the second color,\r
    its up to you if you want this on or off\r
    just uncomment and see :)\r
*/\r
/*\r
.MuiTypography-colorSecondary\r
{\r
    color: var(--cubiq-accent-light) !important; \r
}\r
*/\r
\r
\r
/* border color */\r
/* literally 1 pixel border at the bottom of the screen fix */\r
.mosaic.mosaic-blueprint-theme {\r
    background: black !important;\r
}\r
\r
\r
/* main bgcolor */\r
.mosaic.mosaic-blueprint-theme .mosaic-preview .mosaic-window-body,\r
.mosaic.mosaic-blueprint-theme .mosaic-window .mosaic-window-body {\r
    background: var(--cubiq-primary-bgcolor) ;\r
    /* border: 5px solid var(--cubiq-secondary-bgcolor) !important; */\r
}\r
\r
/* left navbar selected item stripe primary color */\r
.mosaic-window-body > div > nav > span > div[class*=" "]\r
{\r
  background-color: var(--cubiq-accent-light) !important;\r
}\r
\r
/* project window three dots \u22EE icon color */\r
.MuiListItem-gutters button.MuiIconButton-root {\r
    color: var(--cubiq-darker-color);\r
}\r
\r
/* always show splitters */\r
.mosaic.mosaic-blueprint-theme .mosaic-split .mosaic-split-line {\r
    box-shadow: 0 0 0 1px var(--cubiq-bordercolor);\r
}\r
\r
/* kind of buggy thing that shouldn't be there lol */\r
.mosaic-preview {\r
    opacity: 0%;\r
}\r
\r
/* properties window background */\r
.scrollbar-container>ul>div>div {\r
    background: var(--cubiq-secondary-bgcolor) !important;\r
}\r
\r
/* text underline */\r
.MuiInput-underline:before {\r
    border-bottom: 2px solid var(--cubiq-primary-text1color) !important;\r
}\r
\r
/* font color for selectors and text fields */\r
.MuiInputBase-input {\r
    color: var(--cubiq-primary-text1color) !important;\r
}\r
\r
\r
\r
/* ------- accent color -------- */\r
\r
/* titles font color */\r
.MuiTypography-colorPrimary {\r
    color: var(--cubiq-accent-light) !important;\r
}\r
\r
/* text primary.. */\r
.MuiButton-textPrimary {\r
    color: var(--cubiq-accent-light) !important;\r
}\r
\r
/* little selected icon buttons */\r
.MuiIconButton-colorPrimary {\r
    color: var(--cubiq-accent-light) !important;\r
}\r
\r
/* little accent icon button in notifications */\r
.MuiSvgIcon-colorPrimary {\r
    color: var(--cubiq-accent-light) !important;\r
}\r
\r
\r
/* checked checkbox */\r
.MuiCheckbox-colorPrimary.Mui-checked {\r
    color: var(--cubiq-accent-light) !important;\r
}\r
\r
/* choose audio */\r
.MuiButton-outlinedPrimary {\r
    border: 1px solid var(--cubiq-accent-light) !important;\r
    color: var(--cubiq-accent-light) !important;\r
}\r
\r
/* volume slider color */\r
.MuiSlider-root {\r
    color: var(--cubiq-accent-light) !important;\r
}\r
\r
/* text underline on edit */\r
.MuiInput-underline:after {\r
    border-bottom: 2px solid var(--cubiq-accent-light) !important;\r
}\r
\r
/* selected item bgcolor */\r
\r
.MuiTreeItem-root[tabindex="0"]>.MuiTreeItem-content {\r
    background-color: var(--cubiq-accent-light-transparent) !important;\r
}\r
\r
\r
/* song bar pointer thing.. lol */\r
.mosaic-window-body>div:nth-child(1)>div:nth-child(1)>div:nth-child(2)>div:nth-child(1)>div:nth-child(1)>div:nth-child(2) {\r
    background-color: var(--cubiq-accent) !important;\r
}\r
\r
/* song already played bg thing */\r
.mosaic-window-body>div:nth-child(1)>div:nth-child(1)>div:nth-child(2)>div:nth-child(1)>div:nth-child(1)>div:nth-child(1)>div:nth-child(2) {\r
    background-color: var(--cubiq-accent-light-transparent) !important;\r
}\r
\r
\r
/* explore creations in top bar */\r
.MuiChip-clickable {\r
    background: var(--cubiq-primary-bgcolor) !important;\r
    border: 1px solid var(--cubiq-accent-light) !important;\r
    color: var(--cubiq-accent-light) !important;\r
}\r
\r
/* explore creations in projects in sidemenu */\r
.MuiButton-containedPrimary {\r
    background: var(--cubiq-primary-bgcolor) !important;\r
    border: 1px solid var(--cubiq-accent-light) !important;\r
    color: var(--cubiq-accent-light) !important;\r
}\r
\r
/* feedback guy background */\r
/* \r
   i "removed" it as imo it looks better without it\r
   and since it had !important on its color,\r
   i couldn't change it's accent and it would remain\r
   purple which doensn't fit with some colors..\r
*/\r
._hj-3obO5__EmotionIconDefault__commentIcon:before {\r
    opacity: 0%;\r
}\r
\r
/* feedback guy */\r
._hj_feedback_container ._hj-qoDG___EmotionIconDefault__iconEmotionDefault._hj-1BEBR__EmotionIconDefault__like ._hj-2RA7u__EmotionIconDefault__expressionIcon:before {\r
    content: '\\e909' !important;\r
}\r
\r
/* little credit :) */\r
header>div:nth-child(3)>p:after {\r
    padding-left: 5px;\r
    content: '+ \u{1F90D} by Cubiq uwu';\r
    color: var(--cubiq-accent-light) !important;\r
    opacity: 50%;\r
}\r
\r
\r
/* add effect page buttons on hover */\r
div[role="presentation"]>div:nth-child(3)>div:nth-child(1)>div:nth-child(3)>div:nth-child(1)>div:nth-child(1)>button:hover,\r
div[role="presentation"]>div:nth-child(3)>div:nth-child(1)>div:nth-child(3)>button:hover {\r
    background: var(--cubiq-accent-light) !important;\r
}\r
\r
\r
/* add effect button */\r
div[role="presentation"]>div:nth-child(3)>div:nth-child(1)>div:nth-child(3)>button {\r
    transition: all 0.2s ease-out !important;\r
    background: var(--cubiq-accent) !important;\r
}\r
\r
\r
/* notification bell menu bottom stripe accent */\r
div[role="tooltip"]:not(.MuiTooltip-popper) {\r
    border-bottom: 4px solid var(--cubiq-accent-light) !important;\r
}\r
\r
/* open arrow */\r
path[d="M7 10l5 5 5-5z"] {\r
    color: var(--cubiq-accent-light) !important;\r
}\r
\r
/* custom color when you select text */\r
::selection {\r
    background: var(--cubiq-accent);\r
}\r
\r
.react-contextmenu-wrapper canvas:nth-child(1) {\r
   border-radius: 1em;\r
}\r
\r
\r
\r
/* border of the selected clip */\r
.react-contextmenu-wrapper>#clip[style*="z-index: 2"] {\r
    border: 1px solid var(--cubiq-accent) !important;\r
}`;
  const others = "#vizzard-update-btn {\r\n    color: var(--cubiq-accent-light);\r\n    position:absolute;\r\n    right:0;\r\n    top:2.15em;\r\n    /* background-color: aqua; */\r\n    border-top-left-radius: 0;\r\n    border-top-right-radius: 0;\r\n}";
  function Selectors() {
    var _a;
    return {
      editor: document.querySelector("#editor-base"),
      header: document.querySelector("header"),
      headerButtons: document.querySelector("#editor-base > header > div:nth-child(2)"),
      popupDialog: document.querySelector("body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div"),
      playPanel: (_a = document.getElementsByClassName("MuiDivider-flexItem")[1]) == null ? void 0 : _a.parentElement,
      rootStyle: document.documentElement.style,
      clipPanel: document.getElementsByClassName("ps")[3],
      fullBottomPanel: document.querySelector("#editor-base > div > div > div.mosaic-root > div:nth-child(7)"),
      vizzyLogo: document.querySelector("#root > div > header > div.MuiToolbar-root.MuiToolbar-regular.MuiToolbar-gutters > div > div:nth-child(1) > div"),
      vizzyLogoEditor: document.querySelector("#editor-base > header > .MuiBox-root")
    };
  }
  const generateHueGradient = (colorCount) => {
    let gradient = [];
    for (let i = 0; i < colorCount; i++) {
      gradient.push(
        `hsl(${i * (360 / colorCount)}, ${getCurrentColor()[1]}%, 50%)`
      );
    }
    return gradient;
  };
  const storedColor = GM_getValue("VizzardTheme", "315, 50%");
  const saveTheme = () => {
    GM_setValue(
      "VizzardTheme",
      Selectors().rootStyle.getPropertyValue("--cubiq-accent-color-raw")
    );
  };
  const loadTheme = (slider) => {
    const newTheme = formatColor(updateTheme(slider));
    Selectors().rootStyle.setProperty("--cubiq-accent-color-raw", newTheme);
  };
  const getCurrentColor = () => {
    const rawColor = Selectors().rootStyle.getPropertyValue("--cubiq-accent-color-raw") || storedColor;
    const color = rawColor.replace("%", "").split(", ");
    return color;
  };
  const formatColor = (clr) => {
    return `${clr[0]}, ${clr[1]}%`;
  };
  const setMode = (slider) => {
    slider.customMode = slider.customMode % 3 + 1 || 1;
    if (slider.customMode === 1) {
      slider.classList.remove("unfolded");
    } else {
      slider.classList.add("unfolded");
      slider.max = slider.customMode === 2 ? 360 : 100;
      slider.value = getCurrentColor()[slider.customMode - 2];
      const gradient = "linear-gradient(to right," + (slider.customMode == 2 ? `${generateHueGradient(20).join(", ")})` : `hsl(0,0%,50%), hsl(${getCurrentColor()[0]}, 100%, 50%) )`);
      slider.style.background = gradient;
    }
  };
  const updateTheme = (slider) => {
    const { customMode, value } = slider;
    let newTheme = getCurrentColor();
    if (customMode && customMode != 1) {
      newTheme[customMode - 2] = value;
    }
    return newTheme;
  };
  function ColorPicker() {
    const colorPicker2 = document.createElement("input");
    colorPicker2.className = "mySlider";
    colorPicker2.type = "range";
    colorPicker2.value = 0;
    setMode(colorPicker2);
    loadTheme(colorPicker2);
    colorPicker2.oninput = function() {
      loadTheme(this);
    };
    colorPicker2.onchange = function() {
      saveTheme(formatColor(getCurrentColor()));
    };
    colorPicker2.ondblclick = function() {
      setMode(this);
    };
    return colorPicker2;
  }
  const floatingPanelButton = (text) => {
    const pin = document.createElement("span");
    const { classList } = Selectors().editor;
    const clipPanel = Selectors().clipPanel;
    const fullBottomPanel = Selectors().fullBottomPanel;
    classList.add("floatingPanelOpaque");
    pin.className = "vizzard-pin";
    pin.innerHTML = text;
    pin.onclick = ({ ctrlKey }) => toggleClipPanel(ctrlKey);
    clipPanel.addEventListener("mouseenter", () => {
      classList.add("clipHover");
    });
    fullBottomPanel.addEventListener("mouseleave", () => {
      classList.remove("clipHover");
    });
    const toggleClipPanel = (ctrlKey) => {
      if (!classList.contains("panelFloat")) {
        classList.add("panelFloat");
        classList.add("clipHover");
        return;
      }
      if (!ctrlKey) {
        return classList.remove("panelFloat");
      }
      if (!classList.contains("floatingPanelOpaque")) {
        return classList.add("floatingPanelOpaque");
      }
      classList.remove("floatingPanelOpaque");
    };
    return pin;
  };
  const isUpdateAvailable = () => {
    const ver = GM_info.script.version;
    const lt_ver = unsafeWindow.VIZZARD_LATEST_VERSION;
    const checkVer = lt_ver !== ver;
    console.log(
      checkVer ? `%cNew Vizzard Update Available!: v${lt_ver}` : "%cRunning the latest version of Vizzard",
      "color: " + (checkVer ? "#bada55" : "#55bada")
    );
    return checkVer;
  };
  const checkForUpdates = () => {
    if (isUpdateAvailable()) {
      Selectors().header.appendChild(VizzardUpdateBTN());
    }
  };
  const openReloadDialog = () => {
    const vizzyLogo = Selectors().vizzyLogoEditor;
    vizzyLogo.click();
    const leavingDialog = Selectors().popupDialog;
    const dialogActions = leavingDialog.querySelector(
      "div.MuiDialogActions-root.MuiDialogActions-spacing"
    );
    const okButton = dialogActions.getElementsByTagName("button")[1];
    let reloadButton = okButton.cloneNode(true);
    const dialogMessage = leavingDialog.querySelector("p");
    reloadButton.querySelector(".MuiButton-label").innerHTML = "Reload";
    leavingDialog.querySelector("h2").innerHTML = "Vizzard Update";
    dialogMessage.innerHTML = "Make sure you have saved your progress before reloading <br>A new version of Vizzard is available. Reload now?";
    reloadButton.onclick = () => {
      window.location.reload();
    };
    dialogActions.appendChild(reloadButton);
    dialogActions.removeChild(okButton);
  };
  const VizzardUpdateBTN = () => {
    let btn = document.querySelector("#file-menu-button").cloneNode(true);
    btn.id = "vizzard-update-btn";
    btn.innerHTML = "Vizzard Update Available!";
    btn.CustomMode = "update";
    btn.onclick = null;
    btn.addEventListener("click", () => {
      if (btn.CustomMode === "update") {
        btn.CustomMode = "update-clicked";
        window.open(
          "https://greasyfork.org/scripts/449844-vizzard/code/Vizzard.user.js",
          "_self"
        );
        btn.innerHTML = "Reload now!";
        return;
      }
      openReloadDialog();
    });
    return btn;
  };
  const injectVizzard = () => {
    checkForUpdates();
    Selectors().playPanel.appendChild(ColorPicker());
    Selectors().playPanel.appendChild(floatingPanelButton("\u{1F4CC}"));
    console.log("Vizzard Successfully Injected!");
  };
  const makeLogoClickable = () => {
    const logo = Selectors().vizzyLogoEditor || Selectors().vizzyLogo;
    logo.onmousedown = (ev) => {
      ev.preventDefault();
    };
    logo.onmouseup = (e) => {
      if (e.button === 1) {
        e.preventDefault();
        window.open("https://vizzy.io", "_blank");
      }
    };
  };
  window.addEventListener("load", function() {
    GM_addStyle(vizzyThemer);
    GM_addStyle(colorPicker);
    GM_addStyle(floatingPanel);
    GM_addStyle(others);
    vizzardReload();
  });
  new MutationObserver(function() {
    vizzardReload();
  }).observe(document.querySelector("title"), {
    subtree: true,
    characterData: true,
    childList: true
  });
  const vizzardReload = () => {
    makeLogoClickable();
    const editorBase = Selectors().editor;
    if (!editorBase || (editorBase == null ? void 0 : editorBase.classList.contains("vizzard-injected")))
      return;
    injectVizzard();
    editorBase.classList.add("vizzard-injected");
  };
})();
