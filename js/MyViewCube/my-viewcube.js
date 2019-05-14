// inspired by https://codepen.io/XanderLuciano/pen/jwELMW

var domEl = document.getElementById('viewcube');
console.log(domEl);
var scene = new THREE.Scene();

var fov = 75;
var aspect = 1;
var near = 0.1;
var far = 1000;
var camera = new THREE.OrthographicCamera(domEl.offsetWidth / -50, domEl.offsetWidth  / 50, domEl.offsetHeight  / 50, domEl.offsetHeight  / -50, near, far); //(fov, aspect, near, far);
//new THREE.OrthographicCamera( window.innerWidth / - 50, window.innerWidth / 50, window.innerHeight / 50, window.innerHeight / -50, - 500, 1000);
camera.position.setZ(5);

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
        var mat = new THREE.MeshBasicMaterial({
            color: color,
            //side: THREE.DoubleSide,
            transparent: true,
            opacity: .75
        });
        var face = new THREE.Mesh(geo, mat);
        face.position.set(midpoint.x, midpoint.y, midpoint.z);
        face.rotation.set(rotation.x, rotation.y, rotation.z);
        face.name = faceDesc;
        return face;
    }

    this.genCorner = function (p1, p2, p3) {
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
        return new THREE.Mesh(geo, mat);
    }

    this.genEdge = function (p1, p2, p3, p4) {
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
        return new THREE.Mesh(geo, mat);
    }

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
}
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
var c_FRT = faces.genCorner(new THREE.Vector3(0.50, 0.35, 0.35), new THREE.Vector3(0.35, 0.50, 0.35), new THREE.Vector3(0.35, 0.35, 0.50));
vc.add(c_FRT);
var c_FLT = faces.genCorner(new THREE.Vector3(-.35, 0.35, 0.50), new THREE.Vector3(-.35, 0.50, 0.35), new THREE.Vector3(-.50, 0.35, 0.35));
vc.add(c_FLT);
var c_BRT = faces.genCorner(new THREE.Vector3(0.35, 0.35, -.50), new THREE.Vector3(0.35, 0.50, -.35), new THREE.Vector3(0.50, 0.35, -.35));
vc.add(c_BRT);
var c_BLT = faces.genCorner(new THREE.Vector3(-.50, 0.35, -.35), new THREE.Vector3(-.35, 0.50, -.35), new THREE.Vector3(-.35, 0.35, -.50));
vc.add(c_BLT);
var c_FRB = faces.genCorner(new THREE.Vector3(0.35, -.35, 0.50), new THREE.Vector3(0.35, -.50, 0.35), new THREE.Vector3(0.50, -.35, 0.35));
vc.add(c_FRB);
var c_FLB = faces.genCorner(new THREE.Vector3(-.50, -.35, 0.35), new THREE.Vector3(-.35, -.50, 0.35), new THREE.Vector3(-.35, -.35, 0.50));
vc.add(c_FLB);
var c_BRB = faces.genCorner(new THREE.Vector3(0.50, -.35, -.35), new THREE.Vector3(0.35, -.50, -.35), new THREE.Vector3(0.35, -.35, -.50));
vc.add(c_BRB);
var c_BLB = faces.genCorner(new THREE.Vector3(-.35, -.35, -.50), new THREE.Vector3(-.35, -.50, -.35), new THREE.Vector3(-.50, -.35, -.35));
vc.add(c_BLB);

// ViewCube Edges
// Top
var e_RT = faces.genEdge(new THREE.Vector3(0.35, 0.50, 0.35), new THREE.Vector3(0.50, 0.35, 0.35), new THREE.Vector3(0.50, 0.35, -.35), new THREE.Vector3(0.35, 0.50, -.35));
vc.add(e_RT);
var e_LT = faces.genEdge(new THREE.Vector3(-.35, 0.50, -.35), new THREE.Vector3(-.50, 0.35, -.35), new THREE.Vector3(-.50, 0.35, 0.35), new THREE.Vector3(-.35, 0.50, 0.35));
vc.add(e_LT);
var e_FT = faces.genEdge(new THREE.Vector3(-.35, 0.35, 0.50), new THREE.Vector3(0.35, 0.35, 0.50), new THREE.Vector3(0.35, 0.50, 0.35), new THREE.Vector3(-.35, 0.50, 0.35));
vc.add(e_FT);
var e_BT = faces.genEdge(new THREE.Vector3(-.35, 0.50, -.35), new THREE.Vector3(0.35, 0.50, -.35), new THREE.Vector3(0.35, 0.35, -.50), new THREE.Vector3(-.35, 0.35, -.50));
vc.add(e_BT);

