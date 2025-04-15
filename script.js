
let elements = {
  loginContainer: document.querySelector(".logIn-container"),
  registrationContainer: document.querySelector(".registration-container"),
  welcomeBlock: document.getElementById("user-welcome"),
  loginButton: document.querySelector("button#logIn"),
  regButton: document.querySelector("button.brn.brn-second--default"),
};


function logIn() {
  let loginContainer = document.querySelector(".logIn-container");
  let registrationContainer = document.querySelector(
    ".registration-container"
  );

  if (isUserLoggedIn()) {
    return;
  }

  if (loginContainer.classList.contains("d-none")) {
    loginContainer.classList.remove("d-none");
    registrationContainer.classList.add("d-none");
  } else {
    loginContainer.classList.add("d-none");
  }
}

function registrationForm() {
  let registrationContainer = document.querySelector(
    ".registration-container"
  );
  let loginContainer = document.querySelector(".logIn-container");

  if (isUserLoggedIn()) {
    return; 
  }

  if (registrationContainer.classList.contains("d-none")) {
    registrationContainer.classList.remove("d-none");
    loginContainer.classList.add("d-none");
  } else {
    registrationContainer.classList.add("d-none");
  }
}

function hideForms(e) {
  let loginContainer = document.querySelector(".logIn-container");
  let registrationContainer = document.querySelector(
    ".registration-container"
  );

  let isInsideLogIn = loginContainer.contains(e.target);
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
    loginContainer.classList.add("d-none");
    registrationContainer.classList.add("d-none");
  }
}

function togglePasswordVisibility(event) {
  let container = event
    ? event.target.closest(".password-container")
    : document.querySelector(".eyebox").closest(".password-container");

  if (container) {
    let passwordInput =
      container.querySelector('input[type="password"]') ||
      container.querySelector('input[type="text"]');

    if (passwordInput) {
      passwordInput.type =
        passwordInput.type === "password" ? "text" : "password";
    }
  }
}

function isUserLoggedIn() {
  return localStorage.getItem("isLoggedIn") === "true";
}

function getUserInfo() {
  return {
    name: localStorage.getItem("name") || "",
    lname: localStorage.getItem("lName") || "",
    username: localStorage.getItem("username") || "",
    password: localStorage.getItem("password") || "",
  };
}

function isUserRegistered() {
  let user = getUserInfo();
  return user.name && user.lname && user.username && user.password;
}

function showWelcome(name) {
  let welcomeBlock = document.getElementById("user-welcome");
  if (welcomeBlock) {
    welcomeBlock.innerHTML = `
      <div style="padding: 20px; display: flex; align-items: center; justify-content: space-between;">
        <h2>გამარჯობა, ${name}!</h2>
        <button onclick="logOut()" class="btn btn-primary--green">გასვლა</button>
      </div>
    `;
  }

  updateHeaderButtons(true);
}

function updateHeaderButtons(isLoggedIn) {
  let loginBtn = document.querySelector("button#logIn");
  let regBtn = document.querySelector("button.brn.brn-second--default");

  if (isLoggedIn) {
    if (loginBtn) loginBtn.style.display = "none";
    if (regBtn) regBtn.style.display = "none";
  } else {
    if (loginBtn) loginBtn.style.display = "block";
    if (regBtn) regBtn.style.display = "block";
  }
}

function logOut() {
  localStorage.removeItem("isLoggedIn");

  let welcomeBlock = document.getElementById("user-welcome");
  if (welcomeBlock) {
    welcomeBlock.innerHTML = "";
  }

 
  updateHeaderButtons(false);
}

window.addEventListener("DOMContentLoaded", () => {

  if (isUserRegistered() && isUserLoggedIn()) {
    showWelcome(getUserInfo().name);
  } else {
    
    updateHeaderButtons(false);
  }

  document.querySelectorAll(".eye, .eyebox").forEach((eyeElement) => {
    eyeElement.addEventListener("click", togglePasswordVisibility);
  });

  let loginForm = document.querySelector(".logIn-container form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      let usernameInput = loginForm.querySelector("input[name='user']");
      let passwordInput = loginForm.querySelector("input[name='password']");
      let savedUser = getUserInfo();

      if (
        usernameInput.value === savedUser.username &&
        passwordInput.value === savedUser.password
      ) {
        localStorage.setItem("isLoggedIn", "true");

        showWelcome(savedUser.name);

        loginForm.reset();
        document.querySelector(".logIn-container").classList.add("d-none");
      } else {
        alert("არასწორი მომხმარებლის სახელი ან პაროლი!");
      }
    });
  }

  let regForm = document.querySelector(".registration-container form");
  if (regForm) {
    regForm.addEventListener("submit", function (e) {
      e.preventDefault();

      let nameInput = regForm.querySelector("input[name='user']");
      let surnameInput = regForm.querySelector("input[name='surname']");
      let emailInput = regForm.querySelector("input[name='email']");
      let passwordInput = regForm.querySelector("input[name='password']");

      if (
        nameInput.value &&
        surnameInput.value &&
        emailInput.value &&
        passwordInput.value
      ) {

        localStorage.setItem("name", nameInput.value);
        localStorage.setItem("lName", surnameInput.value);
        localStorage.setItem("username", emailInput.value);
        localStorage.setItem("password", passwordInput.value);
        localStorage.setItem("isLoggedIn", "true");

        
        showWelcome(nameInput.value);

        regForm.reset();
        document
          .querySelector(".registration-container")
          .classList.add("d-none");
      } else {
        alert("მონაცემები არ არის სრულყოფილი!");
      }
    });
  }
});
