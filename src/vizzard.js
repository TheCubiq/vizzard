import ColorPicker from "./components/colorPicker";
import myButton from "./components/customButton";
import Selectors from "./utils/selectors";

const injectVizzard = () => {
  // append custom elements
  Selectors().playPanel.appendChild(ColorPicker());
  console.log("Vizzard Successfully Injected!");
};

export default injectVizzard;
