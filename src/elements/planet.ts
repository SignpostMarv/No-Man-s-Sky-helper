import {
    LitElement,
    html,
    customElement,
    TemplateResult
} from 'lit-element';
import {
    Marker,
} from './marker';

const surfaces: WeakMap<Planet, HTMLCanvasElement> = new WeakMap();
const renderers: WeakMap<Planet, Worker> = new WeakMap();

@customElement('nmsh-planet')
export class Planet extends LitElement
{
    constructor()
    {
        super();

        surfaces.set(this, document.createElement('canvas'));
        renderers.set(this, new Worker('../init.worker.js'));

        this.canvas.setAttribute(
            'style',
            'display:block;width:100%;height:100%;'
        );
    }

    get canvas(): HTMLCanvasElement
    {
        return surfaces.get(this) as HTMLCanvasElement;
    }

    get renderer(): Worker
    {
        return renderers.get(this) as Worker;
    }

    render(): TemplateResult
    {
        return html`${this.canvas}`;
    }

    connectedCallback(): void
    {
        super.connectedCallback();

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const offscreen = this.canvas.transferControlToOffscreen();

                this.renderer.postMessage({offscreen}, [offscreen]);

                addEventListener('resize', () => {
                    this.resize();
                });

                this.resize();

                ([...this.querySelectorAll('nmsh-marker')].filter(
                    e => {
                        return e instanceof Marker;
                    }
                ) as Marker[]).forEach((e, i) => {
                    this.renderer.postMessage({
                        addMarker: [
                            i,
                            e.lat,
                            e.lng,
                            e.title,
                        ],
                    });
                });
            });
        });
    }

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
}
