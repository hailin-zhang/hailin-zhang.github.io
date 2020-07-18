function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function awaitDOMLoad(callback) {
    if (document.readyState != 'loading') {
        callback();
    } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        document.attachEvent('onreadystatechange', () => {
            if (document.readyState === 'complete') {
                callback();
            }
        });
    }
}

const loadSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
            });
        });
    });
}

const loadStarWarsScene = () => {
    const scenes = [
        document.getElementById('death-star'),
        document.getElementById('millenium-falcon'),
        document.getElementById('left-tie'),
        document.getElementById('right-tie'),
        document.getElementById('x-wing'),
    ];
    scenes.map((scene) => new Parallax(scene));
}

const renderAnchorText = async (str) => {
    await clearAnchorText();
    loadText('anchor-text', str, true);
}

const clearAnchorText = async () => {
    const anchorNode = document.getElementById('anchor-text');
    if (!!anchorNode) {
        const anchorParentNode = anchorNode.parentElement;
        const defaultAnchorHTML = `<span class="anchor-title" id="anchor-text"></span>`;
        anchorNode.parentElement.removeChild(anchorNode);
        anchorParentNode.insertAdjacentHTML('beforeend', defaultAnchorHTML);
    }
}

const loadText = async (tag, str, showBar = false, typeSpeed = 70) => {
    const tagElem = document.getElementById(tag);
    tagElem.innerHTML = ' ';
    let n = 0;
    const typeTimer = setInterval(() => {
        n = n + 1;
        tagElem.innerHTML = str.slice(0, n);
        if (n === str.length) {
            clearInterval(typeTimer);
            tagElem.innerHTML = str;
            n = 0;
            setInterval(() => {
                if (n === 0) {
                    tagElem.innerHTML = str + `${showBar ? '|' : ''}`;
                    n = 1;
                } else {
                    tagElem.innerHTML = str;
                    n = 0;
                };
            }, 600);
        };
    }, typeSpeed);
}

const updateScrollProgressBar = () => {
    const scrollContainer = document.querySelector(".scroll-container");
    const scrollHeightTotal = scrollContainer.scrollHeight - scrollContainer.clientHeight;
    const scrollHeightCurrent = scrollContainer.scrollTop;
    const progressBarNode = document.querySelector(".progress-bar");
    const scrollPercentage = (scrollHeightCurrent / scrollHeightTotal) * 100;
    progressBarNode.style.width = scrollPercentage + "%";
}

const updateNav = () => {
    const scrollContainer = document.querySelector(".scroll-container");
    const navContainer = document.querySelector(".nav-container");
    const scrollHeightTotal = scrollContainer.scrollHeight - scrollContainer.clientHeight;
    const offsetRight = scrollHeightTotal - scrollContainer.scrollTop + 0.004 * scrollHeightTotal;
    navContainer.style.right = `${offsetRight}px`;
    // update buttons
    const leftAnchor = document.querySelector('.nav-back');
    const rightAnchor = document.querySelector('.nav-fwd');
    const widthOfContentPage = document.getElementById('home').offsetWidth;
    const offsetWidth = widthOfContentPage - widthOfContentPage / 20;
    // Home
    if ((offsetRight < 6 * offsetWidth) && (offsetRight > 5 * widthOfContentPage)) {
        navContainer.style.display = 'none';
        hideIntroCrawl();
    // Intro
    } else if ((offsetRight < 5 * widthOfContentPage) && (offsetRight > 4 * offsetWidth)) {
        navContainer.style.display = 'flex';
        leftAnchor.href = '#home';
        rightAnchor.href = '#projects';
        showIntroCrawl();
    // Projects
    } else if ((offsetRight < 4 * offsetWidth) && (offsetRight > 3 * offsetWidth)) {
        navContainer.style.display = 'flex';
        leftAnchor.href = '#intro';
        rightAnchor.href = '#workExperience';
        hideIntroCrawl();
    // Work Experience
    } else if ((offsetRight < 3 * offsetWidth) && (offsetRight > 2 * offsetWidth)) {
        navContainer.style.display = 'flex';
        leftAnchor.href = '#projects';
        rightAnchor.href = '#hobbies';
        hideIntroCrawl();
    // Hobbies
    } else if ((offsetRight < 2 * offsetWidth) && (offsetRight > 1 * offsetWidth)) {
        navContainer.style.display = 'flex';
        leftAnchor.href = '#workExperience';
        rightAnchor.href = '#aboutMe';
        hideIntroCrawl();
    // About Me
    } else {
        navContainer.style.display = 'flex';
        leftAnchor.href = '#hobbies';
        rightAnchor.href = '#home';
        hideIntroCrawl();
    }
}

const hideIntroCrawl = () => {
    const introText = document.querySelector('.intro-text');
    introText.style.display = 'none';
    const starWarsLogo = document.querySelector('.star-wars-logo');
    starWarsLogo.style.display = 'none';
    const introAnimation = document.querySelector('.crawl-animation');
    introAnimation.style.animation = 'none';
    const introStarWarsPage = document.querySelector('.star-wars-container');
    introStarWarsPage.style.display = 'none';
    const bgmElem = document.getElementById('audio');
    bgmElem.pause();
    bgmElem.load();
}

const showIntroCrawl = async () => {
    const introText = document.querySelector('.intro-text');
    introText.style.display = 'block';
    const starWarsLogo = document.querySelector('.star-wars-logo');
    starWarsLogo.style.display = 'block';
    const introAnimation = document.querySelector('.crawl-animation');
    introAnimation.style.animation = '';
    const introStarWarsPage = document.querySelector('.star-wars-container');
    introStarWarsPage.style.display = 'flex';
    const bgmElem = document.getElementById('audio');
    bgmElem.play();
}

const replayIntro = async () => {
    hideIntroCrawl();
    await sleep(1000);
    showIntroCrawl();
}

const toggleMute = () => {
    const bgmElem = document.getElementById('audio');
    const isMuted = bgmElem.muted;
    bgmElem.muted = !isMuted;
    const unmutedImg = document.getElementById('intro-control-unmute');
    unmutedImg.style.display = `${isMuted ? 'block' : 'none'}`;
    const mutedImg = document.getElementById('intro-control-mute');
    mutedImg.style.display = `${isMuted ? 'none' : 'block'}`;
}

awaitDOMLoad(async () => {
    updateNav();
    loadSmoothScroll();
    loadStarWarsScene();
    loadText('title', 'Welcome to my website!', false, 45);
    await sleep(1200);
    loadText('subtitle', 'My name is Hai Lin', false, 45);
});
