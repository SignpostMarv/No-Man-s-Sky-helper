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
];

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

	constructor()
	{
		super();

		surfaces.set(this, document.createElement('canvas'));
		renderers.set(this, new Worker('../init.worker.js'));

		const offscreen = this.canvas.transferControlToOffscreen();

		this.renderer.postMessage({offscreen}, [offscreen]);

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
				],
			});
		});

		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				this.resize();
			});
		});
	}

	update(changedProperties: Map<string, string|number>): void
	{
		super.update(changedProperties);

		if (changedProperties.has('color')) {
			const changeColor = this.color;

			this.renderer.postMessage({changeColor});
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

	update(changedProperties: Map<string, any>): void
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
