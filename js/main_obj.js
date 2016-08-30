var scene, camera, renderer;
var cube, mesh;
var collada;
var spotLight,light;

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
	camera = new THREE.PerspectiveCamera(70, WIDTH/HEIGHT, 1, 10000);
	camera.position.set(10, 10, 200);
	camera.lookAt(scene.position);

	scene.add(camera);
}

function initMesh() {
//THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
	var loader = new THREE.MTLLoader();
		
	loader.load('./data/3d_view.mtl', function(materials) {

		materials.preload();
		
		objloader = new THREE.OBJLoader();
		objloader.setMaterials(materials);

		objloader.load('./data/3d_view.obj', function(object) {
			mesh = object;
			scene.add(mesh);
		});
	});
}

function initLights() {
	light = new THREE.AmbientLight(0xffffff);
	
	spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(3, 3, 3);
	spotLight.castShadow = true;
	scene.add(spotLight);

	/*var directionalLight = new THREE.DirectionalLight(pointColor);
	directionalLight.position.set(-40, 60, -10);
	directionalLight.castShadow = true;
	directionalLight.shadowCameraNear = 2;
	directionalLight.shadowCameraFar = 200;
    directionalLight.shadowCameraLeft = -50;
    directionalLight.shadowCameraRight = 50;
    directionalLight.shadowCameraTop = 50;
    directionalLight.shadowCameraBottom = -50;
    directionalLight.distance = 0;
    directionalLight.intensity = 0.5;
    directionalLight.shadowMapHeight = 1024;
    directionalLight.shadowMapWidth = 1024;
    scene.add(directionalLight);*/

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