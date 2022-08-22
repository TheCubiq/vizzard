import Selectors from "../utils/selectors";

const isUpdateAvailable = () => {
    const ver = GM_info.script.version;
    const lt_ver = unsafeWindow.VIZZARD_LATEST_VERSION;
    //   console.log("checking for updates");
    const checkVer = lt_ver !== ver;
    console.log(
        checkVer
            ? `%cNew Vizzard Update Available!: v${lt_ver}`
            : "%cRunning the latest version of Vizzard",
        "color: " + (checkVer ? "#bada55" : "#55bada")
    );
    return checkVer;
};

export const checkForUpdates = () => {
    if (isUpdateAvailable()) {
        Selectors().header.appendChild(VizzardUpdateBTN());
    }
};

const openReloadDialog = () => {
    const vizzyLogo = Selectors().vizzyLogoEditor;
    vizzyLogo.click();
    const leavingDialog = Selectors().popupDialog;
    const dialogActions = leavingDialog.querySelector(
        "div.MuiDialogActions-root.MuiDialogActions-spacing"
    );
    // const [cancelButton, okButton] = dialogActions.getElementsByTagName("button");
    const okButton = dialogActions.getElementsByTagName("button")[1];
    // without cloning the button, another click event from the body
    // of the document would be triggered that redirects us to the main page
    let reloadButton = okButton.cloneNode(true);
    const dialogMessage = leavingDialog.querySelector("p");

    reloadButton.querySelector(".MuiButton-label").innerHTML = "Reload";
    leavingDialog.querySelector("h2").innerHTML = "Vizzard Update";
    dialogMessage.innerHTML =
        "Make sure you have saved your progress before reloading <br>" +
        "A new version of Vizzard is available. Reload now?";

    reloadButton.onclick = () => {
        window.location.reload();
    };

    dialogActions.appendChild(reloadButton);
    // remove the ok button
    dialogActions.removeChild(okButton);
};

const VizzardUpdateBTN = () => {
    let btn = document.querySelector("#file-menu-button").cloneNode(true);
    btn.id = "vizzard-update-btn";
    btn.innerHTML = "Vizzard Update Available!";
    btn.CustomMode = "update";
    btn.onclick = null;
    btn.addEventListener("click", () => {
        if (btn.CustomMode === "update") {
            btn.CustomMode = "update-clicked";
            window.open(
                // from github repo
                // "https://github.com/TheCubiq/vizzard/raw/master/dist/vizzard.user.js",

                // from greasyfork repo
                "https://greasyfork.org/scripts/449844-vizzard/code/Vizzard.user.js",

                "_self"
            );
            btn.innerHTML = "Reload now!";
            return;
        }
        openReloadDialog();
    });
    return btn;
};

export default VizzardUpdateBTN;
