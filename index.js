let navbarIsHidden = false;
let canvas, ctx;
let mouseX, mouseY, mouseDown = 0;
const colors = [
    {
        r: 0,
        g: 0,
        b: 0
    },
    {
        r: 255,
        g: 0,
        b: 0
    },
    {
        r: 0,
        g: 255,
        b: 0
    },
    {
        r: 0,
        g: 0,
        b: 255
    },
    {
        r: 255,
        g: 165,
        b: 0
    },
    {
        r: 255,
        g: 255,
        b: 0
    },
    {
        r: 128,
        g: 0,
        b: 128
    },
    {
        r: 255,
        g: 192,
        b: 203
    },
    {
        r: 165,
        g: 42,
        b: 42
    },
    {
        r: 255,
        g: 255,
        b: 255
    }
]
let currentColor = colors[0], colorIncrementer = 0, dotSize = 3;
let deadList = [
    { 
        "name":"Black Panther" 
    },
    { 
        "name":"Falcon" 
    },
    { 
        "name":"Winter Soldier" 
    },
    { 
        "name":"Scarlet Witch" 
    },
    { 
        "name":"Drax" 
    },
    { 
        "name":"Groot" 
    },
    { 
        "name":"Mantis" 
    },
    { 
        "name":"Star Lord" 
    },
    { 
        "name":"Spider-Man" 
    },
    { 
        "name":"Doctor Strange" 
    },
    { 
        "name":"Nick Fury" 
    }
];
let aliveList = [
    { 
        "name":"Thor" 
    },
    { 
        "name":"Captain America" 
    },
    { 
        "name":"Iron Man" 
    },
    { 
        "name":"War Machine" 
    },
    { 
        "name":"Black Widow" 
    },
    { 
        "name":"Nebula" 
    },
    { 
        "name":"Okoye" 
    },
    { 
        "name":"Rocket" 
    },
    { 
        "name":"Bruce Banner / Hulk" 
    },
    { 
        "name":"Captain Marvel" 
    },
    { 
        "name":"Hawkeye" 
    },
    { 
        "name":"Ant-Man" 
    }
];

function hideNavbar() {
    navbarIsHidden = true;
    document.getElementById('navbar').classList.toggle('hidden');
    document.getElementById('lists-container').classList.toggle('hidden');
}

function unhideNavbar() {
    clearCanvas(canvas, ctx);
    if (navbarIsHidden) {
        document.getElementById('navbar').classList.toggle('hidden');
        document.getElementById('lists-container').classList.toggle('hidden');
        navbarIsHidden = false; 
    }
}

function openCitationsAlert() {
    window.open('https://github.com/hailin-zhang/CPSC-436I-Assignments/blob/master/Assignment%201/citations.md');
}

function displayLoadingSpinner() {
    document.getElementById('loading-spinner').style.display = 'block';
}

function hideLoadingSpinner() {
    document.getElementById('loading-spinner').style.display = 'none';
}

async function navToAboutMe() {
    displayLoadingSpinner();
    await setTimeout(() => {
        hideLoadingSpinner();   
        location.href = 'about-me.html';
    }, 2800);
}

function drawDot(ctx, x, y, rgbObject, size) {
    if (navbarIsHidden) { 
        ctx.fillStyle = `rgba(${rgbObject.r}, ${rgbObject.g}, ${rgbObject.b}, 1)`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI*2, true); 
        ctx.closePath();
        ctx.fill();
    }
} 

