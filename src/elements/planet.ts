import {
	LitElement,
	html,
	customElement,
	TemplateResult,
	property
} from 'lit-element';
import {
	Marker,
} from './marker';
import { Moon } from './moon';

const surfaces: WeakMap<Planet, HTMLCanvasElement> = new WeakMap();
const renderers: WeakMap<Planet, Worker> = new WeakMap();

@customElement('nmsh-planet')
export class Planet extends LitElement
{

	get canvas(): HTMLCanvasElement
	{
		return surfaces.get(this) as HTMLCanvasElement;
	}

	get renderer(): Worker
	{
		return renderers.get(this) as Worker;
	}

	get moons(): Moon[]
	{
		return [...this.querySelectorAll('nmsh-moon')].filter(
			e => e instanceof Moon
		) as Moon[];
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

		([...this.querySelectorAll('nmsh-marker')].filter(
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

		([...this.querySelectorAll('nmsh-moon')].filter(
			e => e instanceof Moon
		) as Moon[]).forEach((_e, i) => {
			return this.renderer.postMessage({
				addMoon: [
					i,
				],
			});
		});

		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				this.resize();
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
