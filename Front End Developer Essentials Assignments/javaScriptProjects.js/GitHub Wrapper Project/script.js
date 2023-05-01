const userNameInput = document.getElementById('userName');
const showDetailsButton = document.getElementById('showDetails');
const profileInfoDiv = document.getElementById('profileInfo');
const reposInfoDiv = document.getElementById('reposInfo');

// Using Async and Await for Asynchronous Programming
    showDetailsButton.addEventListener('click', async () => {
    const userName = userNameInput.value;

// Request the Data from Server: Fetch API
    const res = await fetch(`https://api.github.com/users/${userName}`);
    const data = await res.json();
    showProfile(data);
    showReposInfo(userName);
})
// Feature of showProfile
function showProfile(data) {
    // console.log(data);
    profileInfoDiv.innerHTML = `<div class="card">
        <div class="card-img">
            <img src=${data.avatar_url} alt=${data.name}>
        </div>
        <div class="card-body">
            <div class="card-title">${data.name}</div>
            <div class="card-subHeading">${data.login}</div>
            <div class="card-text">
                <p>${data.bio}</p>
                <p>${data.followers} followers ${data.following} following
                <button>
                        <a href=${data.html_url}>
                            Do checkout Profile
                        </a>
                </button>
            </div>
        </div>
    </div>`
}

// Feature of showReposInfo
async function showReposInfo(userName) {
    const res = await fetch(`https://api.github.com/users/${userName}/repos`)
    const projects = await res.json();
    
    for (let i = 0; i < projects.length; i++) {
        reposInfoDiv.innerHTML += `<div class="card">
                <div class="card-body">
                    <div class="card-title">${projects[i].name}</div>
                    <div class="card-subHeading">${projects[i].language}</div>
                    <div class="card-text">
                        <button>
                            <a href=${projects[i].html_url}>
                                Do checkout Project
                            </a>
                        </button>
                    </div>
                </div>
            </div>`
    }
}
