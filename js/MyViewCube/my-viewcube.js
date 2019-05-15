// inspired by https://codepen.io/XanderLuciano/pen/jwELMW

var domEl = document.getElementById('viewcube');
var scene = new THREE.Scene();

var fov = 75;
var aspect = 1;
var near = 0.1;
var far = 1000;
var camera = new THREE.OrthographicCamera(domEl.offsetWidth / -50, domEl.offsetWidth  / 50, domEl.offsetHeight  / 50, domEl.offsetHeight  / -50, near, far); //(fov, aspect, near, far);
camera.position.set(0, 0, 5);

var light = new THREE.HemisphereLight(0xffffff, 0x666666, 2.75);
light.position.set(0, 10, 10);
scene.add(light);

var renderer = new THREE.WebGLRenderer({antialias: 1, alpha: 1});
renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
renderer.setSize(200, 200);
domEl.appendChild(renderer.domElement);

// Viewcube Factory
FaceFactory = function (size, color) {
    var scope = this;

    this.genFace = function (position, rotation, faceDesc) {
        var geo = new THREE.PlaneBufferGeometry(size * 0.70, size * 0.70);
        var midpoint = position.multiplyScalar(size);
        var mat = new THREE.MeshPhongMaterial({
            color: color,
            map: new THREE.TextureLoader().load('/js/MyViewCube/img/' + faceDesc + '.png'),
            //side: THREE.DoubleSide,
            transparent: true,
            opacity: .75
        });
        var face = new THREE.Mesh(geo, mat);
        face.position.set(midpoint.x, midpoint.y, midpoint.z);
        face.rotation.set(rotation.x, rotation.y, rotation.z);
        face.name = faceDesc;
        return face;
    };

    this.genCorner = function (p1, p2, p3, desc) {
        var v1 = p1.multiplyScalar(size);
        var v2 = p2.multiplyScalar(size);
        var v3 = p3.multiplyScalar(size);

        var geo = new THREE.BufferGeometry();
        var verts = new Float32Array([
            v1.x, v1.y, v1.z,
            v2.x, v2.y, v2.z,
            v3.x, v3.y, v3.z,
        ]);
        geo.addAttribute('position', new THREE.BufferAttribute(verts, 3));
        geo.computeVertexNormals();
        geo.computeFaceNormals();
        var mat = new THREE.MeshBasicMaterial({
            color: color,
            //side: THREE.DoubleSide,
            transparent: true,
            opacity: .75
        });
        var corner = new THREE.Mesh(geo, mat);
        corner.name = desc;
        return corner;
    };

    this.genEdge = function (p1, p2, p3, p4, desc) {
        var v1 = p1.multiplyScalar(size);
        var v2 = p2.multiplyScalar(size);
        var v3 = p3.multiplyScalar(size);
        var v4 = p4.multiplyScalar(size);

        var geo = new THREE.BufferGeometry();
        var verts = new Float32Array([
            v1.x, v1.y, v1.z,
            v2.x, v2.y, v2.z,
            v3.x, v3.y, v3.z,

            v1.x, v1.y, v1.z,
            v3.x, v3.y, v3.z,
            v4.x, v4.y, v4.z,
        ]);
        geo.addAttribute('position', new THREE.BufferAttribute(verts, 3));
        geo.computeVertexNormals();
        geo.computeFaceNormals();
        var mat = new THREE.MeshBasicMaterial({
            color: color,
            //side: THREE.DoubleSide,
            transparent: true,
            opacity: .75
        });
        var edge = new THREE.Mesh(geo, mat);
        edge.name = desc;
        return edge;
    };

    this.genOutline = function () {
        var geo = new THREE.Geometry();
        geo.vertices.push(
            // Along +Y
            new THREE.Vector3(-.50, 0.35, 0.35),
            new THREE.Vector3(-.35, 0.35, 0.50),
            new THREE.Vector3(-.35, 0.35, 0.50),
            new THREE.Vector3(0.35, 0.35, 0.50),
            new THREE.Vector3(0.35, 0.35, 0.50),
            new THREE.Vector3(0.50, 0.35, 0.35),
            new THREE.Vector3(0.50, 0.35, 0.35),
            new THREE.Vector3(0.50, 0.35, -.35),
            new THREE.Vector3(0.50, 0.35, -.35),
            new THREE.Vector3(0.35, 0.35, -.50),
            new THREE.Vector3(0.35, 0.35, -.50),
            new THREE.Vector3(-.35, 0.35, -.50),
            new THREE.Vector3(-.35, 0.35, -.50),
            new THREE.Vector3(-.50, 0.35, -.35),
            new THREE.Vector3(-.50, 0.35, -.35),
            new THREE.Vector3(-.50, 0.35, 0.35),

            // Along -Y
            new THREE.Vector3(-.50, -.35, 0.35),
            new THREE.Vector3(-.35, -.35, 0.50),
            new THREE.Vector3(-.35, -.35, 0.50),
            new THREE.Vector3(0.35, -.35, 0.50),
            new THREE.Vector3(0.35, -.35, 0.50),
            new THREE.Vector3(0.50, -.35, 0.35),
            new THREE.Vector3(0.50, -.35, 0.35),
            new THREE.Vector3(0.50, -.35, -.35),
            new THREE.Vector3(0.50, -.35, -.35),
            new THREE.Vector3(0.35, -.35, -.50),
            new THREE.Vector3(0.35, -.35, -.50),
            new THREE.Vector3(-.35, -.35, -.50),
            new THREE.Vector3(-.35, -.35, -.50),
            new THREE.Vector3(-.50, -.35, -.35),
            new THREE.Vector3(-.50, -.35, -.35),
            new THREE.Vector3(-.50, -.35, 0.35),

            // Along +Z
            new THREE.Vector3(-.50, 0.35, 0.35),
            new THREE.Vector3(-.35, 0.50, 0.35),
            new THREE.Vector3(-.35, 0.50, 0.35),
            new THREE.Vector3(0.35, 0.50, 0.35),
            new THREE.Vector3(0.35, 0.50, 0.35),
            new THREE.Vector3(0.50, 0.35, 0.35),
            new THREE.Vector3(0.50, 0.35, 0.35),
            new THREE.Vector3(0.50, -.35, 0.35),
            new THREE.Vector3(0.50, -.35, 0.35),
            new THREE.Vector3(0.35, -.50, 0.35),
            new THREE.Vector3(0.35, -.50, 0.35),
            new THREE.Vector3(-.35, -.50, 0.35),
            new THREE.Vector3(-.35, -.50, 0.35),
            new THREE.Vector3(-.50, -.35, 0.35),
            new THREE.Vector3(-.50, -.35, 0.35),
            new THREE.Vector3(-.50, 0.35, 0.35),

            // Along -Z
            new THREE.Vector3(-.50, 0.35, -.35),
            new THREE.Vector3(-.35, 0.50, -.35),
            new THREE.Vector3(-.35, 0.50, -.35),
            new THREE.Vector3(0.35, 0.50, -.35),
            new THREE.Vector3(0.35, 0.50, -.35),
            new THREE.Vector3(0.50, 0.35, -.35),
            new THREE.Vector3(0.50, 0.35, -.35),
            new THREE.Vector3(0.50, -.35, -.35),
            new THREE.Vector3(0.50, -.35, -.35),
            new THREE.Vector3(0.35, -.50, -.35),
            new THREE.Vector3(0.35, -.50, -.35),
            new THREE.Vector3(-.35, -.50, -.35),
            new THREE.Vector3(-.35, -.50, -.35),
            new THREE.Vector3(-.50, -.35, -.35),
            new THREE.Vector3(-.50, -.35, -.35),
            new THREE.Vector3(-.50, 0.35, -.35),

            // Along +X
            new THREE.Vector3(0.35, -.50, 0.35),
            new THREE.Vector3(0.35, -.35, 0.50),
            new THREE.Vector3(0.35, -.35, 0.50),
            new THREE.Vector3(0.35, 0.35, 0.50),
            new THREE.Vector3(0.35, 0.35, 0.50),
            new THREE.Vector3(0.35, 0.50, 0.35),
            new THREE.Vector3(0.35, 0.50, 0.35),
            new THREE.Vector3(0.35, 0.50, -.35),
            new THREE.Vector3(0.35, 0.50, -.35),
            new THREE.Vector3(0.35, 0.35, -.50),
            new THREE.Vector3(0.35, 0.35, -.50),
            new THREE.Vector3(0.35, -.35, -.50),
            new THREE.Vector3(0.35, -.35, -.50),
            new THREE.Vector3(0.35, -.50, -.35),
            new THREE.Vector3(0.35, -.50, -.35),
            new THREE.Vector3(0.35, -.50, 0.35),

            // Along -X
            new THREE.Vector3(-.35, -.50, 0.35),
            new THREE.Vector3(-.35, -.35, 0.50),
            new THREE.Vector3(-.35, -.35, 0.50),
            new THREE.Vector3(-.35, 0.35, 0.50),
            new THREE.Vector3(-.35, 0.35, 0.50),
            new THREE.Vector3(-.35, 0.50, 0.35),
            new THREE.Vector3(-.35, 0.50, 0.35),
            new THREE.Vector3(-.35, 0.50, -.35),
            new THREE.Vector3(-.35, 0.50, -.35),
            new THREE.Vector3(-.35, 0.35, -.50),
            new THREE.Vector3(-.35, 0.35, -.50),
            new THREE.Vector3(-.35, -.35, -.50),
            new THREE.Vector3(-.35, -.35, -.50),
            new THREE.Vector3(-.35, -.50, -.35),
            new THREE.Vector3(-.35, -.50, -.35),
            new THREE.Vector3(-.35, -.50, 0.35),
        );
        for (var i = 0, j = geo.vertices.length; i < j; i++) {
            geo.vertices[i].multiplyScalar(size);
        }
        var mat = new THREE.LineBasicMaterial({
            color: 0x3e3e3e
        });
        return new THREE.LineSegments(geo, mat);
    }
};
FaceFactory.prototype.constructor = FaceFactory;

