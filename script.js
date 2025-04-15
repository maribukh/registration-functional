function logIn() {
  let logInContainer = document.querySelector(".logIn-container");

  let isHidden =
    logInContainer.style.display === "none" ||
    logInContainer.style.display === "";

  if (isHidden) {
    logInContainer.style.display = "block";
  } else {
    logInContainer.style.display = "none";
  }
}

function registrationForm() {
  let registrationContainer = document.querySelector(".registration-container");

  let isHidden =
    registrationContainer.style.display === "none" ||
    registrationContainer.style.display === "";

  if (isHidden) {
    registrationContainer.style.display = "block";
  } else {
    registrationContainer.style.display = "none";
  }
}
