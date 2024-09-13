document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    const loginForm = document.getElementById('loginForm');
    const errorDisplay = document.getElementById('errorDisplay');
  
    function showError(message) {
      errorDisplay.textContent = message;
      errorDisplay.style.display = 'block';
    }
  
    function clearError() {
      errorDisplay.style.display = 'none';
    }
  
    function isUsernameValid(username) {
      if (!username.trim()) return 'Username cannot be blank';
      if (username.length < 4) return 'Username must be at least four characters long';
      if (new Set(username).size < 2) return 'Username must contain at least two unique characters';
      if (/[^a-zA-Z0-9]/.test(username)) return 'Username cannot contain special characters or whitespace';
      return '';
    }
  
    function isEmailValid(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) return 'Email must be a valid email address';
      if (email.endsWith('@example.com')) return 'Email cannot be from the domain "example.com"';
      return '';
    }
  
    function isPasswordValid(password, username) {
      if (password.length < 12) return 'Passwords must be at least 12 characters long';
      if (!/[A-Z]/.test(password)) return 'Passwords must contain at least one uppercase letter';
      if (!/[a-z]/.test(password)) return 'Passwords must contain at least one lowercase letter';
      if (!/[0-9]/.test(password)) return 'Passwords must contain at least one number';
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return 'Passwords must contain at least one special character';
      if (/password/i.test(password)) return 'Passwords cannot contain the word "password"';
      if (password.includes(username)) return 'Passwords cannot contain the username';
      return '';
    }
  
    registrationForm.addEventListener('submit', (event) => {
      event.preventDefault();
      clearError();
  
      const username = document.getElementById('username').value.trim().toLowerCase();
      const email = document.getElementById('email').value.trim().toLowerCase();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const termsAccepted = document.getElementById('terms').checked;
  
      const usernameError = isUsernameValid(username);
      if (usernameError) return showError(usernameError);
  
      const emailError = isEmailValid(email);
      if (emailError) return showError(emailError);
  
      const passwordError = isPasswordValid(password, username);
      if (passwordError) return showError(passwordError);
  
      if (password !== confirmPassword) return showError('Passwords must match');
  
      if (!termsAccepted) return showError('You must accept the terms and conditions');
  
      const userData = {
        username,
        email,
        password
      };
      localStorage.setItem('user_' + username, JSON.stringify(userData));
      registrationForm.reset();
      showError('Registration successful!');
    });
  
    function isLoginValid(username, password) {
      const storedUser = localStorage.getItem('user_' + username.toLowerCase());
      if (!storedUser) return 'Username does not exist';
      const userData = JSON.parse(storedUser);
      if (userData.password !== password) return 'Password is incorrect';
      return '';
    }
  
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      clearError();
  
      const loginUsername = document.getElementById('loginUsername').value.trim().toLowerCase();
      const loginPassword = document.getElementById('loginPassword').value;
      const keepLoggedIn = document.getElementById('keepLoggedIn').checked;
  
      const loginError = isLoginValid(loginUsername, loginPassword);
      if (loginError) return showError(loginError);
  
      loginForm.reset();
      showError(keepLoggedIn ? 'Login successful! You will stay logged in.' : 'Login successful!');
    });
  });
  