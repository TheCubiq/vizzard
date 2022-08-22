import ColorPicker from "./components/colorPicker";
import floatingPanelButton from "./components/floatingPanelButton";
import {checkForUpdates} from "./components/VizzardUpdateBTN";
import Selectors from "./utils/selectors";

const injectVizzard = () => {
  // run custom scripts
  checkForUpdates();
  // append custom elements
  Selectors().playPanel.appendChild(ColorPicker());
  Selectors().playPanel.appendChild(floatingPanelButton("📌"));
  console.log("Vizzard Successfully Injected!");
};

export default injectVizzard;
