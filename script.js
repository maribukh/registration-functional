function logIn() {
  let logInContainer = document.querySelector(".logIn-container");
  let registrationContainer = document.querySelector(
    ".registration-container"
  );

  let isHidden =
    logInContainer.style.display === "none" ||
    logInContainer.style.display === "";

  if (isHidden) {
    logInContainer.style.display = "block";
    registrationContainer.style.display = "none";
  } else {
    logInContainer.style.display = "none";
  }
}

function registrationForm() {
  let registrationContainer = document.querySelector(
    ".registration-container"
  );
  let logInContainer = document.querySelector(".logIn-container");

  let isHidden =
    registrationContainer.style.display === "none" ||
    registrationContainer.style.display === "";

  if (isHidden) {
    registrationContainer.style.display = "block";
    logInContainer.style.display = "none";
  } else {
    registrationContainer.style.display = "none";
  }
}

// functional for body 
function hideForms(e) {
  let logInContainer = document.querySelector(".logIn-container");
  let registrationContainer = document.querySelector(
    ".registration-container"
  );

  let isInsideLogIn = logInContainer.contains(e.target);
  let isInsideRegistration = registrationContainer.contains(e.target);
  let isLogInButton = e.target.closest("button[onclick='logIn()']");
  let isRegistrationButton = e.target.closest(
    "button[onclick='registrationForm()']"
  );

  if (
    !isInsideLogIn &&
    !isInsideRegistration &&
    !isLogInButton &&
    !isRegistrationButton
  ) {
    logInContainer.style.display = "none";
    registrationContainer.style.display = "none";
  }
}