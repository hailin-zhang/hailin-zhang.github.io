function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function debounce(func, wait, immediate) {
	let timeout;
	return function() {
		const context = this, args = arguments;
		const later = function() {
			timeout = null;
			if (!immediate) {
                func.apply(context, args);
            }
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) {
            func.apply(context, args);
        }
	}
}

function awaitDOMLoad(callback) {
    if (document.readyState !== 'loading') {
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

const renderParallax = () => {
    const scenes = [
        document.getElementById('death-star'),
        document.getElementById('millenium-falcon'),
        document.getElementById('left-tie'),
        document.getElementById('right-tie'),
        document.getElementById('x-wing'),
        document.getElementById('blaster'),
        document.getElementById('hoth'),
        document.getElementById('alderaan'),
        document.getElementById('mustafar'),
    ];
    scenes.map((scene) => new Parallax(scene));
}

const renderTitleText = async (tag, str) => {
    await clearTitleText(tag);
    loadText(tag, str, true);
}

const clearTitleText = async (tag) => {
    const anchorNode = document.getElementById(tag);
    if (!!anchorNode) {
        const anchorParentNode = anchorNode.parentElement;
        const defaultAnchorHTML = `<span class="anchor-title${tag === 'hobbies-title' ? ' hobbies-title' : ''}" id="${tag}"></span>`;
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
        mute();
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
        mute();
    // Work Experience
    } else if ((offsetRight < 3 * offsetWidth) && (offsetRight > 2 * offsetWidth)) {
        navContainer.style.display = 'flex';
        leftAnchor.href = '#projects';
        rightAnchor.href = '#hobbies';
        hideIntroCrawl();
        mute();
    // Hobbies
    } else if ((offsetRight < 2 * offsetWidth) && (offsetRight > 1 * offsetWidth)) {
        navContainer.style.display = 'flex';
        leftAnchor.href = '#workExperience';
        rightAnchor.href = '#aboutMe';
        hideIntroCrawl();
        mute();
    // About Me
    } else {
        navContainer.style.display = 'flex';
        leftAnchor.href = '#hobbies';
        rightAnchor.href = '#home';
        hideIntroCrawl();
        mute();
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
}

const replayIntro = async () => {
    hideIntroCrawl();
    await sleep(50);
    showIntroCrawl();
}

const unmute = () => {
    const bgmElem = document.getElementById('audio');
    bgmElem.muted = false;
    if (bgmElem.currentTime === 0) {
        replayIntro();
    }
    const unmutedImg = document.getElementById('intro-control-unmute');
    unmutedImg.style.display = 'block';
    const mutedImg = document.getElementById('intro-control-mute');
    mutedImg.style.display = 'none';
}

const mute = () => {
    const bgmElem = document.getElementById('audio');
    bgmElem.muted = true;
    const unmutedImg = document.getElementById('intro-control-unmute');
    unmutedImg.style.display = 'none';
    const mutedImg = document.getElementById('intro-control-mute');
    mutedImg.style.display = 'block';
}

const loadRandomIntroStar = () => {
    const renderStar = async (leftNumPercent, topNumPercent, zDeg) => {
        const starContainerElem = document.getElementById('star-container');
        const starContainerCopy = starContainerElem.cloneNode(true);
        const starElem = document.getElementById('star');
        const starCopy = starElem.cloneNode(true);
        starContainerCopy.style.transform = `rotateZ(${zDeg}deg)`;
        starCopy.style.left = `${leftNumPercent}%`;
        starCopy.style.top = `${topNumPercent}%`;
        starElem.parentNode.replaceChild(starCopy, starElem);
        starContainerElem.parentNode.replaceChild(starContainerCopy, starContainerElem);
        const randomLeft = Math.floor(Math.random() * 15) + 1;
        const randomTop = Math.floor(Math.random() * 20) + 1;
        const randomZDeg = Math.floor(Math.random() * 55) + 1;
        setTimeout(() => renderStar(randomLeft, randomTop, randomZDeg), 7000);
    }
    renderStar(0, 2, 35);
}

const playBlasterEffect = async () => {
    const blasterElem = document.querySelector('.blaster');
    blasterElem.style.transform = 'rotate(-150deg)';
    const blasterSound = new Audio('assets/blaster.wav');
    blasterSound.volume = 0.2;
    blasterSound.play();
    await sleep(Math.floor(Math.random() * 1600) + 800);
    const scream = new Audio('assets/wilhelm.wav');
    scream.volume = 0.3;
    scream.play();
}

const openModal = (backgroundRGBA, planet) => {
    const modalWrapper = document.getElementById('modal-wrapper');
    modalWrapper.style.display = 'flex';
    const modal = document.getElementById('open-modal');
    modal.style.background = backgroundRGBA;
    if (planet === 'hoth') {
        const video = document.createElement("video");
        const source = document.createElement("source");
        source.setAttribute("src", "assets/ski.mp4");
        source.setAttribute("type", "video/mp4");
        video.appendChild(source);
        modal.appendChild(video);
        video.classList.add('hobbies-item');
        setTimeout(() => video.classList.add('animate'), 250);
        video.playsinline = true;
        video.muted = true;
        video.playbackRate = 1.5;
        video.play();
        const imageLinks = [
            'images/whistler1.jpg',
            'images/whistler2.jpg',
            'images/whistler3.jpg',
        ];
        imageLinks.map((imageLink, idx) => {
            const image = document.createElement("img");
            image.setAttribute('src', imageLink);
            image.classList.add('hobbies-item');
            modal.appendChild(image);
            setTimeout(() => image.classList.add('animate'), (idx + 2) * 250);
        });
    } else if (planet === 'alderaan') {
        const imageLinks = [
            'images/dog-mountain.jpg',
            'images/tofino.jpg',
            'images/us.jpg',
        ];
        imageLinks.map((imageLink, idx) => {
            const image = document.createElement("img");
            image.setAttribute('src', imageLink);
            image.classList.add('hobbies-item');
            modal.appendChild(image);
            setTimeout(() => image.classList.add('animate'), (idx + 1) * 250);
        });
    } else if (planet === 'mustafar') {
        const imageLinks = [
            'images/minami.png',
            'images/squirmies.png',
            'images/brix.jpg'
        ];
        imageLinks.map((imageLink, idx) => {
            const image = document.createElement("img");
            image.setAttribute('src', imageLink);
            image.classList.add('hobbies-item');
            modal.appendChild(image);
            setTimeout(() => image.classList.add('animate'), (idx + 1) * 250);
        });
    }
}

const closeModal = () => {
    const modalWrapper = document.getElementById('modal-wrapper');
    modalWrapper.style.display = 'none';
    const modal = document.getElementById('open-modal');
    modal.innerHTML = '';
}

awaitDOMLoad(async () => {
    updateNav();
    loadSmoothScroll();
    renderParallax();
    loadText('title', 'Hello there,', false, 45);
    await sleep(1000);
    loadText('subtitle', 'My name is Hai Lin. Welcome to my website!', false, 45);
    loadRandomIntroStar();
});
