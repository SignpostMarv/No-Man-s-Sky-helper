import {
	WebGLRenderer,
	PerspectiveCamera,
	Scene,
	DirectionalLight,
	SphereGeometry,
	MeshPhongMaterial,
	Mesh,
	Object3D,
	TorusGeometry,
	PointLight,
	Camera,
} from 'three';

declare type marker = [number, number, number, string];
declare type satellite = [number];

const camera = new PerspectiveCamera(
	75,
	2,
	0.1,
	100,
);

const scene = new Scene();
const light = new PointLight(0xffffff, 1);
const lightOpposite = new DirectionalLight(0xffffff, 0.1);
const planet = new Mesh(
	new SphereGeometry(1, 32, 32),
	new MeshPhongMaterial({
		color: 0xff0000,
		flatShading: true,
	})
);
const rings = new Mesh(
	new TorusGeometry(1.375, 0.125, 2, 32),
	new MeshPhongMaterial({
		color: 0xffffff,
		flatShading: true,
	})
);

const speed = {
	camera: 0.0001,
	light: -0.00001,
	satellite: -0.001,
};

const markers: marker[] = [];
const markerIds: number[] = [];
const markerMeshes: WeakMap<marker, Object3D> = new WeakMap();

const satellites: satellite[] = [];
const satelliteIds: number[] = [];
const satelliteMeshes: WeakMap<satellite, Object3D> = new WeakMap();

let renderer: WebGLRenderer|undefined;
let canvas: OffscreenCanvas|undefined;
let width = 640, height = 480;
let cancelRender = 0;
let now = performance.now();
let cameraAuto = true;
let cameraLat = 0, cameraLng = 0;
let cameraDistance = 4;

function rotateThingAroundPlanet(
	thing: Object3D,
	speed: number,
	diff: number
): void {
	const {
		x,
		z,
	} = thing.position;

	const thingSpeed = speed * diff;
	const cos = Math.cos(thingSpeed);
	const sin = Math.sin(thingSpeed);

	thing.position.x = x * cos + z * sin;
	thing.position.z = z * cos - x * sin;

	thing.lookAt(planet.position);
}

function placeThingInThreeDimensions(
	object: Object3D,
	lat: number,
	lng: number,
	distance: number
): void {
	const pi = Math.PI / 180;
	const phi = (90 - lat) * pi;
	const theta = (180 + lng) * pi;

	object.position.x = distance * Math.sin(phi) * Math.cos(theta);
	object.position.y = distance * Math.sin(phi) * Math.sin(theta);
	object.position.z = distance * Math.cos(phi);
}

function placeMarkerInThreeDimensions(marker: marker): void
{
	const object = markerMeshes.get(marker);

	if ( ! object) {
		throw new Error('marker does not have a mesh!');
	}

	placeThingInThreeDimensions(object, marker[1], marker[2], 1.02);
}

function placeCameraInThreeDimensions(
	camera: Camera,
	lat: number,
	lng: number,
	distance = cameraDistance
): void {
	placeThingInThreeDimensions(camera, lat, lng, distance);

	camera.lookAt(planet.position);
}

function render(): void {
	const diff = performance.now() - now;

	if (renderer) {
		if (cameraAuto) {
		rotateThingAroundPlanet(camera, speed.camera, diff);
		}
		rotateThingAroundPlanet(light, speed.light, diff);
		rotateThingAroundPlanet(lightOpposite, speed.light, diff);

		satellites.forEach(satellite => {
			rotateThingAroundPlanet(
				satelliteMeshes.get(satellite) as Object3D,
				speed.satellite,
				diff
			);
		});

		renderer.render(scene, camera);
	}

	cancelRender = requestAnimationFrame(render);
	now += diff;
}

function addMarker(marker: marker): void
{
	markerIds[markers.push(marker) - 1] = marker[0];

	const markerMesh = new Mesh(
		new SphereGeometry(0.02, 3, 2),
		new MeshPhongMaterial({
			color: 0xffffff,
		})
	);

	markerMeshes.set(marker, markerMesh);
	placeMarkerInThreeDimensions(marker);
	scene.add(markerMesh);
}

function addSatellite(satellite: satellite): void
{
	satelliteIds[satellites.push(satellite) - 1] = satellite[0];

	const satelliteMesh = new Mesh(
		new SphereGeometry(0.125),
		new MeshPhongMaterial({
			color:0xffffff,
			flatShading: true
		})
	);

	satelliteMesh.position.x = 1.75;

	planet.add(satelliteMesh);
	satelliteMeshes.set(satellite, satelliteMesh);
}

camera.aspect = width / height;
camera.updateProjectionMatrix();

light.position.set(-1, 2, 4);
lightOpposite.position.set(1, -2, -4);