var domEvents = new THREEx.DomEvents(camera, renderer.domElement);

var cubeSize = 3;

var viewcube = new THREE.Object3D();
var vc = new THREE.Object3D();
var faces = new FaceFactory(cubeSize, new THREE.Color(0x2196f3));

// ViewCube Faces
var front = faces.genFace(new THREE.Vector3(0, 0, 0.50), new THREE.Vector3(0, 0, 0), 'front');
vc.add(front);
var back = faces.genFace(new THREE.Vector3(0, 0, -.50), new THREE.Vector3(0, -180 * Math.PI / 180, 0), 'back');
vc.add(back);
var right = faces.genFace(new THREE.Vector3(0.50, 0, 0), new THREE.Vector3(0, 90 * Math.PI / 180, 0), 'right');
vc.add(right);
var left = faces.genFace(new THREE.Vector3(-.50, 0, 0), new THREE.Vector3(0, -90 * Math.PI / 180, 0), 'left');
vc.add(left);
var ftop = faces.genFace(new THREE.Vector3(0, 0.50, 0), new THREE.Vector3(-90 * Math.PI / 180, 0, 0), 'top');
vc.add(ftop);
var bottom = faces.genFace(new THREE.Vector3(0, -.50, 0), new THREE.Vector3(90 * Math.PI / 180, 0, 0), 'bottom');
vc.add(bottom);

