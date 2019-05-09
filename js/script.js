let cameraMode = false;

const modeSwitch = document.querySelector('#mode-switch');
const container = document.querySelector('#container');

// nav buttons
const topBtn = document.querySelector('#top');
const bottomBtn = document.querySelector('#bottom');
const leftBtn = document.querySelector('#left');
const rightBtn = document.querySelector('#right');

const newScene = new ThreeScene(0xFF0000, container,
    window.innerWidth - 10, window.innerHeight - 10);

modeSwitch.addEventListener('change', toggleMode);

let distance = {
    x: 0,
    y: 0
};
let prevPos;

let counter = 0;
topBtn.addEventListener('click', () => {
    console.log('set');
    newScene.setView('top');
});
bottomBtn.addEventListener('click', () => {
    console.log('set');
    newScene.setView('bottom');
});
leftBtn.addEventListener('click', () => {
    console.log('set');
    newScene.setView('left');
});
rightBtn.addEventListener('click', () => {
    console.log('set');
    newScene.setView('right');
});

addObjectTouchEventListeners();

function toggleMode() {
    cameraMode = !cameraMode;
    console.log(cameraMode ? 'camera mode on' : 'camera mode off');
    if (cameraMode) enableCameraMode();
    else enableObjectMode();
}

function enableCameraMode() {
    removeObjectTouchEventListeners();
    initCameraHandlers();
}

function enableObjectMode() {
    addObjectTouchEventListeners();
}

function addObjectTouchEventListeners() {
    // Handle object rotation!
    container.addEventListener("touchstart", onObjectTouch);
    container.addEventListener("touchend", resetObjectTouch);
}

function removeObjectTouchEventListeners() {
    container.removeEventListener('touchstart', onObjectTouch);
    container.removeEventListener('touchend', resetObjectTouch);
}

function onObjectTouch(e) {
    console.log(e);
    onTouchMove(e);

    container.ontouchmove = e => {
        onTouchMove(e);
    }
}

function resetObjectTouch() {
    container.ontouchmove = null;
    distance = {
        x: 0,
        y: 0
    };
    prevPos = null;
}


/**
 * Rotates cube on touch move event.
 *
 * @param e
 */
function onTouchMove(e) {
    const pos = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
    };
    console.log(pos);
    newScene.rotateCube(distance.x, distance.y);

    if (prevPos) {
        distance = {
            x: -(prevPos.x - pos.x) / 100,
            y: -(prevPos.y - pos.y) / 100
        };
    }

    prevPos = pos;
    console.log(distance);
}

function initCameraHandlers() {
    container.ontouchstart = onDocumentTouchStart;
    container.ontouchmove = onDocumentTouchMove;
    container.ontouchend = onDocumentTouchEnd;
}

let onPointerDownPointerX;
let onPointerDownPointerY;
let onPointerDownLon;
let onPointerDownLat;
let _state;
let _touchZoomDistanceEnd;
let _touchZoomDistanceStart;
let lon;
let lat;

function onDocumentTouchStart(event) {

    if (event.touches.length === 1) {

        console.log('1');
        event.preventDefault();


        onPointerDownPointerX = event.touches[0].pageX;
        onPointerDownPointerY = event.touches[0].pageY;

        onPointerDownLon = lon;
        onPointerDownLat = lat;

        // detectHotspotClick();

    }

    if (event.touches.length === 2) {

        console.log('2');
        // _state = STATE.TOUCH_ZOOM_PAN;
        let dx = event.touches[0].pageX - event.touches[1].pageX;
        let dy = event.touches[0].pageY - event.touches[1].pageY;
        _touchZoomDistanceEnd = _touchZoomDistanceStart = Math.sqrt(dx * dx + dy * dy);

    }

}

function onDocumentTouchMove(event) {

    if (event.touches.length === 1) {

        event.preventDefault();

        lon = (onPointerDownPointerX - event.touches[0].pageX) * 0.1; // + onPointerDownLon;
        lat = (event.touches[0].pageY - onPointerDownPointerY) * 0.1; // + onPointerDownLat;

        console.log(lon);
        // console.log(lat);
        newScene.panCamera(lon, lat);
    }

    if (event.touches.length === 2) {

        let dx = event.touches[0].pageX - event.touches[1].pageX;
        let dy = event.touches[0].pageY - event.touches[1].pageY;
        _touchZoomDistanceEnd = Math.sqrt(dx * dx + dy * dy);

        let factor = _touchZoomDistanceStart / _touchZoomDistanceEnd;
        _touchZoomDistanceStart = _touchZoomDistanceEnd;
        newScene.zoomCamera(factor);
    }

}

function onDocumentTouchEnd(event) {
    _touchZoomDistanceStart = _touchZoomDistanceEnd = 0;

}

/*
MULTI TOUCH
 */
// This is a very basic 2-touch move/pinch/zoom handler that does not include
// error handling, only handles horizontal moves, etc.
// function handle_pinch_zoom(ev) {
//
//     if (ev.targetTouches.length === 2 && ev.changedTouches.length === 2) {
//         // Check if the two target touches are the same ones that started
//         // the 2-touch
//         let point1 = -1, point2 = -1;
//         for (let i = 0; i < tpCache.length; i++) {
//             if (tpCache[i].identifier === ev.targetTouches[0].identifier) point1 = i;
//             if (tpCache[i].identifier === ev.targetTouches[1].identifier) point2 = i;
//         }
//         if (point1 >= 0 && point2 >= 0) {
//             // Calculate the difference between the start and move coordinates
//             let diff1 = Math.abs(tpCache[point1].clientX - ev.targetTouches[0].clientX);
//             let diff2 = Math.abs(tpCache[point2].clientX - ev.targetTouches[1].clientX);
//
//             // This threshold is device dependent as well as application specific
//             let PINCH_THRESHHOLD = ev.target.clientWidth / 10;
//             if (diff1 >= PINCH_THRESHHOLD && diff2 >= PINCH_THRESHHOLD)
//                 ev.target.style.background = "green";
//         } else {
//             // empty tpCache
//             tpCache = [];
//         }
//     }
// }


/*
container.addEventListener("mousedown", e => {
    onMouseMove(e);

    container.onmousemove = e => {
        onMouseMove(e);
    }
});

container.addEventListener("mouseup", () =>{
    container.onmousemove = null
});
*/
//container.addEventListener('click', () => {
//container.addEventListener('mousemove', e => {

//});
//});

function onMouseMove(e) {
    const pos = {
        x: e.pageX,
        y: e.pageY
    };
    console.log(pos);
    newScene.rotateCube(distance.x, distance.y);

    if (prevPos) {
        distance = {
            x: -(prevPos.x - pos.x) / 100,
            y: -(prevPos.y - pos.y) / 100
        };
    }

    prevPos = pos;
    console.log(distance);
}