function clearCanvas(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function sketchpad_mouseDown(e) {
    switch (e.which) {
        case 3: 
            changeColor();
            return;
        default: 
            mouseDown = 1;
            drawDot(ctx, mouseX, mouseY, currentColor, dotSize);
            return;
    }
}

function changeColor() {
    colorIncrementer = (colorIncrementer + 1) % colors.length;
    currentColor = colors[colorIncrementer];
}

function sketchpad_mouseUp() {
    mouseDown = 0;
}

function sketchpad_mouseMove(e) { 
    getMousePos(e);
    if (mouseDown == 1) {
        drawDot(ctx, mouseX, mouseY, currentColor, dotSize);
    }
}

function getMousePos(e) {
    if (!e) {
        const e = event;
    } if (e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    } else if (e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }
}

function changeDotSize(e) {
    const sizeChange = 2;
    e.deltaY > 0 ? (dotSize - sizeChange > 0 ? dotSize -= sizeChange : 1) : dotSize += sizeChange;
}

function initSketchpad() {
    canvas = document.getElementById('sketchpad');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext('2d');
    canvas.addEventListener('mousedown', sketchpad_mouseDown, false);
    canvas.addEventListener('mousemove', sketchpad_mouseMove, false);
    canvas.addEventListener('wheel', changeDotSize, { passive: true });
    document.addEventListener('keyup', (e) => {
        // clear on spacebar click
        if (e.keyCode === 32) {
            clearCanvas(canvas, ctx);
        }
    }, false);
    window.addEventListener('mouseup', sketchpad_mouseUp, false);
    loadLists();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}  

async function loadLists() {
    const alive_list = document.getElementById('alive-list');
    const dead_list = document.getElementById('dead-list');
    const alive_ul = document.createElement('ul');
    const dead_ul = document.createElement('ul');
    formatList(alive_list, alive_ul, true);
    formatList(dead_list, dead_ul);
    alive_ul.classList.add('list-ul');
    dead_ul.classList.add('list-ul');
    alive_ul.id = 'alive-list-ul';
    dead_ul.id = 'dead-list-ul';
    await Array.from(alive_ul.getElementsByTagName("li")).forEach(async (li) => {
            await sleep(1436);  
            li.className += ' show';
        }
    );
    await Array.from(dead_ul.getElementsByTagName("li")).forEach(async (li) => {
            await sleep(1436);  
            setTimeout(() => li.className += ' show', 436);
        }
    );
    console.log(`loaded lists`);
    console.log('alive:');
    console.log(aliveList);
    console.log('dead:');
    console.log(deadList);
}

function formatList(document_list, ul, isAliveList = false) {
    let li;
    const currentList = isAliveList ? aliveList : deadList;
    currentList.map((listObj) => {
            li = document.createElement('li');
            li.innerHTML = listObj.name;
            li.className = 'list-li';
            ul.appendChild(li);
       }
    );
    document_list.appendChild(ul);
}

async function clearList() {
    displayLoadingSpinner();
    await setTimeout(() => {
        hideLoadingSpinner();
        aliveList = [];
        deadList = [];
        const alive_list_ul = document.getElementById('alive-list-ul');
        const dead_list_ul = document.getElementById('dead-list-ul');
        if (alive_list_ul) {
            alive_list_ul.parentNode.removeChild(alive_list_ul);
        }
        if (dead_list_ul) {
            dead_list_ul.parentNode.removeChild(dead_list_ul);
        }
        const alive_list = document.getElementById('alive-list');
        const dead_list = document.getElementById('dead-list');
        const alive_ul = document.createElement('ul');
        const dead_ul = document.createElement('ul');
        const alive_length = aliveList.length;
        const dead_length = deadList.length;
        alive_ul.classList.add('list-ul');
        dead_ul.classList.add('list-ul');
        alive_ul.id = 'alive-list-ul';
        dead_ul.id = 'dead-list-ul';
        formatList(alive_list, alive_ul, alive_length, true);
        formatList(dead_list, dead_ul, dead_length);
        console.log(`cleared lists`);
        console.log('alive:');
        console.log(aliveList);
        console.log('dead:');
        console.log(deadList);
    }, 800);
}

async function submitName() {
    const nameTextArea = document.getElementById('name-form');
    const inputtedName = nameTextArea.value;
    if (inputtedName) {  
        nameTextArea.className = '';
        const isAlive = ~~(Math.random() * 10 + 1) > 5;
        const documentUL = document.getElementById(isAlive ? 'alive-list-ul' : 'dead-list-ul');
        const newLI = document.createElement('li');
        newLI.className = 'list-li';
        isAlive ? 
            aliveList.push({
                "name": inputtedName
            }) :
            deadList.push({
                "name": inputtedName
            });
        newLI.innerHTML = isAlive ? aliveList[aliveList.length-1].name : deadList[deadList.length-1].name;
        documentUL.appendChild(newLI);
        setTimeout(() => newLI.className = newLI.className + ' show', 100);
        console.log(`submitted ${inputtedName}:`);
        console.log('alive:');
        console.log(aliveList);
        console.log('dead:');
        console.log(deadList);
    } else {
        nameTextArea.className = 'textarea-error';
    }
}

function clearName() {
    document.getElementById('name-form').value = '';
}

setTimeout(() => {
    document.getElementById('navbar').classList.toggle('hidden');
    document.getElementById('lists-container').classList.toggle('hidden');
    }, 436
);
