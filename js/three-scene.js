// import * as THREE from "./three";

class ThreeScene {
    camera;
    renderer;
    scene;
    cube;
    lights = [];

    constructor(color, domElem, width, height) {
        this.scene = new THREE.Scene();

        this.initCamera(width, height);
        this.initLight();
        this.initCube(color);
        this.initRenderer(width, height);

        this.renderToDOM(domElem);
        this.renderer.render(this.scene, this.camera);
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

    animate = () => {
        requestAnimationFrame(this.animate);

        this.cube.rotation.x += 0.1;
        this.cube.rotation.y += 0.1;

        this.renderer.render(this.scene, this.camera);
    };

    rotateCube(x, y) {
        this.cube.rotation.x += y;
        this.cube.rotation.y += x;

        this.renderer.render(this.scene, this.camera);
    }

    zoomCamera(value) {
        this.camera.position.z *= value;
        this.renderer.render(this.scene, this.camera);
    }

    panCamera(lng, lat) {
        this.camera.position.x += lng/1000;
        this.camera.position.y += lat/1000;
        console.log('x', this.camera.position.x);
        this.renderer.render(this.scene, this.camera);
    }
}

// export default ThreeScene;