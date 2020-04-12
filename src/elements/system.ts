import {
	LitElement,
	html,
	customElement,
	TemplateResult
} from 'lit-element';
import {
	Planet,
	Moon,
} from './planet';

@customElement('nmsh-system')
export class System extends LitElement
{
	render(): TemplateResult
	{
		return html`${this.planets}${this.moons}`;
	}

	createRenderRoot(): System
	{
		return this;
	}

	get planets(): Planet[]
	{
		return ([...this.querySelectorAll('nmsh-planet')].filter(
			e => {
				return e instanceof Planet;
			}
		) as Planet[]);
	}

	get moons(): Moon[]
	{
		return ([...this.querySelectorAll('nmsh-moon')].filter(
			e => {
				return e instanceof Moon;
			}
		) as Moon[]);
	}
}
