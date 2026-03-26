document.addEventListener("DOMContentLoaded", function () {
  var firstNameInput = document.getElementById("firstName");
  var lastNameInput = document.getElementById("lastName");
  var emailInput = document.getElementById("email");
  var passwordInput = document.getElementById("pwd");
  var registerBtn = document.getElementById("register-btn");
  var registerError = document.getElementById("register-error");

  function togglePwd() {
    passwordInput.type =
      passwordInput.type === "password" ? "text" : "password";
  }
  window.togglePwd = togglePwd;

  registerBtn.addEventListener("click", function (e) {
    e.preventDefault();
    registerError.style.display = "none";
    registerError.classList.remove("success");

    var firstName = firstNameInput.value.trim();
    var lastName = lastNameInput.value.trim();
    var email = emailInput.value.trim();
    var password = passwordInput.value;

    if (!firstName || !lastName) {
      registerError.textContent = "Please enter your first and last name.";
      registerError.style.display = "block";
      return;
    }

    if (!email || !email.includes("@")) {
      registerError.textContent = "Please enter a valid email.";
      registerError.style.display = "block";
      return;
    }

    if (password.length < 8) {
      registerError.textContent = "Password must be at least 8 characters.";
      registerError.style.display = "block";
      return;
    }

    registerBtn.textContent = "Creating account...";
    registerBtn.disabled = true;

    fetch("https://stock-flow-k866.onrender.com/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        console.log("REGISTER RESPONSE:", data);

        if (
          data.message === "REGISTER SUCCESSFUL" ||
          data.message === "USER CREATED" ||
          data.message === "USER REGISTERED SUCCESSFULLY"
        ) {
          registerError.textContent =
            "Registration successful! Redirecting to login...";
          registerError.classList.add("success");
          registerError.style.display = "block";
          setTimeout(function () {
            window.location.href = "StockFlow-login.html";
          }, 2000);
        } else {
          registerError.textContent = data.message || "Registration failed.";
          registerError.classList.remove("success");
          registerError.style.display = "block";
        }
      })
      .catch(function () {
        registerError.textContent = "Network error. Please try again.";
        registerError.style.display = "block";
      })
      .finally(function () {
        registerBtn.textContent = "Continue →";
        registerBtn.disabled = false;
      });
  });
});
