import Selectors from "../utils/selectors";

// todo: get rid of all setTimeout()'s

const addViewSwitchCheck = () => {
  // Select the "view" header button
  const btn_view = Selectors().headerNavButtons[3];
  btn_view.addEventListener("click", () => {
    // when the little popup menu opens, add event listener to
    // the "change editor layout" button	
    setTimeout(() => {
      const view_switch = document.querySelector("#layout_view");
      view_switch.addEventListener("click", () => {
        // alert("view switch");
        removeOldExpanders();       
        addExpanders(true);
      });
    }, 10);
  });
  
  const BtnClickListener = btn_view.onclick;
  console.log({BtnClickListener}); 
};

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
};

const ExpanderBTN = (panel, side) => {
  let button = document.createElement("span");
  const sideName = side === 0 ? "left" : "right";

  // remove the transition after it's done
  panel.addEventListener("transitionend", (event) => {
    if (event.propertyName === sideName) {
      panel.classList.remove("vz-animation");
    }
  });

  button.addEventListener("click", () => {
    panel.classList.add("vz-animation");
    panel.classList.toggle(`vz-expanded-${sideName}`);
  });
  button.classList.add(`vz-xpand-${sideName}`);
  return button;
};

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
};

const removeOldExpanders = () => {
  const oldExpanders = document.querySelectorAll(".vz-expander-header");
  if (oldExpanders.length > 0) {
    console.log("removing old expanders: ", oldExpanders.length);
    oldExpanders.forEach((expander) => {
      // console.log(expander);
      expander.remove();
    });
  }
};

const addExpanders = (refresh = false) => {
  if (!refresh) {
    addViewSwitchCheck();
  }

  setTimeout(() => {
  const panels = Selectors().panels;
  panels.forEach((panel, i) => {
    // we want to expand only top views (3)
    if (i > 2) return;
    panel.appendChild(ExpanderHeader(panel, i));
  });
  // console.log("added expanders");
  }, 10);
};

export default addExpanders;
