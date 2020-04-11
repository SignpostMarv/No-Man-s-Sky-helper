import {
    LitElement,
    html,
    customElement,
    TemplateResult
} from 'lit-element';
import { Planet } from './planet';

@customElement('nmsh-system')
export class System extends LitElement
{
	render(): TemplateResult
	{
		return html`${this.planets}`;
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
}
