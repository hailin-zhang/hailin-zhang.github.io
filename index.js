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

awaitDOMLoad(() => {
    loadSmoothScroll();
    loadStarWarsScene();
});