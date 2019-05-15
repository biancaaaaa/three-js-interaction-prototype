const container = document.querySelector('#container');

const newScene = new ThreeScene(0x2d99f9, container,
    window.innerWidth, window.innerHeight);


const xArray = ['front', 'right', 'back', 'left'];
const yArray = ['front', 'top', 'back', 'bottom'];

let xPos = 0;
let yPos = 0;

// CUBE CONTROLS
const viewCubeControls = document.querySelectorAll('.control');
viewCubeControls.forEach(function (control) {
    control.addEventListener('click', function (e) {
        let direction = '';
        switch (e.target.id) {
            case 'arrow-left':
                if (xPos > 0) xPos--;
                else xPos = xArray.length - 1;
                direction = xArray[xPos];
                break;
            case 'arrow-right':
                if (xPos < xArray.length - 1) xPos++;
                else xPos = 0;
                direction = xArray[xPos];
                break;
            case 'arrow-down':
                if (yPos < yArray.length - 1) yPos++;
                else yPos = 0;
                direction = yArray[yPos];
                break;
            case 'arrow-up':
                if (yPos > 0) yPos--;
                else yPos = yArray.length - 1;
                direction = yArray[yPos];
                break;
            case 'home':
                direction = 'home';
                break;
            default:
                break;

        }
        setViewCubePosition(direction);
    });
});