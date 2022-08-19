import Selectors from "../utils/selectors";

// floating playPanel button
const floatingPanelButton = (text) => {
  const pin = document.createElement("span");
  const {classList} = Selectors().editor;
  // const  = editor;
  const clipPanel = Selectors().clipPanel;
  const fullBottomPanel = Selectors().fullBottomPanel;

  // floatingPanelOpaque
  // by default the floating panel is opaque
  // if you uncomment this, the panel will be black
  classList.add("floatingPanelOpaque");

  pin.className = "vizzard-pin";
  pin.innerHTML = text;

  pin.onclick = ({ctrlKey}) => toggleClipPanel(ctrlKey);

  clipPanel.addEventListener("mouseenter", () => {
    classList.add("clipHover");
  });

  fullBottomPanel.addEventListener("mouseleave", () => {
    classList.remove("clipHover");
  });

  // used guard clauses. 
  // imo looks and reads better than "else" statements 
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
  }


  return pin;
};

export default floatingPanelButton;