// ViewCube Corners
var c_FRT = faces.genCorner(new THREE.Vector3(0.50, 0.35, 0.35), new THREE.Vector3(0.35, 0.50, 0.35), new THREE.Vector3(0.35, 0.35, 0.50), 'frt');
vc.add(c_FRT);
var c_FLT = faces.genCorner(new THREE.Vector3(-.35, 0.35, 0.50), new THREE.Vector3(-.35, 0.50, 0.35), new THREE.Vector3(-.50, 0.35, 0.35), 'flt');
vc.add(c_FLT);
var c_BRT = faces.genCorner(new THREE.Vector3(0.35, 0.35, -.50), new THREE.Vector3(0.35, 0.50, -.35), new THREE.Vector3(0.50, 0.35, -.35), 'brt');
vc.add(c_BRT);
var c_BLT = faces.genCorner(new THREE.Vector3(-.50, 0.35, -.35), new THREE.Vector3(-.35, 0.50, -.35), new THREE.Vector3(-.35, 0.35, -.50), 'blt');
vc.add(c_BLT);
var c_FRB = faces.genCorner(new THREE.Vector3(0.35, -.35, 0.50), new THREE.Vector3(0.35, -.50, 0.35), new THREE.Vector3(0.50, -.35, 0.35), 'frb');
vc.add(c_FRB);
var c_FLB = faces.genCorner(new THREE.Vector3(-.50, -.35, 0.35), new THREE.Vector3(-.35, -.50, 0.35), new THREE.Vector3(-.35, -.35, 0.50), 'flb');
vc.add(c_FLB);
var c_BRB = faces.genCorner(new THREE.Vector3(0.50, -.35, -.35), new THREE.Vector3(0.35, -.50, -.35), new THREE.Vector3(0.35, -.35, -.50), 'brb');
vc.add(c_BRB);
var c_BLB = faces.genCorner(new THREE.Vector3(-.35, -.35, -.50), new THREE.Vector3(-.35, -.50, -.35), new THREE.Vector3(-.50, -.35, -.35), 'blb');
vc.add(c_BLB);

