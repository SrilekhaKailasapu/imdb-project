
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const messageDiv = document.getElementById('message');

  function showSignUp() {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
    messageDiv.textContent = '';
    document.getElementById('page-title').textContent = 'Sign Up';
  }

  function signUp() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    if (username && password) {
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      messageDiv.textContent = 'Sign-Up Successful! Redirecting to Login...';
      messageDiv.style.color = 'green';

      setTimeout(() => {
        signupForm.reset();
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        document.getElementById('page-title').textContent = 'Login';
        messageDiv.textContent = '';
      }, 2000);
    } else {
      messageDiv.textContent = 'Please enter both a username and password';
      messageDiv.style.color = 'red';
    }
  }
  function showLogin() {
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
    messageDiv.textContent = '';
    document.getElementById('page-title').textContent = 'Login';
  }

  function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
      messageDiv.textContent = 'Login Successful! Redirecting...';
      messageDiv.style.color = 'green';
      setTimeout(() => {
        localStorage.setItem('loggedIn', 'true');
        window.location.href = 'imdb.html';
      }, 2000);
    } else {
      messageDiv.textContent = 'Invalid credentials! Please sign up first.';
      messageDiv.style.color = 'red';
    }
  }

  window.showSignUp = showSignUp;
  window.showLogin = showLogin;
  window.signUp = signUp;
  window.login = login;
});

