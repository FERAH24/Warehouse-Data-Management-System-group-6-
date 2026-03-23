// Get all form elements
var nameInput    = document.getElementById('name');
var emailInput   = document.getElementById('email');
var phoneInput   = document.getElementById('phone');
var messageInput = document.getElementById('message');
var sendBtn      = document.getElementById('send-btn');
var successMsg   = document.getElementById('success-msg');

var nameError  = document.getElementById('name-error');
var emailError = document.getElementById('email-error');
var phoneError = document.getElementById('phone-error');


// ===== SEND BUTTON =====
sendBtn.addEventListener('click', function () {

  var isValid = true;

  // Check name
  if (nameInput.value.trim() === '') {
    nameError.style.display = 'block';
    nameInput.style.borderColor = 'red';
    isValid = false;
  } else {
    nameError.style.display = 'none';
    nameInput.style.borderColor = '#ddd';
  }

  // Check email
  if (emailInput.value.trim() === '' || !emailInput.value.includes('@')) {
    emailError.style.display = 'block';
    emailInput.style.borderColor = 'red';
    isValid = false;
  } else {
    emailError.style.display = 'none';
    emailInput.style.borderColor = '#ddd';
  }

  // Check phone
  if (phoneInput.value.trim() === '') {
    phoneError.style.display = 'block';
    phoneInput.style.borderColor = 'red';
    isValid = false;
  } else {
    phoneError.style.display = 'none';
    phoneInput.style.borderColor = '#ddd';
  }

  // If all good, send to API
  if (isValid) {
    sendBtn.textContent = 'Sending...';
    sendBtn.disabled = true;

    fetch('https://stock-flow-k866.onrender.com/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        message: messageInput.value
      })
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      successMsg.style.display = 'block';
      sendBtn.textContent = 'Sent!';
      sendBtn.style.background = '#22c55e';

      // Clear form
      nameInput.value = '';
      emailInput.value = '';
      phoneInput.value = '';
      messageInput.value = '';
      document.getElementById('subject').value = '';
    })
    .catch(function (error) {
      console.log('Error:', error);
      alert('Could not connect to server. Try again.');
      sendBtn.textContent = 'Send';
      sendBtn.disabled = false;
    });
  }

});


// ===== CLEAR ERRORS WHEN USER TYPES =====
nameInput.addEventListener('input', function () {
  nameError.style.display = 'none';
  nameInput.style.borderColor = '#ddd';
});

emailInput.addEventListener('input', function () {
  emailError.style.display = 'none';
  emailInput.style.borderColor = '#ddd';
});

phoneInput.addEventListener('input', function () {
  phoneError.style.display = 'none';
  phoneInput.style.borderColor = '#ddd';
});


// ===== NAV BUTTONS =====
document.querySelector('.btn-signin').addEventListener('click', function () {
  window.location.href = 'stockFlow-login.html';
});

document.querySelector('.btn-started').addEventListener('click', function () {
  window.location.href = 'stockFlow-login.html';
});
