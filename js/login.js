const form = document.querySelector("#form");
const passwordEye = document.querySelector(".passwordEye");

passwordEye.addEventListener("click", (e) => {
  if (e.target.previousElementSibling.type === "password") {
    e.target.previousElementSibling.type = "text";
    passwordEye.textContent = "visibility_off";
  } else {
    e.target.previousElementSibling.type = "password";
    passwordEye.textContent = "visibility";
  }
});

const RegExName = /^.[a-zA-Z0-9]{6,}$/;
const RegExPassword = /^(?=.*[0-9])(?=.*[A-Za-z])[A-Za-zd0-9]{8,}$/;

const data = JSON.parse(localStorage.getItem("userData"));

if (data) {
  window.location.href = "home.html";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const userName = e.target[0].value.trim();
  const password = e.target[1].value.trim();    

  console.log(userName, password);

  if (RegExName.test(userName) && RegExPassword.test(password)) {
    localStorage.setItem("userData", JSON.stringify({ userName, password }));
    window.location.href = "home.html";
    e.target.reset();
  }
});