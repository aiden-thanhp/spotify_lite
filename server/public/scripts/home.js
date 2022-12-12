const BACKEND_URL = 'http://localhost:3000';
const headers = new Headers();
headers.append("Content-Type", "application/json");

async function likeASong(args) {
    const [userId, songId] = args.split(',');

    if (!userId) {
        location.href = "/login"
    } else {
        const url = `${BACKEND_URL}/songs/${songId}`
        const response = await fetch(url, {
            headers,
            method: "PUT",
            body: JSON.stringify({ id: userId })
        });
        console.log(response);
    }
}

async function followAnArtist(args) {
    const [userId, artistId] = args.split(',');

    if (!userId) {
        location.href = "/login"
    } else {
        const url = `${BACKEND_URL}/artists/${artistId}`
        const response = await fetch(url, {
            method: 'PUT',
            headers,
            body: JSON.stringify({id: userId})
        })
        console.log(response);
    }
}

const searchForm = document.getElementById('searchForm');
if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
        location.href = `/search?search=${searchForm.elements["search"].value}`
    })
}

const editForm = document.getElementById("edit-form");
if (editForm) {
    const name = editForm.elements["name"];
    const profilePicture = editForm.elements["profilePicture"];
    const bio = editForm.elements["bio"];
    const email = editForm.elements["email"];
    const id = editForm.parentNode.getAttribute("id")

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


    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newData = {
            "name": name.value,
            "profilePicture": profilePicture.value,
            "bio": bio.value,
            "email": email.value,
            "id": id
        }

        const url = `${BACKEND_URL}/user/info`
        const response = await fetch(url, {
            headers,
            method: "PUT",
            body: JSON.stringify(newData)
        })
        
        if (response.status === 400) {
            const error = await response.json();
            const alertMessage = document.getElementById('alert-message');
            alertMessage.innerText = error["Error"];
            alertMessage.classList.remove("hidden")
        } else {
            console.log(await response.json());
            location.href = '/auth';
        } 
    })
}
