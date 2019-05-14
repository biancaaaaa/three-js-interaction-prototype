const container = document.querySelector('#container');

// const viewCube = window.viewcube = new FOUR.Viewcube('viewcube');
// viewCube.init();

// nav buttons

const navControls = document.querySelectorAll('.nav-control');

const newScene = new ThreeScene(0x2d99f9, container,
    window.innerWidth, window.innerHeight);


let counter = 0;

for (let i = 0; i < navControls.length; i++)
    navControls[i].addEventListener('click', e => {
        console.log('set');
        newScene.setView(e.target.id);
    });
