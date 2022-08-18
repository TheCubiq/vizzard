import Selectors from "../utils/selectors";

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
  //   console.log("theme saved");
};

const loadTheme = (slider) => {
    const newTheme = formatColor(updateTheme(slider));
    Selectors().rootStyle.setProperty("--cubiq-accent-color-raw", newTheme);
  };

const getCurrentColor = () => {
  const rawColor =
    Selectors().rootStyle.getPropertyValue("--cubiq-accent-color-raw") ||
    storedColor;
  const color = rawColor.replace("%", "").split(", ");
  return color;
  // ex. returns: [315, 50]
};

const formatColor = (clr) => {
  return `${clr[0]}, ${clr[1]}%`;
};

const setMode = (slider) => {
  slider.customMode = (slider.customMode % 3) + 1 || 1;
  if (slider.customMode === 1) {
    slider.classList.remove("unfolded");
  } else {
    slider.classList.add("unfolded");
    slider.max = slider.customMode === 2 ? 360 : 100;
    slider.value = getCurrentColor()[slider.customMode - 2];
    // display either hue or saturation gradients
    const gradient =
      "linear-gradient(to right," +
      (slider.customMode == 2
        ? `${generateHueGradient(20).join(", ")})`
        : `hsl(0,0%,50%), hsl(${getCurrentColor()[0]}, 100%, 50%) )`);
    slider.style.background = gradient;
  }
};

const updateTheme = (slider) => {
  const { customMode, value } = slider;
  let newTheme = getCurrentColor();
  // test if custom mode property exists and is not in folded state
  if (customMode && customMode != 1) {
    newTheme[customMode - 2] = value;
  }
  return newTheme;
};

export default function ColorPicker() {
  const colorPicker = document.createElement("input");
  colorPicker.className = "mySlider";
  colorPicker.type = "range";
  colorPicker.value = 0;
  setMode(colorPicker);
  loadTheme(colorPicker);

  colorPicker.oninput = function () {
    loadTheme(this);
  };

  colorPicker.onchange = function () {
    saveTheme(formatColor(getCurrentColor()));
  };

  //   switch the slider modes on double-click
  colorPicker.ondblclick = function () {
    setMode(this);
  };

  return colorPicker;
}
