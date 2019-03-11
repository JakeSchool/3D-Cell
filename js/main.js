var scene = new THREE.Scene();
scene.background = new THREE.Color(0xcccccc);
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var controls = new THREE.OrbitControls(camera);
camera.position.z = 250;
controls.update()

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function createOrganelle(img, x, z, sizex, sizey){
  var texture = new THREE.TextureLoader().load(img);

  var material = new THREE.MeshBasicMaterial({map : texture});
  material.transparent = true;

  var plane = new THREE.Mesh(new THREE.PlaneGeometry(sizex, sizey), material);
  plane.rotation.x = -(Math.PI / 2);
  plane.position.x = x;
  plane.position.y = 10.5;
  plane.position.z = z;
  scene.add(plane);
}

createOrganelle("./img/golgi_body.png", 30, 10, 20, 20);
createOrganelle("./img/mitochondria.png", -20, -10, 15, 15);
createOrganelle("./img/chloroplast.png", -30, 10, 16, 10);
createOrganelle("./img/rough-er.png", 0, -16, 18, 18);
createOrganelle("./img/vacuole.png", 50, -15, 30, 30);

var nucleusGeometray = new THREE.SphereGeometry(14, 8, 16);
var nucleusMaterial  = new THREE.MeshBasicMaterial({color: 0x0000CC, opacity: 0.5});
nucleusMaterial.transparent = true;
var nucleusMesh = new THREE.Mesh(nucleusGeometray, nucleusMaterial);
nucleusMesh.position.y = 10;

var nucleousGeometray = new THREE.SphereGeometry(7, 8, 16);
var nucleousMaterial  = new THREE.MeshBasicMaterial({color: 0x0000DD});
var nucleousMesh = new THREE.Mesh(nucleousGeometray, nucleousMaterial);
nucleousMesh.position.y = 11;

scene.add(nucleusMesh);
scene.add(nucleousMesh);

var arrayX = [-50, 60, 60, -15];
var arrayZ = [30, 30, -30, -20];
for(var i = 0; i < 4; i++){
  var geometry = new THREE.SphereGeometry(4, 8, 16);
  var material = new THREE.MeshBasicMaterial({color: 0xFF1111});
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = 11;
  mesh.position.x = arrayX[i];
  mesh.position.z = arrayZ[i];
  
  scene.add(mesh);
}

var cellGeometry = new THREE.BoxGeometry(150, 20, 75);
var membraneGeometry = new THREE.BoxGeometry(145, 19, 74);
var membraneMaterial = new THREE.MeshBasicMaterial({color: 0xF9FF7E});
var membraneMesh = new THREE.Mesh(membraneGeometry, membraneMaterial);
membraneMesh.position.x += 2;

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
