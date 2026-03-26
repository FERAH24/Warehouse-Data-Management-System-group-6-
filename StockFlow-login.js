document.addEventListener("DOMContentLoaded", function () {

  // ===== LOGIN PAGE JAVASCRIPT =====

  var emailInput = document.getElementById('email');
  var passwordInput = document.getElementById('password');
  var emailError = document.getElementById('email-error');
  var passError = document.getElementById('pass-error');
  var loginBtn = document.getElementById('login-btn');
  var forgotLink = document.getElementById('forgot-link');
  var googleBtn = document.getElementById('google-btn');
  var appleBtn = document.getElementById('apple-btn');

  // ===== LOGIN BUTTON =====
  loginBtn.addEventListener('click', function (e) {
    e.preventDefault();

    var email = emailInput.value;
    var password = passwordInput.value;
    var isValid = true;

    if (email === '' || !email.includes('@')) {
      emailError.style.display = 'block';
      emailInput.parentElement.style.borderColor = 'red';
      isValid = false;
    } else {
      emailError.style.display = 'none';
      emailInput.parentElement.style.borderColor = '#ddd';
    }

    if (password.length < 6) {
      passError.style.display = 'block';
      passwordInput.parentElement.style.borderColor = 'red';
      isValid = false;
    } else {
      passError.style.display = 'none';
      passwordInput.parentElement.style.borderColor = '#ddd';
    }

    if (isValid) {
      loginBtn.textContent = 'Logging in...';
      loginBtn.disabled = true;
      
fetch("https://stock-flow-k866.onrender.com/auth/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ email, password }),
  credentials: "include" // IMPORTANT (keeps cookie)
})
.then(res => res.json())
.then(data => {
  console.log("LOGIN RESPONSE:", data);

  if (data.message === "LOGIN SUCCESSFUL") {
    window.location.href = "stockFlow-dash.html";
  } else {
    alert(data.message || "Login failed");
  }
})
.catch(() => {
  alert("Network error");
});
    }
  });

  // Other buttons (safe now)
  if (forgotLink) {
    forgotLink.addEventListener('click', function (e) {
      e.preventDefault();
      alert('Reset link sent!');
    });
  }

});
   //   fetch("https://stock-flow-k866.onrender.com/auth/login", {
     //   method: "POST",
      //  headers: {
    //      "Content-Type": "application/json"
     //   },
    //    body: JSON.stringify({ email: email, password: password })
//      })
  //    .then(function (response) {
//        return response.json();
  //    })
   //   .then(function (data) {

   //     if (data && data.token) {
    //      localStorage.setItem("token", data.token);
    //      window.location.href = "stockFlow-dash.html";
   //     } else {
    //      alert("Login failed.");
   //       loginBtn.textContent = 'Log in';
    //      loginBtn.disabled = false;
   //     }

 //     })
    //  .catch(function () {
    //    alert("Network error");
    //    loginBtn.textContent = 'Log in';
     //   loginBtn.disabled = false;
    //  });
  //  }
//  });

  // // Other buttons (safe now)
  // if (forgotLink) {
  //   forgotLink.addEventListener('click', function (e) {
  //     e.preventDefault();
  //     alert('Reset link sent!');
  //   });
  // }

//});