// ViewCube Edges
// Top
var e_RT = faces.genEdge(new THREE.Vector3(0.35, 0.50, 0.35), new THREE.Vector3(0.50, 0.35, 0.35), new THREE.Vector3(0.50, 0.35, -.35), new THREE.Vector3(0.35, 0.50, -.35), 'rt');
vc.add(e_RT);
var e_LT = faces.genEdge(new THREE.Vector3(-.35, 0.50, -.35), new THREE.Vector3(-.50, 0.35, -.35), new THREE.Vector3(-.50, 0.35, 0.35), new THREE.Vector3(-.35, 0.50, 0.35), 'lt');
vc.add(e_LT);
var e_FT = faces.genEdge(new THREE.Vector3(-.35, 0.35, 0.50), new THREE.Vector3(0.35, 0.35, 0.50), new THREE.Vector3(0.35, 0.50, 0.35), new THREE.Vector3(-.35, 0.50, 0.35), 'ft');
vc.add(e_FT);
var e_BT = faces.genEdge(new THREE.Vector3(-.35, 0.50, -.35), new THREE.Vector3(0.35, 0.50, -.35), new THREE.Vector3(0.35, 0.35, -.50), new THREE.Vector3(-.35, 0.35, -.50), 'bt');
vc.add(e_BT);

// Mid
var e_FR = faces.genEdge(new THREE.Vector3(0.35, -.35, 0.50), new THREE.Vector3(0.50, -.35, 0.35), new THREE.Vector3(0.50, 0.35, 0.35), new THREE.Vector3(0.35, 0.35, 0.50), 'fr');
vc.add(e_FR);
var e_FL = faces.genEdge(new THREE.Vector3(-.35, 0.35, 0.50), new THREE.Vector3(-.50, 0.35, 0.35), new THREE.Vector3(-.50, -.35, 0.35), new THREE.Vector3(-.35, -.35, 0.50), 'fl');
vc.add(e_FL);
var e_BR = faces.genEdge(new THREE.Vector3(0.35, 0.35, -.50), new THREE.Vector3(0.50, 0.35, -.35), new THREE.Vector3(0.50, -.35, -.35), new THREE.Vector3(0.35, -.35, -.50), 'br');
vc.add(e_BR);
var e_BL = faces.genEdge(new THREE.Vector3(-.35, -.35, -.50), new THREE.Vector3(-.50, -.35, -.35), new THREE.Vector3(-.50, 0.35, -.35), new THREE.Vector3(-.35, 0.35, -.50), 'bl');
vc.add(e_BL);

