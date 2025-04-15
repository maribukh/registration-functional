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