light.position.multiplyScalar(10);

rings.rotation.x = 90 * (Math.PI / 180);
rings.rotation.y = rings.rotation.z = 10 * (Math.PI / 180);

light.castShadow = true;
planet.receiveShadow = planet.castShadow = true;
rings.receiveShadow = rings.castShadow = true;

scene.add(light);
scene.add(lightOpposite);
scene.add(planet);

placeCameraInThreeDimensions(camera, 0, 0);

self.onmessage = (e: MessageEvent): void => {
	if ('offscreen' in e.data) {
		if ( ! (e.data.offscreen instanceof OffscreenCanvas)) {
			throw new Error('offscreen canvas was not supplied as expected!');
		}

		console.log('offscreen canvas handed over');

		canvas = e.data.offscreen;
		renderer = new WebGLRenderer({
			canvas,
		});
		renderer.setSize(width, height, false);

		render();
	} else if (
		'resize' in e.data &&
		e.data.resize instanceof Array &&
		2 === e.data.resize.length &&
		Number.isSafeInteger(e.data.resize[0]) &&
		Number.isSafeInteger(e.data.resize[1])
	) {
		[width, height] = e.data.resize;

		if (canvas) {
			canvas.width = width;
			canvas.height = height;
			camera.aspect = width / height;
			camera.updateProjectionMatrix();

			if (renderer) {
				renderer.setSize(width, height, false);
			}
		}
	} else if (
		'addMarker' in e.data &&
		e.data.addMarker instanceof Array &&
		4 === e.data.addMarker.length &&
		Number.isSafeInteger(e.data.addMarker[0]) &&
		Number.isFinite(e.data.addMarker[1]) &&
		Number.isFinite(e.data.addMarker[2]) &&
		'string' === typeof e.data.addMarker[3] &&
		! markerIds.includes(e.data.addMarker[0])
	) {
		addMarker(e.data.addMarker);
	} else if (
		'updateMarker' in e.data &&
		e.data.updateMarker instanceof Array &&
		4 === e.data.updateMarker.length &&
		Number.isSafeInteger(e.data.updateMarker[0]) &&
		Number.isFinite(e.data.updateMarker[1]) &&
		Number.isFinite(e.data.updateMarker[2]) &&
		'string' === typeof e.data.updateMarker[3]
	) {
		if ( ! markerIds.includes(e.data.updateMarker[0])) {
			addMarker(e.data.updateMarker);
		} else {
			const marker = markers[
				markerIds.indexOf(e.data.updateMarker[0])
			] as marker;

			marker[1] = e.data.updateMarker[1];
			marker[2] = e.data.updateMarker[2];
			marker[3] = e.data.updateMarker[3];

			placeMarkerInThreeDimensions(marker);
		}
	} else if (
		'hasRings' in e.data &&
		'boolean' === typeof e.data.hasRings
	) {
		if (e.data.hasRings) {
			scene.add(rings);
		} else {
			scene.remove(rings);
		}
	} else if (
		'addSatellite' in e.data &&
		e.data.addSatellite instanceof Array &&
		1 === e.data.addSatellite.length &&
		Number.isSafeInteger(e.data.addSatellite[0])
	) {
		if ( ! satelliteIds.includes(e.data.addSatellite[0])) {
			addSatellite(e.data.addSatellite);
		}
	} else if (
		'changeColor' in e.data &&
		'string' === typeof e.data.changeColor &&
		/^[0-9a-f]{6}$/.test(e.data.changeColor)
	) {
		(
			planet.material as MeshPhongMaterial
		).color.setHex(parseInt(e.data.changeColor, 16));
	} else if (
		'cameraAuto' in e.data &&
		'boolean' === typeof e.data.cameraAuto
	) {
		cameraAuto = e.data.cameraAuto;

		if (e.data.cameraAuto) {
			placeCameraInThreeDimensions(camera, 0, 0, 4);
		} else {
			placeCameraInThreeDimensions(camera, cameraLat, cameraLng);
		}
	} else if (
		'cameraLat' in e.data &&
		'cameraLng' in e.data &&
		Number.isFinite(e.data.cameraLat) &&
		Number.isFinite(e.data.cameraLng)
	) {
		cameraLat = e.data.cameraLat;
		cameraLng = e.data.cameraLng;

		placeCameraInThreeDimensions(camera, cameraLat, cameraLng);
	} else if (
		'cameraDistance' in e.data &&
		Number.isFinite(e.data.cameraDistance)
	) {
		cameraDistance = e.data.cameraDistance;

		if ( ! cameraAuto) {
			placeCameraInThreeDimensions(camera, cameraLat, cameraLng);
		}
	} else {
		console.error(e);

		cancelAnimationFrame(cancelRender);

		throw new Error('unsupported message!');
	}
};
