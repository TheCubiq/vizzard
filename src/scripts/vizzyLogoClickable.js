import Selectors from "../utils/selectors";

const makeLogoClickable = () => {
  const logo = Selectors().vizzyLogoEditor || Selectors().vizzyLogo;
  //   console.log("vizzy logo at: ",logo);
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

export default makeLogoClickable;
