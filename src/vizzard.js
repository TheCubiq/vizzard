import ColorPicker from "./components/colorPicker";
import floatingPanelButton from "./components/floatingPanelButton";
import Selectors from "./utils/selectors";

const injectVizzard = () => {
  // append custom elements
  Selectors().playPanel.appendChild(ColorPicker());
  Selectors().playPanel.appendChild(floatingPanelButton("📌"));
  console.log("Vizzard Successfully Injected!");
};

export default injectVizzard;
