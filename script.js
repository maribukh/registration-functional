let elements = {
  loginContainer: document.querySelector('.logIn-container'),
  registrationContainer: document.querySelector('.registration-container'),
  welcomeBlock: document.getElementById('user-welcome'),
  loginButton: document.querySelector('button#logIn'),
  regButton: document.querySelector('button.brn.brn-second--default'),
};

function Home() {
  let loginContainer = document.querySelector('.logIn-container');
  let registrationContainer = document.querySelector('.registration-container');
  let homePageContainer = document.querySelector('.home-page-container');

  loginContainer.classList.add('d-none');
  registrationContainer.classList.add('d-none');
  homePageContainer.classList.remove('d-none');
}

function logIn() {
  console.log('Login button clicked');

  let loginContainer = document.querySelector('.logIn-container');
  let registrationContainer = document.querySelector('.registration-container');
  let homePageContainer = document.querySelector('.home-page-container');

  if (isUserLoggedIn()) return;

  loginContainer.classList.remove('d-none');
  registrationContainer.classList.add('d-none');
  homePageContainer.classList.add('d-none');

  let loginInput = loginContainer.querySelector('input');
  if (loginInput) loginInput.focus();
}

function registrationForm() {
  console.log('Registration button clicked');

  let loginContainer = document.querySelector('.logIn-container');
  let registrationContainer = document.querySelector('.registration-container');
  let homePageContainer = document.querySelector('.home-page-container');

  if (isUserLoggedIn()) return;

  registrationContainer.classList.remove('d-none');
  loginContainer.classList.add('d-none');
  homePageContainer.classList.add('d-none');

  let regInput = registrationContainer.querySelector('input');
  if (regInput) regInput.focus();
}

function hideForms(e) {
  let loginContainer = document.querySelector('.logIn-container');
  let registrationContainer = document.querySelector('.registration-container');

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
    loginContainer.classList.add('d-none');
    registrationContainer.classList.add('d-none');
  }
}

function togglePasswordVisibility(event) {
  let eyebox = event.currentTarget;
  let container = eyebox.closest('.password-container');
  if (!container) return;

  let passwordInput = container.querySelector('input');
  let eyeVisible = container.querySelector('.eyeVisibility');
  let eyeHidden = container.querySelector('.eyeNoneVisibility');

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    eyeVisible.classList.add('d-none');
    eyeHidden.classList.remove('d-none');
  } else {
    passwordInput.type = 'password';
    eyeVisible.classList.remove('d-none');
    eyeHidden.classList.add('d-none');
  }
}

function isUserLoggedIn() {
  return localStorage.getItem('isLoggedIn') === 'true';
}

function getUserInfo() {
  return {
    name: localStorage.getItem('name') || '',
    lname: localStorage.getItem('lName') || '',
    username: localStorage.getItem('username') || '',
    password: localStorage.getItem('password') || '',
  };
}

function isUserRegistered() {
  let user = getUserInfo();
  return user.name && user.lname && user.username && user.password;
}

function showWelcome(name) {
  let welcomeBlock = document.getElementById('user-welcome');
  if (welcomeBlock) {
    welcomeBlock.innerHTML = `
        <h2  class="btn-primary--green">${name}</h2>
        <button onclick="logOut()" class="btn btn-primary--green">გასვლა</button>
    `;
  }

  updateHeaderButtons(true);
}

function updateHeaderButtons(isLoggedIn) {
  let loginBtnLi = document.querySelector('button#logIn')?.closest('li');
  let regBtnLi = document
    .querySelector('button.brn.brn-second--default')
    ?.closest('li');
  let userWelcomeLi = document.querySelector('#user-welcome')?.closest('li');

  if (isLoggedIn) {
    if (loginBtnLi) loginBtnLi.style.display = 'none';
    if (regBtnLi) regBtnLi.style.display = 'none';
    if (userWelcomeLi) userWelcomeLi.style.display = 'block';
  } else {
    if (loginBtnLi) loginBtnLi.style.display = 'block';
    if (regBtnLi) regBtnLi.style.display = 'block';
    if (userWelcomeLi) userWelcomeLi.style.display = 'none';
  }
}

function logOut() {
  localStorage.removeItem('isLoggedIn');

  let welcomeBlock = document.getElementById('user-welcome');

  if (welcomeBlock) {
    welcomeBlock.innerHTML = '';
  }

  updateHeaderButtons(false);
  Home();
}

 window.addEventListener('DOMContentLoaded', () => {
  if (isUserRegistered() && isUserLoggedIn()) {
    showWelcome(getUserInfo().name);
    Home();
  } else {
    updateHeaderButtons(false);
    Home();
  }

  document.querySelectorAll('.eyebox').forEach((eyebox) => {
    eyebox.addEventListener('click', togglePasswordVisibility);
  });

  let loginForm = document.querySelector('.logIn-container form');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();

      let usernameInput = loginForm.querySelector("input[name='user']");
      let passwordInput = loginForm.querySelector("input[name='password']");
      let savedUser = getUserInfo();
      let savedEmail = localStorage.getItem('email');

      if (
        (usernameInput.value === savedUser.username ||
          usernameInput.value === savedEmail) &&
        passwordInput.value === savedUser.password
      ) {
        localStorage.setItem('isLoggedIn', 'true');

        showWelcome(savedUser.name);

        loginForm.reset();
        document.querySelector('.logIn-container').classList.add('d-none');
        Home();
      } else {
        alert('არასწორი მომხმარებლის სახელი ან პაროლი!');
      }
    });
  }

  let regForm = document.querySelector('.registration-container form');
  if (regForm) {
    regForm.addEventListener('submit', function (e) {
      e.preventDefault();

      let nameInput = regForm.querySelector("input[name='user']");
      let surnameInput = regForm.querySelector("input[name='surname']");
      let usernameInput = regForm.querySelector("input[name='username']");
      let emailInput = regForm.querySelector("input[name='email']");
      let passwordInput = regForm.querySelector("input[name='password']");

      if (
        nameInput.value &&
        surnameInput.value &&
        usernameInput.value &&
        emailInput &&
        passwordInput.value
      ) {
        localStorage.setItem('name', nameInput.value);
        localStorage.setItem('lName', surnameInput.value);
        localStorage.setItem('username', usernameInput.value);
        localStorage.setItem('email', emailInput.value);
        localStorage.setItem('password', passwordInput.value);

        localStorage.setItem('isLoggedIn', 'true');

        showWelcome(nameInput.value);

        regForm.reset();
        document
          .querySelector('.registration-container')
          .classList.add('d-none');
        Home(); 
      } else {
        alert('მონაცემები არ არის სრულყოფილი!');
      }
    });
  }
});

// Theme toggle
function toggleTheme() {
  let body = document.body;
  let icon = document.getElementById('theme-icon');

  body.classList.toggle('dark-mode');

  let isDark = body.classList.contains('dark-mode');

  localStorage.setItem('theme', isDark ? 'dark' : 'light');

  icon.innerHTML = isDark
    ? `<path d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z"></path>`
    : `<path d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z"></path>`;
}

window.addEventListener('DOMContentLoaded', () => {
  let savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    document.getElementById('theme-icon').innerHTML =
      `<path d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z"></path>`;
  }
});
