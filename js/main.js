var scene = new THREE.Scene();
scene.background = new THREE.Color(0xcccccc);
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var controls = new THREE.OrbitControls(camera);
camera.position.z = 250;
controls.update()

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function createOrganelle(img, x, z){
  var texture = new THREE.TextureLoader().load(img);

  var material = new THREE.MeshBasicMaterial({map : texture});
  //material.transparent = true;

  var plane = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), material);
  plane.rotation.x = -(Math.PI / 2);
  plane.position.x = x;
  plane.position.y = 10.5;
  plane.position.z = z;
  scene.add(plane);
}

createOrganelle("../img/golgi_body.png", 30, 10);

var cellGeometry = new THREE.BoxGeometry(100, 20, 50);
var membraneGeometry = new THREE.BoxGeometry(90, 19, 49);
var membraneMaterial = new THREE.MeshBasicMaterial({color: 0xF9FF7E});
var membraneMesh = new THREE.Mesh(membraneGeometry, membraneMaterial);
membraneMesh.position.x += 4;

var cellMaterials = [
    new THREE.MeshBasicMaterial({color:0x00EE00, transparent:true, opacity:0.6, side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({color:0x00EE00, transparent:true, opacity:0.0, side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({color:0xFF876D, transparent:true, opacity:0.6, side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({color:0x00EE00, transparent:true, opacity:0.6, side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({color:0x00EE00, transparent:true, opacity:0.6, side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({color:0x00EE00, transparent:true, opacity:0.6, side: THREE.DoubleSide}),
];

var cellMaterial = new THREE.MeshFaceMaterial(cellMaterials);
var cellMesh = new THREE.Mesh(cellGeometry, cellMaterial);



var cellEdge = new THREE.EdgesGeometry(cellGeometry);
var cellLine = new THREE.LineSegments(cellEdge, new THREE.LineBasicMaterial({color: 0x00000}));
scene.add(cellLine);
scene.add(cellMesh);
scene.add(membraneMesh);


var animate = function () {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
};

animate();
