import Selectors from "../utils/selectors";

const addExpanders = () => {
  const comp_header_btn = Selectors().panels[1];

  let comp_expander = document.createElement("div");
  comp_expander.classList.add("vz-expander-comp");

  let comp_expander_div = document.createElement("div");
  comp_expander_div.classList.add("MuiButtonBase-root", "MuiIconButton-root");
  comp_expander.appendChild(comp_expander_div);

  let comp_expander_icon = document.createElement("span");
  comp_expander_icon.addEventListener("click", () => {
    comp_header_btn.classList.toggle("vz-expanded");
  });

  let icon_right = comp_expander_icon.cloneNode(true);
  icon_right.classList.add("vz-xpand-right");
  comp_expander_div.appendChild(icon_right);
  comp_expander_div.appendChild(comp_expander_icon);
  comp_header_btn.appendChild(comp_expander);
};

export default addExpanders;
