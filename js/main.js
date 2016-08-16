var scene, camera, renderer;
var cube, mesh;

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var SPEED = 0.01;

function init() {
	scene = new THREE.Scene();

	//initCube();
	initMesh();
	initCamera();
	initRenderer()
	initLights();

	controls = new THREE.OrbitControls( camera);
	//controls.addEventListener( 'change', render );

	document.body.appendChild(renderer.domElement);
}

function initCamera() {
	camera = new THREE.PerspectiveCamera(70, WIDTH/HEIGHT, 1, 10);
	camera.position.set(0, 3.5, 5);
	camera.lookAt(scene.position);

	scene.add(camera);
}

function initCube() {

	var geometry = new THREE.BoxGeometry(1, 1, 1);
	//var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
	var material = new THREE.MeshNormalMaterial();
	cube = new THREE.Mesh(geometry, material);

	scene.add(cube);
}

function initMesh() {
	/*var loader = new THREE.JSONLoader();
	loader.load('./js/room.json', function(geometry) {
		var mesh = new THREE.Mesh(geometry);
		scene.add(mesh);
	});*/

	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	
	loader.load('./data/room.dae', function(collada) {
		var dae = collada.scene;
		var skin = collada.skins[0];

		dae.position.set(0,0,0);

		scene.add(dae);
	});
}

function initLights() {
	var light = new THREE.AmbientLight(0xffffff);
	scene.add(light);
}
function rotateMesh() {

	if (!mesh) {
		return;
	}

	mesh.rotation.x += SPEED *2;
	mesh.rotation.z += SPEED*3;
	mesh.rotation.y += SPEED;
}

function rotateCube() {
	if (!cube) {
		return;
	}
	cube.rotation.x += SPEED *2;
	cube.rotation.y += SPEED;
	cube.rotation.z += SPEED*3;
}

function initRenderer() {
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(WIDTH, HEIGHT);
}

function render (argument) {

	requestAnimationFrame(render);
	//rotateCube();
	//rotateMesh();
	controls.update();
	renderer.render(scene, camera);
}

init();
render();
