import Selectors from "../utils/selectors";

const canExpand = (view_idx) => {
  // returns array of sides that can be expanded
  // 0 = left, 1 = right
  // todo: better way to do this
  const sides = [];
  switch (view_idx) {
    case 0:
      sides.push(1);
      break;
    case 1:
      sides.push(0);
      sides.push(1);
      break;
    case 2:
      sides.push(0);
      break;
  }
  return sides;
}

const ExpanderBTN = (panel, side) => {
  let button = document.createElement("span");
  const sideName = side === 0 ? "left" : "right";´

  // create a nice button
  panel.addEventListener('transitionend', (event) => {
    if (event.propertyName === (sideName)) {
    // console.log('Animation ended: ', sideName);
    panel.classList.remove("vz-animation");
    }
  });

  button.addEventListener("click", () => {
    panel.classList.add("vz-animation");
    panel.classList.toggle(`vz-expanded-${sideName}`);
    // remove animation class after animation is complete
    // setTimeout(() => {
    //   panel.classList.remove("vz-animation");
    // }, 2000);
  });
  button.classList.add(`vz-xpand-${sideName}`);
  return button;
}

const ExpanderHeader = (panel, idx) => {
  let header = document.createElement("div");
  header.classList.add("vz-expander-header");

  let wrapper = document.createElement("div");
  wrapper.classList.add("MuiButtonBase-root", "MuiIconButton-root");

  const expandedViews = canExpand(idx);
  expandedViews.forEach((view) => {
    let button = ExpanderBTN(panel, view);
    wrapper.appendChild(button);
  });

  
  header.appendChild(wrapper);

  return header;
}

const addExpanders = () => {
  const panels = Selectors().panels;
  console.log(panels);
  panels.forEach((panel, i) => {
    // we want to expand only top views (3)
    if (i > 2) return;
    panel.appendChild(ExpanderHeader(panel, i));
  });
};

export default addExpanders;
