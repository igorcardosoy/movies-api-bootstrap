const buttonSwitch = document.querySelector(".switchButton");
const html = document.querySelector("html");
let darkMode = true;

buttonSwitch.addEventListener("click", () => {

    if (darkMode) {
        html.removeAttribute("data-bs-theme")
        html.setAttribute("data-bs-theme", "light")
        buttonSwitch.setAttribute('src', 'images/lightMode.png')
        darkMode = false;
    } else {
        html.removeAttribute("data-bs-theme")
        html.setAttribute("data-bs-theme", "dark")
        buttonSwitch.setAttribute('src', 'images/darkMode.png')
        darkMode = true;
    }  
})
