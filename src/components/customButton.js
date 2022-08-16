export default function myButton() {
  let button = document.createElement("button");
  button.innerHTML = "Vizzard";
  // button.style.position = "absolute";
  button.onclick = function () {
    alert("You clicked me!");
    console.log("You clicked me!");
  };

  // learning simple event listeners
  button.addEventListener(
    "mouseover",
    function () {
      button.style.backgroundColor = "red";
    },
    false
  );
  button.addEventListener(
    "mouseout",
    function () {
      button.style.backgroundColor = "";
    },
    false
  );

  return button;
};
