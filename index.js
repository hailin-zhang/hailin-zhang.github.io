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
    const progressIconNode = document.querySelector(".progress-icon");
    const scrollPercentage = (scrollHeightCurrent / scrollHeightTotal) * 100;
    progressBarNode.style.width = scrollPercentage + "%";
}

awaitDOMLoad(async () => {
    loadSmoothScroll();
    loadStarWarsScene();
    loadText('title', 'Welcome to my website!', false, 45);
    await sleep(1200);
    loadText('subtitle', 'My name is Hai Lin', false, 45);
});
