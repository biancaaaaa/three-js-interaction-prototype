class ThreeScene {
    camera;
    renderer;
    scene;
    cube;
    lights = [];
    animationInterval;
    orbitControls;
    transformControls;
    transformMode = false;
    domEvents;
    mixers = [];

    constructor(color, domElem, width, height) {
        this.scene = new THREE.Scene();

        this.initCamera(width, height);
        this.initLight();
        this.initCube(color);
        this.initPlane();
        this.initRenderer(width, height);
        this.initDOMEvents();
        this.initEventListeners();
        this.initOrbitController();
        this.initTransformController();
        this.renderToDOM(domElem);
        this.renderer.render(this.scene, this.camera);
        // events
        // THREEx.WindowResize(this.renderer, this.camera);
        this.animate();
    }

    initEventListeners() {
        this.domEvents.addEventListener(this.cube, 'mouseover', () => {
            this.cube.material.color.set(0xa90202);
        });

        this.domEvents.addEventListener(this.cube, 'mouseout', () => {
            this.cube.material.color.set(0xFF0000);
        });

        this.domEvents.addEventListener(this.cube, 'mousedown', this.switchToRotationMode);
        this.domEvents.addEventListener(this.cube, 'touchstart', this.switchToRotationMode);
    }

    switchToRotationMode() {
        if (this.transformMode)
            this.transformControls.detach(this.cube);
        else
            this.transformControls.attach(this.cube);

        this.transformMode = !this.transformMode;
        console.log('hi');
    }

    initDOMEvents() {
        this.domEvents = new THREEx.DomEvents(this.camera, this.renderer.domElement);
    }

    initOrbitController() {
        this.orbitControls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    }

    initTransformController() {
        this.transformControls = new THREE.TransformControls(this.camera, this.renderer.domElement);
        this.transformControls.addEventListener('change', () =>
            this.renderer.render(this.scene, this.camera));
        this.transformControls.setMode('rotate');
        this.transformControls.addEventListener('dragging-changed', event => {
            this.orbitControls.enabled = !event.value;
        });
        this.scene.add(this.transformControls);
    }

    initLight() {
        this.lights[0] = new THREE.PointLight(0xffffff, 1, 0);
        this.lights[1] = new THREE.PointLight(0xffffff, 1, 0);
        this.lights[2] = new THREE.PointLight(0xffffff, 1, 0);

        this.lights[0].position.set(0, 200, 0);
        this.lights[1].position.set(100, 200, 100);
        this.lights[2].position.set(-100, -200, -100);

        this.scene.add(this.lights[0]);
        this.scene.add(this.lights[1]);
        this.scene.add(this.lights[2]);
    }

    initRenderer(width, height) {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(width, height);
    }

    renderToDOM(domElem) {
        domElem.appendChild(this.renderer.domElement);
    }

    initCamera(width, height) {
        const FOV = 45,
            ASPECT = width / height,
            NEAR = 0.1,
            FAR = 2000;
        this.camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);
        this.camera.position.z = 5;
    }

    initCube(color) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshLambertMaterial({color: color});
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);
    }

    initPlane() {
        this.scene.add(new THREE.GridHelper(10, 20));
    }

    animate = () => {
        requestAnimationFrame(this.animate);
        // console.log(this.camera.position);
        //const speed = Date.now() * 0.0005;

        // this.cube.rotation.x += 0.1;
        // this.cube.rotation.y += 0.1;

        //this.camera.position.x = Math.sin(speed) * 10;
        //this.camera.position.z = Math.cos(speed) * 10;
        //console.log('y', this.camera.position.x);
        //console.log('z', this.camera.position.z);
        //this.camera.lookAt(this.scene.position);
        this.orbitControls.update();
        this.renderer.render(this.scene, this.camera);
    };

    rotateCube(x, y) {
        this.cube.rotation.x += y;
        this.cube.rotation.y += x;

        this.renderer.render(this.scene, this.camera);
    }

    moveCamera(endPos, startPos) {
        // console.log(startPos);
        console.log(this.camera.position);
        if (this.equalsEndPosition(endPos)) {
            clearInterval(this.animationInterval);
            this.animationInterval = null;
        } else {
            // console.log(this.camera.position);
            this.changePos('x', startPos, endPos);
            this.changePos('y', startPos, endPos);
            this.changePos('z', startPos, endPos);
            this.camera.lookAt(this.scene.position);
            this.renderer.render(this.scene, this.camera);
        }
    }

    changePos(coord, startPos, endPos) {
        if (!this.equalsEndCoord(coord, startPos, endPos)) {
            if (this.isSmallerEnd(coord, startPos, endPos)) {
                if (this.camera.position[coord] < endPos[coord])
                    this.camera.position[coord] = Number(this.camera.position[coord].toFixed(1)) + 0.1;
            } else {
                if (this.camera.position[coord] > endPos[coord])
                    this.camera.position[coord] = Number(this.camera.position[coord].toFixed(1)) - 0.1;
            }
        }
    }

    equalsEndCoord(coord, startPos, endPos) {
        return startPos[coord] === endPos[coord];
    }

    isSmallerEnd(coord, startPos, endPos) {
        return startPos[coord] < endPos[coord];
    }

    equalsEndPosition(endPos) {
        return endPos.x === this.camera.position.x &&
            endPos.y === this.camera.position.y &&
            endPos.z === this.camera.position.z;
    }

    setView(dir) {
        if (this.animationInterval) return;
        let endPos;

        switch (dir) {
            case 'top':
                endPos = {x: 0, y: 10, z: 0};
                break;
            case 'bottom':
                endPos = {x: 0, y: -10, z: 0};
                break;
            case 'left':
                endPos = {x: -10, y: 0, z: 0};
                break;
            case 'right':
                endPos = {x: 10, y: 0, z: 0};
                break;
            case 'front':
                endPos = {x: 0, y: 0, z: 5};
                break;
            // case 'back':
            //     endPos = {x: 0, y: 20, z: 0};
            //     break;
            default:
                endPos = {x: 0, y: 0, z: 5};
                break;
        }

        // console.log(endPos);
        const startPos = {...this.camera.position};

        this.animationInterval = setInterval(() =>
            this.moveCamera(endPos, startPos), 10);

    }
}