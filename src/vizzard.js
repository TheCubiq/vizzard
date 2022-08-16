import myButton from "./components/customButton";
import Selectors from "./utils/selectors";

const injectVizzard = () => {
    console.log("injecting vizzard");
    // append custom elements
    // console.log(selectors().playPanel);
    // selectors().header.appendChild(myButton());
    Selectors().playPanel.appendChild(myButton());
}

export default injectVizzard;