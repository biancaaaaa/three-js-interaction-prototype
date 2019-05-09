const cube = document.querySelector('.cube');
let currentClass = '';
const controls = document.querySelectorAll('.control');
const xArray = ['show-front', 'show-right', 'show-back', 'show-left'];
const yArray = ['show-front', 'show-top', 'show-back', 'show-bottom'];
let xPos = 0;
let yPos = 0;

for (let i = 0; i < controls.length; i++)
    controls[i].addEventListener('click', e => {
        console.log(e.target.id);
        let showClass = '';
        switch (e.target.id) {
            case 'arrow-left':
                if (xPos > 0) xPos--;
                else xPos = xArray.length-1;
                showClass = xArray[xPos];
                break;
            case 'arrow-right':
                if (xPos < xArray.length-1) xPos++;
                else xPos = 0;
                showClass = xArray[xPos];
                break;
            case 'arrow-down':
                if (yPos < yArray.length-1) yPos++;
                else yPos = 0;
                showClass = yArray[yPos];
                break;
            case 'arrow-up':
                if (yPos > 0) yPos--;
                else yPos = yArray.length-1;
                showClass = yArray[yPos];
                break;

        }
        console.log(yPos, xPos);
        if (currentClass) cube.classList.remove(currentClass);
        cube.classList.add(showClass);
        console.log(showClass);
        newScene.setView(showClass.substring(5));
        currentClass = showClass;

    });