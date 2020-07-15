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
    let sceneGen = document.getElementById('death-star');
    new Parallax(sceneGen);
    sceneGen = document.getElementById('millenium-falcon');
    new Parallax(sceneGen);
}

awaitDOMLoad(() => {
    loadStarWarsScene();
});