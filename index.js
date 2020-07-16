function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function awaitDOMLoad(callback){
    if (document.readyState!='loading') {
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

const loadText = (tag, str, showBar = false) => {
    var tagElem = document.getElementById(tag);
    tagElem.innerHTML = '';
    var n = 0;
    var typeTimer = setInterval(() => {
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
    }, 70)
}

awaitDOMLoad(async () => {
    loadSmoothScroll();
    loadStarWarsScene();
    loadText('title', 'Welcome to my website!');
    await sleep(2000);
    loadText('subtitle', 'My name is Hai Lin', true);
});