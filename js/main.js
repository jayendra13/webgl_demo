var scene, camera, renderer;
var cube, mesh;
var collada;

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var SPEED = 0.01;

function init() {
	scene = new THREE.Scene();

	initMesh();
	initCamera();
	initRenderer()
	initLights();

	controls = new THREE.OrbitControls( camera);

	document.body.appendChild(renderer.domElement);
}

function initCamera() {
	camera = new THREE.PerspectiveCamera(70, WIDTH/HEIGHT, 1, 10);
	camera.position.set(0, 3.5, 5);
	camera.lookAt(scene.position);

	scene.add(camera);
}

function initMesh() {

	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	
	loader.load('./data/dining_area.dae', function(collada) {
		mesh = collada.scene;
		var skin = collada.skins[0];

		mesh.position.set(0,0,0);


		console.log(collada);
		console.log("\n");
		mesh.traverse( function(child) {
			console.log(child);
			if (child instanceof THREE.Mesh) {
				//child.material = material;
				//scene.add(child);
			}
		});
		scene.add(mesh);
	});
}

function initLights() {
	var light = new THREE.AmbientLight(0xffffff);
	scene.add(light);
}

function initRenderer() {
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(WIDTH, HEIGHT);
}

function render (argument) {
	requestAnimationFrame(render);
	controls.update();
	renderer.render(scene, camera);
}

init();
render();