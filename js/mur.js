//--------------- CREATION CAMERA, SCENE ... -------------------------/
var container = document.getElementById('ThreeJS');
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1, 20000);
var distance = 1000;

if (Detector.webgl) {
	renderer = new THREE.WebGLRenderer( {antialias:true} );
}
else {
	renderer = new THREE.CanvasRenderer(); 
}

renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

camera.position.set(0,200,400);
camera.lookAt(scene.position);
scene.add(camera);
//--------------- FIN CREATION CAMERA, SCENE ... -------------------------/

init();
animate();


function init() {
	//---------------- INITIALISATION DU MONDE 3D ------------------------
	// EVENTS
	THREEx.WindowResize(renderer, camera);
	THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
	// CONTROLS
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	// STATS
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.bottom = '0px';
	stats.domElement.style.zIndex = 100;
	container.appendChild( stats.domElement );
	// FLOOR
	var floorTexture = new THREE.ImageUtils.loadTexture('images/checkerboard.jpg');
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
	floorTexture.repeat.set(10, 10);
	var floorMaterial = new THREE.MeshLambertMaterial({map: floorTexture, side: THREE.DoubleSide});
	var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = -51;
	floor.rotation.x = Math.PI / 2;
	floor.receiveShadow = true;
	scene.add(floor);
	// SKYBOX
	var skyBoxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
	var skyBoxMaterial = new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.BackSide});
	var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
	scene.add(skyBox);
	scene.fog = new THREE.FogExp2( 0x000000, 0.00025 );
	//---------------- FIN INITIALISATION DU MONDE 3D ------------------------
	
	renderer.shadowMapEnabled = true;
	
	// "shadow cameras" show the light source and direction
	
	// spotlight #1 -- yellow, dark shadow
	var spotlight = new THREE.SpotLight(0xff6600);
	spotlight.position.set(500,150,500);
	spotlight.shadowCameraVisible = false;
	spotlight.shadowDarkness = 0.95;
	spotlight.intensity = 2;
	// must enable shadow casting ability for the light
	spotlight.castShadow = true;
	scene.add(spotlight);
	
	var geoSphere = new THREE.SphereGeometry(10, 16, 8, 45);
	var textureShpere = new THREE.ImageUtils.loadTexture('images/lava.jpg');
	var matSphere = new THREE.MeshBasicMaterial({
		map: textureShpere,
	});
		
	var sphere = new THREE.Mesh(geoSphere, matSphere);
	sphere.position = spotlight.position;
	scene.add(sphere);
	
	//1 etage
	createCube('', 100, 100, 100, '', -200, 0, 0); //bas gauche
	createCube('', 100, 100, 100, '', -100, 0, 0); //bas gauche+1
	createCube('', 100, 100, 100, '', 0, 0, 0); //bas gauche +2
	createCube('', 100, 100, 100, '', 100, 0, 0); //bas gauche +3
	createCube('', 100, 100, 100, '', 200, 0, 0); //bas gauche +4
	//2 etage
	createCube('', 100, 100, 100, '', -200, 100, 0); //bas gauche
	createCube('', 100, 100, 100, '', -100, 100, 0); //bas gauche+1
	createCube('', 100, 100, 100, '', 0, 100, 0); //bas gauche +2
	createCube('', 100, 100, 100, '', 100, 100, 0); //bas gauche +3
	createCube('', 100, 100, 100, '', 200, 100, 0); //bas gauche +4
	//3 etage
	createCube('', 100, 100, 100, '', -200, 200, 0); //bas gauche
	createCube('', 100, 100, 100, '', -100, 200, 0); //bas gauche+1
	createCube('', 100, 100, 100, '', 0, 200, 0); //bas gauche +2
	createCube('', 100, 100, 100, '', 100, 200, 0); //bas gauche +3
	createCube('', 100, 100, 100, '', 200, 200, 0); //bas gauche +4
	//4 etage
	createCube('', 100, 100, 100, '', -200, 300, 0); //bas gauche
	createCube('', 100, 100, 100, '', -100, 300, 0); //bas gauche+1
	createCube('', 100, 100, 100, '', 0, 300, 0); //bas gauche +2
	createCube('', 100, 100, 100, '', 100, 300, 0); //bas gauche +3
	createCube('', 100, 100, 100, '', 200, 300, 0); //bas gauche +4
	
	function createCube(texture, cote1, cote2, cote3, color, x, y, z) {
		var usetexture = new THREE.ImageUtils.loadTexture('images/crate.gif');
		var geocube = new THREE.CubeGeometry(cote1, cote2, cote3);
		var matcube = new THREE.MeshLambertMaterial({
			color: color,
			map: usetexture,
		});
		var cube = new THREE.Mesh(geocube, matcube);
		cube.position.set(x,y,z);
		cube.castShadow = true;
		scene.add(cube);
	}
}



//--------------- CREATION RENDU DE LA SCENE -------------------------/
function animate() {
    requestAnimationFrame( animate );
	render();		
	update();
}

function update(){
	controls.update();
	stats.update();
}

function render() {
	renderer.render( scene, camera );
}
//--------------- FIN RENDU DE LA SCENE -------------------------/