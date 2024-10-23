
function showLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('successMessage').style.display = 'none';
}

function showSignup() {
    document.getElementById('signupForm').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('successMessage').style.display = 'none';
}


function handleLogin() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

   
    if (username  && password ) {
        showSuccess('Login successful!');
    } else {
        alert('Invalid credentials! Try again.');
    }
}

function handleSignup() {
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const tel = document.getElementById('signupMobile').value;
    const password = document.getElementById('signupPassword').value;
    const pass = document.getElementById('signupConfirmPassword').value;
    const gender = document.getElementById('genderMale').value;
    const gend = document.getElementById('genderFemale').value;

    if (password == pass){
        console.log("passwords are matched")
    }
    else{
        console.log("passwords are not matched")
    }
    
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('emailError').style.display = 'block';
    }

    if (username && email && password) {
        showSuccess('Signup successful!');
    } else {
        alert('Please fill in all fields.');
    }
}

function showSuccess(message) {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('successMessage').style.display = 'block';
    document.getElementById('message').textContent = message;
}
function handleBack() {
    window.location.href = 'imdb.html';
    
}

showLogin();