// Bottom
var e_RB = faces.genEdge(new THREE.Vector3(0.35, -.50, -.35), new THREE.Vector3(0.50, -.35, -.35), new THREE.Vector3(0.50, -.35, 0.35), new THREE.Vector3(0.35, -.50, 0.35), 'rb');
vc.add(e_RB);
var e_LB = faces.genEdge(new THREE.Vector3(-.35, -.50, 0.35), new THREE.Vector3(-.50, -.35, 0.35), new THREE.Vector3(-.50, -.35, -.35), new THREE.Vector3(-.35, -.50, -.35), 'lb');
vc.add(e_LB);
var e_FB = faces.genEdge(new THREE.Vector3(-.35, -.50, 0.35), new THREE.Vector3(0.35, -.50, 0.35), new THREE.Vector3(0.35, -.35, 0.50), new THREE.Vector3(-.35, -.35, 0.50), 'fb');
vc.add(e_FB);
var e_BB = faces.genEdge(new THREE.Vector3(-.35, -.35, -.50), new THREE.Vector3(0.35, -.35, -.50), new THREE.Vector3(0.35, -.50, -.35), new THREE.Vector3(-.35, -.50, -.35), 'bb');
vc.add(e_BB);

// ViewCube Outline
var outline = faces.genOutline();
viewcube.add(outline);
viewcube.add(vc);

// viewcube.rotation.x = 45 * Math.PI / 180;

scene.add(viewcube);

// EVENT LISTENERS FACES
for (var i = 0, j = vc.children.length; i < j; i++) {
    domEvents.addEventListener(vc.children[i], 'mouseover', function (e) {
        e.target.material.color = new THREE.Color(0x64B5F6);
        e.target.material.opacity = .8;
    });
    domEvents.addEventListener(vc.children[i], 'mouseout', function (e) {
        // console.log(e.target);
        e.target.material.color = new THREE.Color(0x2196f3);
        e.target.material.opacity = .75;
    });
    domEvents.addEventListener(vc.children[i], 'mousedown', function (e) {
        // newScene.setView(e.target.name);
        console.log(e.target.name);
        setupTween(new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z), camDirections[e.target.name], 600, e.target.name);
    });
    domEvents.addEventListener(vc.children[i], 'touchstart', function (e) {
        // newScene.setView(e.target.name);
        setupTween(new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z), camDirections[e.target.name], 600, e.target.name);
    });
}


// Render event loop
function render() {
    requestAnimationFrame(render);
    TWEEN.update();
    renderer.render(scene, camera);
}

render();


var camDirections = {
    top: new THREE.Vector3(0, 10, 0),
    bottom: new THREE.Vector3(0, -10, 0),
    left: new THREE.Vector3(-10, 0, 5),
    right: new THREE.Vector3(25, 0, 5),
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

// camera.position.set(camDirections.home);
// camera.lookAt(scene.position);
// renderer.render(scene, camera);
// setupTween({...camera.position}, camDirections.home, 600, 'home');

function setViewCubePosition(direction) {
    setupTween(new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z), camDirections[direction], 600, direction);
}

function setupTween(position, target, duration, direction) {
    // TWEEN.removeAll();    // remove previous tweens if needed
    var tween = new TWEEN.Tween(position)
        .to(target, duration)
        .easing(TWEEN.Easing.Linear.None)
        .onStart(function () {
            newScene.setView(direction);
        })
        .onUpdate(function () {
            camera.position.copy(position);
            camera.lookAt(scene.position);
            renderer.render(scene, camera);

        });
    tween.start();
}