import {
	html,
	customElement,
	TemplateResult,
	property
} from 'lit-element';
import {
	Marker,
} from './marker';
import { Thing } from './thing';
import { Satellite } from './satellite';

const surfaces: WeakMap<RenderableBody, HTMLCanvasElement> = new WeakMap();
const renderers: WeakMap<RenderableBody, Worker> = new WeakMap();

const markerElements = [
	'nmsh-marker',
	'nmsh-drop-pod',
	'nmsh-distress-beacon',
	'nmsh-crashed-freighter',
];

const emojiTextures: {[emoji: string]: CanvasRenderingContext2D} = {};

[
	'📍', // marker
	'🕴', // exosuit drop pods
	'🚨', // distress beacons
	'🚢', // ships
].forEach(emoji => {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	if ( ! ctx) {
		throw new Error('could not get 2d context!');
	}

	canvas.width = canvas.height = 64;

	ctx.font = '48px serif';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';

	ctx.fillText(emoji, 32, 32);

	emojiTextures[emoji] = ctx;
});

export abstract class RenderableBody extends Thing
{
	get canvas(): HTMLCanvasElement
	{
		return surfaces.get(this) as HTMLCanvasElement;
	}

	get renderer(): Worker
	{
		return renderers.get(this) as Worker;
	}

	focusOn(thing: Marker, distance = 1.03): void
	{
		this.cameraAuto = false;
		this.cameraDistance = distance;
		this.cameraLat = thing.lat;
		this.cameraLng = thing.lng;
	}

	constructor()
	{
		super();

		surfaces.set(this, document.createElement('canvas'));
		renderers.set(this, new Worker('../init.worker.js'));

		const offscreen = this.canvas.transferControlToOffscreen();

		const emojis: {[emoji: string]: ArrayBuffer} = {};

		Object.entries(emojiTextures).forEach(e => {
			const [emoji, ctx] = e;

			emojis[emoji] = ctx.getImageData(0, 0, 64, 64).data.buffer;
		});

		this.renderer.postMessage({
			offscreen,
			emojis,
		}, [
			offscreen,
			...Object.values(emojis)
		]);

		this.canvas.setAttribute(
			'style',
			'display:block;width:100%;height:100%;'
		);

		addEventListener('resize', () => {
			this.resize();
		});
	}

	@property({type: Boolean})
	rings = false;

	@property({type: String})
	color = 'ff0000';

	@property({type: Boolean, attribute: 'camera-auto'})
	cameraAuto = false;

	@property({type: Number, attribute: 'camera-lat'})
	cameraLat = 0;

	@property({type: Number, attribute: 'camera-lng'})
	cameraLng = 0;

	@property({type: Number, attribute: 'camera-distance'})
	cameraDistance = 4;

	resize(): void
	{
		const canvas = this.canvas;

		this.renderer.postMessage({
			resize: [
				canvas.clientWidth,
				canvas.clientHeight,
			],
		});
	}

	render(): TemplateResult
	{
		return html`${this.canvas}`;
	}

	connectedCallback(): void
	{
		super.connectedCallback();

		([...this.querySelectorAll(markerElements.join(', '))].filter(
			e => {
				return e instanceof Marker;
			}
		) as Marker[]).forEach((e, i) => {
			this.renderer.postMessage({
				updateMarker: [
					i,
					e.lat,
					e.lng,
					e.title,
					e.nodeName,
				],
			});
		});

		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				this.resize();
			});
		});
	}

	update(changedProperties: Map<string, string|number|boolean>): void
	{
		super.update(changedProperties);

		if (changedProperties.has('color')) {
			const changeColor = this.color;

			this.renderer.postMessage({changeColor});
		}

		if (
			changedProperties.has('cameraAuto')
		) {
			const {cameraAuto} = this;

			this.renderer.postMessage({cameraAuto});
		}

		if (
			changedProperties.has('cameraLat') ||
			changedProperties.has('cameraLng')
		) {
			const {
				cameraLat,
				cameraLng,
			} = this;

			this.renderer.postMessage({
				cameraLat,
				cameraLng,
			});
		}

		if (
			changedProperties.has('cameraDistance')
		) {
			const {cameraDistance} = this;

			this.renderer.postMessage({cameraDistance});
		}
	}
}

@customElement('nmsh-planet')
export class Planet extends RenderableBody
{
	get satellites(): Satellite[]
	{
		return [...this.querySelectorAll('nmsh-satellite')].filter(
			e => e instanceof Satellite
		) as Satellite[];
	}

	connectedCallback(): void
	{
		super.connectedCallback();

		this.satellites.forEach((_e, i) => {
			return this.renderer.postMessage({
				addSatellite: [
					i,
				],
			});
		});
	}

	update(changedProperties: Map<string, string|number|boolean>): void
	{
		super.update(changedProperties);

		if(changedProperties.has('rings')) {
			const hasRings = this.rings;

			this.renderer.postMessage({hasRings});
		}
	}
}

@customElement('nmsh-moon')
export class Moon extends RenderableBody
{
	@property({type: String})
	of = '';

	@property({type: String})
	color = 'ffffff';
}