// Mid
var e_FR = faces.genEdge(new THREE.Vector3(0.35, -.35, 0.50), new THREE.Vector3(0.50, -.35, 0.35), new THREE.Vector3(0.50, 0.35, 0.35), new THREE.Vector3(0.35, 0.35, 0.50));
vc.add(e_FR);
var e_FL = faces.genEdge(new THREE.Vector3(-.35, 0.35, 0.50), new THREE.Vector3(-.50, 0.35, 0.35), new THREE.Vector3(-.50, -.35, 0.35), new THREE.Vector3(-.35, -.35, 0.50));
vc.add(e_FL);
var e_BR = faces.genEdge(new THREE.Vector3(0.35, 0.35, -.50), new THREE.Vector3(0.50, 0.35, -.35), new THREE.Vector3(0.50, -.35, -.35), new THREE.Vector3(0.35, -.35, -.50));
vc.add(e_BR);
var e_BL = faces.genEdge(new THREE.Vector3(-.35, -.35, -.50), new THREE.Vector3(-.50, -.35, -.35), new THREE.Vector3(-.50, 0.35, -.35), new THREE.Vector3(-.35, 0.35, -.50));
vc.add(e_BL);

// Bottom
var e_RB = faces.genEdge(new THREE.Vector3(0.35, -.50, -.35), new THREE.Vector3(0.50, -.35, -.35), new THREE.Vector3(0.50, -.35, 0.35), new THREE.Vector3(0.35, -.50, 0.35));
vc.add(e_RB);
var e_LB = faces.genEdge(new THREE.Vector3(-.35, -.50, 0.35), new THREE.Vector3(-.50, -.35, 0.35), new THREE.Vector3(-.50, -.35, -.35), new THREE.Vector3(-.35, -.50, -.35));
vc.add(e_LB);
var e_FB = faces.genEdge(new THREE.Vector3(-.35, -.50, 0.35), new THREE.Vector3(0.35, -.50, 0.35), new THREE.Vector3(0.35, -.35, 0.50), new THREE.Vector3(-.35, -.35, 0.50));
vc.add(e_FB);
var e_BB = faces.genEdge(new THREE.Vector3(-.35, -.35, -.50), new THREE.Vector3(0.35, -.35, -.50), new THREE.Vector3(0.35, -.50, -.35), new THREE.Vector3(-.35, -.50, -.35));
vc.add(e_BB);

// ViewCube Outline
var outline = faces.genOutline();
viewcube.add(outline);
viewcube.add(vc);

viewcube.rotation.x = 45 * Math.PI / 180;

scene.add(viewcube);

function rotateObject(object, degreeX = 0, degreeY = 0, degreeZ = 0) {
    object.rotateX(THREE.Math.degToRad(degreeX));
    object.rotateY(THREE.Math.degToRad(degreeY));
    object.rotateZ(THREE.Math.degToRad(degreeZ));
}

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
    domEvents.addEventListener(vc.children[i], 'click', function (e) {
        console.log(e.target.name);
        newScene.setView(e.target.name);
    });
}


var raycaster = new THREE.Raycaster();
var hit = [];

function onUpdate() {

    /*
    for (var i=0, j=vc.children.length; i<j; i++) {
        vc.children[i].material.color = new THREE.Color(0x64B5F6);
        vc.children[i].material.opacity = .8;
    }

    // Raycasting
    raycaster.setFromCamera(mousePosition, camera);
    hit = raycaster.intersectObjects(vc.children);
    if (hit.length > 0) {
        hit[0].object.material.color = new THREE.Color(0x607D8B);
        hit[0].object.material.opacity = .625;
    }*/

    // Rotate!
    if (!mouseDown) {
        // viewcube.rotation.x += 0 * Math.PI / 180;
        // viewcube.rotation.y += .25 * Math.PI / 180;
    }
}

// Get mouse position
var mousePosition = new THREE.Vector2(1, 1);

function onMouseMove(e) {
    mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
}

document.addEventListener('mousemove', onMouseMove);

// Get mouse up and down
var mouseDown = false;
document.addEventListener('mousedown', function () {
    mouseDown = true;
});
document.addEventListener('mouseup', function () {
    mouseDown = false;
});

// Render event loop
function render() {
    requestAnimationFrame(render);
    onUpdate();
    TWEEN.update();
    renderer.render(scene, camera);
}

render();


var camDirections = {
    top: new THREE.Vector3(0, 10, 0),
    bottom: new THREE.Vector3(0, -10, 0),
    left: new THREE.Vector3(-10, 0, 5),
    right: new THREE.Vector3(10, 0, 5),
    front: new THREE.Vector3(0, 0, 5),
    back: new THREE.Vector3(0, 0, -10)
};

var xArray = ['front', 'right', 'back', 'left'];
var yArray = ['front', 'top', 'back', 'bottom'];

var xPos = 0;
var yPos = 0;

// CUBE CONTROLS
var viewCubeControls = document.querySelectorAll('.control');
viewCubeControls.forEach(function (control) {
    control.addEventListener('click', function (e) {
        console.log(e.target.id);
        var direction = '';
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
            default:
                break;

        }
        console.log(camera);
        setupTween({...camera.position}, camDirections[direction], 600, direction);
    });
});


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

        })
        .onComplete(function () {
                console.log('done');
            }
        );
    tween.start();
    console.log(tween);
}