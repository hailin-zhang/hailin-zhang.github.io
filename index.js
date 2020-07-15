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

const loadStarWarsScene = () => {
    const deathStarScene = document.getElementById('death-star');
    return new Parallax(deathStarScene);
}

awaitDOMLoad(() => {
    loadStarWarsScene();
});