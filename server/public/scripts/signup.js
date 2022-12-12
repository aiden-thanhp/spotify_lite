const BACKEND_URL = 'http://localhost:3000';
const headers = new Headers();
headers.append("Content-Type", "application/json");

const signupForm = document.getElementById("signup-form");
const email = signupForm.elements["email"];
const emailConfirm = signupForm.elements["email-confirm"];
const username = signupForm.elements["username"];
const password = signupForm.elements["password"];
const passwordConfirm = signupForm.elements["password-confirm"];
const name = signupForm.elements["name"]

// validate all the inputs onChange
function confirmPassword() {
    const passwordMessage = document.getElementById("password-message");

    if (passwordConfirm.value !== password.value) {
        passwordMessage.classList.remove("hidden");
        passwordConfirm.classList.add("alert");
    } else {
        passwordMessage.classList.add("hidden");
        passwordConfirm.classList.remove("alert")
    }
}

function confirmEmail() {
    const emailMessage = document.getElementById("email-message");

    if (emailConfirm.value !== email.value) {
        emailMessage.classList.remove("hidden");
        emailConfirm.classList.add("alert");
    } else {
        emailMessage.classList.add("hidden");
        emailConfirm.classList.remove("alert")
    }
}

function validateEmail() {
    const emailFormat = /\S+@\S+\.\S+/;
    const emailValidateMessage = document.getElementById('email-validate-message');
    if (!emailFormat.test(email.value)) {
        emailValidateMessage.classList.remove("hidden");
        email.classList.add("alert");
    } else {
        emailValidateMessage.classList.add("hidden");
        email.classList.remove("alert");
    }
}

function validateUsername() {
    const usernameFormat = /^[a-z0-9]+$/i;
    const usernameValidateMessage = document.getElementById('username-validate-message');
    if (username.value.length < 4 || !usernameFormat.test(username.value)) {
        usernameValidateMessage.classList.remove("hidden");
        username.classList.add("alert");
    } else {
        usernameValidateMessage.classList.add("hidden");
        username.classList.remove("alert");
    }
}

function validatePassword() {
    const passwordValidateMessage = document.getElementById('password-validate-message');
    if (password.value.length > 16 || password.value.length < 6) {
        passwordValidateMessage.classList.remove("hidden");
        password.classList.add("alert");
    } else {
        passwordValidateMessage.classList.add("hidden");
        password.classList.remove("alert");
    }
}

function validateName() {
    const nameFormat = /^[a-z0-9]+$/i;
    const nameValidateMessage = document.getElementById('name-validate-message');
    if (name.value.split(" ").length < 2 || name.value.split(" ")[1].length < 1 || !nameFormat.test(name.value.split(" ")[1]) || !nameFormat.test(name.value.split(" ")[2])) {
        nameValidateMessage.classList.remove("hidden");
        name.classList.add("alert");
    } else {
        nameValidateMessage.classList.add("hidden");
        name.classList.remove("alert");
    }
}

// submit the form
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // create data
    try {
        const newUser = {
            "name": name.value,
            "email": emailConfirm.value,
            "password": passwordConfirm.value,
            "username": username.value,
            "profilePicture": "",
            "bio": ""
        }
        const url = `${BACKEND_URL}/signup`
        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(newUser)
        });

        // handle response status
        if (response.status === 400) {
            const error = await response.json();
            const alertMessage = document.getElementById('alert-message');
            alertMessage.innerText = error["Error"];
            alertMessage.classList.remove("hidden")
        } else {
            console.log(await response.json());
            location.href = '/login';
        } 
    } catch (e) {
        throw new Error(`Front-end Err: ${e}`)
    }
})