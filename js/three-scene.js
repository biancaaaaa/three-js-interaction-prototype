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
        this.initPlane();
        this.initRenderer(width, height);

        this.renderToDOM(domElem);
        this.renderer.render(this.scene, this.camera);
        console.log(this.camera);
        // this.animate();
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
        //increase the steps to make squares bigger. must be divisible by the size
        const size = 20,
            steps = 2;

        const geometry = new THREE.Geometry();
        const material = new THREE.LineBasicMaterial({
            color: 'teal'
        });

        for (let i = -size; i <= size; i += steps) {
            //draw lines one way
            geometry.vertices.push(new THREE.Vector3(-size, -0.04, i));
            geometry.vertices.push(new THREE.Vector3(size, -0.04, i));

            //draw lines the other way
            geometry.vertices.push(new THREE.Vector3(i, -0.04, -size));
            geometry.vertices.push(new THREE.Vector3(i, -0.04, size));
        }

        //THREE.LinePieces prevents connecting of vertices
        const plane = new THREE.Line(geometry, material, THREE.LinePieces);

        this.scene.add(plane);
    }

    animate = () => {
        requestAnimationFrame(this.animate);
        const speed = Date.now() * 0.0005;

        // this.cube.rotation.x += 0.1;
        // this.cube.rotation.y += 0.1;

        this.camera.position.x = Math.sin(speed) * 10;
        this.camera.position.z = Math.cos(speed) * 10;
        console.log('y', this.camera.position.x);
        console.log('z', this.camera.position.z);
        this.camera.lookAt(this.scene.position);

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
        this.camera.position.x += lng / 1000;
        this.camera.position.y += lat / 1000;
        console.log('x', this.camera.position.x);
        this.renderer.render(this.scene, this.camera);
    }

    setView(dir) {
        // this.camera.position.y += 0.01;
        // TOP: z = 0, y = 10
        // BOTTOM: z = 0, y = -10
        // LEFT: z = 0, y = 10
        // RIGHT: z = 0, y = -10
        // FRONT: z = 0, y = 0
        switch(dir) {
            case 'top':
                this.camera.position.z = 0;
                this.camera.position.x = 0;
                this.camera.position.y = 10;
                break;
            case 'bottom':
                this.camera.position.z = 0;
                this.camera.position.x = 0;
                this.camera.position.y = -10;
                break;
            case 'left':
                this.camera.position.z = 0;
                this.camera.position.y = 0;
                this.camera.position.x = -10;
                break;
            case 'right':
                this.camera.position.z = 0;
                this.camera.position.y = 0;
                this.camera.position.x = 10;
                break;
            case 'front':
                this.camera.position.z = 5;
                this.camera.position.y = 0;
                this.camera.position.x = 0;
                break;
        }


        //this.camera.top = new THREE.Vector3(0,0,1);
        this.camera.lookAt(this.scene.position);
        this.renderer.render(this.scene, this.camera);
    }
}

// export default ThreeScene;