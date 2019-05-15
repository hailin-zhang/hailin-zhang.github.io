let navbarIsHidden = true;

setTimeout(() => {
    const aboutBlockLeft = document.getElementById('about-block-left');
    aboutBlockLeft.classList.toggle('unfade');
}, 800);

setTimeout(() => {
    const aboutBlockRight = document.getElementById('about-block-right');
    aboutBlockRight.classList.toggle('unfade');
}, 1400);

setTimeout(() => {
    const aboutBlockRight = document.getElementById('back-button');
    aboutBlockRight.classList.toggle('unfade');
}, 2000)

function displayLoadingSpinner() {
    document.getElementById('loading-spinner').style.display = 'block';
}

function hideLoadingSpinner() {
    document.getElementById('loading-spinner').style.display = 'none';
}

function hideNavbar() {
    navbarIsHidden = true;
    document.getElementById('navbar').classList.toggle('hidden');
}

function unhideNavbar() {
    if (navbarIsHidden) {
        document.getElementById('navbar').classList.toggle('hidden');
        navbarIsHidden = false; 
    }
}

async function navToHomePage() {
    displayLoadingSpinner();
    await setTimeout(() => {
        hideLoadingSpinner();
        location.href = 'index.html';
    }, 2800);
}

function openCitationsAlert() {
    window.open('https://github.com/hailin-zhang/CPSC-436I-Assignments/blob/master/Assignment%201/citations.md');
}
