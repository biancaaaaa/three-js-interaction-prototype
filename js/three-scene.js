class ThreeScene {
    camera;
    renderer;
    scene;
    cube;
    lights = [];
    orbitControls;
    transformControls;
    transformMode = false;
    domEvents;
    exitBtn = document.getElementById('exit-rotation');

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
        this.animate();
    }

    initEventListeners() {
        this.domEvents.addEventListener(this.cube, 'mouseover', () => {
            this.cube.material.color.set(0x1f74bf);
        });

        this.domEvents.addEventListener(this.cube, 'mouseout', () => {
            this.cube.material.color.set(0x2d99f9);
        });

        this.domEvents.addEventListener(this.cube, 'mousedown', this.switchToRotationMode);
        this.domEvents.addEventListener(this.cube, 'touchstart', this.switchToRotationMode);
        // this.domEvents.addEventListener(this.scene, 'mousedown', this.exitRotationMode);
        this.exitBtn.addEventListener('mousedown', this.exitRotationMode);
    }

    switchToRotationMode = () => {
        if (!this.transformControls) this.initTransformController();
        this.transformControls.attach(this.cube);
        this.exitBtn.style.display = 'block';
        this.transformMode = true;
    };

    exitRotationMode = () => {
        this.transformControls.detach(this.cube);
        this.transformMode = false;
        this.exitBtn.style.display = 'none';
    };

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
        this.camera.position.y = 5;
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
        this.orbitControls.update();
        this.renderer.render(this.scene, this.camera);
        TWEEN.update();
    };

    setView(dir) {
        const camDirections = {
            top: new THREE.Vector3(0, 10, 0),
            bottom: new THREE.Vector3(0, -10, 0),
            left: new THREE.Vector3(-10, 0, 0),
            right: new THREE.Vector3(10, 0, 0),
            front: new THREE.Vector3(0, 0, 5),
            back: new THREE.Vector3(0, 0, -10),
            home: new THREE.Vector3(0, 5, 5),
            // CORNERS
            frt: new THREE.Vector3(2, 2, 2), // front right top
            flt: new THREE.Vector3(-2, 2, 2), // front left top
            brt: new THREE.Vector3(2, 2, -2), // back right top
            blt: new THREE.Vector3(-2, 2, -2), // back left top
            frb: new THREE.Vector3(2, -2, 2), // front right bottom
            flb: new THREE.Vector3(-2, -2, 2), // front left bottom
            brb: new THREE.Vector3(2, -2, -2), // back right bottom
            blb: new THREE.Vector3(-2, -2, -2), // back left bottom
            // EDGES
            // top
            rt: new THREE.Vector3(5, 2, 0), // right top
            lt: new THREE.Vector3(-5, 2, 0), // left top
            ft: new THREE.Vector3(0, 2, 5), // front top
            bt: new THREE.Vector3(0, 2, -5), // back top
            // mid
            fr: new THREE.Vector3(2, 0, 2), // front right
            fl: new THREE.Vector3(-2, 0, 2), // front left
            br: new THREE.Vector3(2, 0, -2), // back right
            bl: new THREE.Vector3(-2, 0, -2), // back left
            // bottom
            rb: new THREE.Vector3(5, -2, 0), // right bottom
            lb: new THREE.Vector3(-5, -2, 0), // left bottom
            fb: new THREE.Vector3(0, -2, 5), // front bottom
            bb: new THREE.Vector3(0, -2, -5), // back bottom
        };

        // console.log(endPos);
        const startPos = {...this.camera.position};

        // create the tween
        this.setupTween(new THREE.Vector3(startPos.x, startPos.y, startPos.z),
            camDirections[dir], 600);

    }

    setupTween(position, target, duration) {
        const tween = new TWEEN.Tween(position)
            .to(target, duration)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(
                () => {
                    this.camera.position.copy(position);
                    this.camera.lookAt(this.scene.position);
                    this.renderer.render(this.scene, this.camera);
                    this.orbitControls.update();

                })
            .onComplete(
                () => {
                    this.orbitControls.target.copy(this.scene.position);
                }
            );
        tween.start();
    }
}