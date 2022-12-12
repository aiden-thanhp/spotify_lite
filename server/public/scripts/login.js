const BACKEND_URL = 'http://localhost:3000';
const headers = new Headers();
headers.append("Content-Type", "application/json");

const loginForm = document.getElementById("login-form");
const email = loginForm.elements["email"];
const password = loginForm.elements["password"];

// validate all the inputs onChange
function validatePassword() {
    const passwordMessage = document.getElementById("password-validate-message");
    if (password.value.length < 1) {
        passwordMessage.classList.remove("hidden");
        password.classList.add("alert");
    } else {
        passwordMessage.classList.add("hidden");
        password.classList.remove("alert")
    }
}

function validateEmail() {
    const emailMessage = document.getElementById("email-validate-message");
    if (email.value.length < 1) {
        emailMessage.classList.remove("hidden");
        email.classList.add("alert");
    } else {
        emailMessage.classList.add("hidden");
        email.classList.remove("alert")
    }
}

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        const loginInfo = email.value.includes("@")
            ? {
                "email": email.value,
                "password": password.value
            }
            : {
                "username": email.value,
                "password": password.value
            }

        const url = `${BACKEND_URL}/login`;
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(loginInfo),
            headers
        })
        
        // handle response status
        if (response.status === 400) {
            const alertMessage = document.getElementById('alert-message');
            alertMessage.innerText = "Your username and password combination doesn't match our database.";
            alertMessage.classList.remove("hidden")
        } else {
            location.href = "/auth";
        }
    } catch (e) { 
        throw new Error(`Front-end Err: ${e}`)
    }
})