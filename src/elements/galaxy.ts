import {
    LitElement,
    html,
    customElement,
    TemplateResult
} from 'lit-element';
import { Planet } from './planet';
import { System } from './system';

@customElement('nmsh-galaxy')
export class Galaxy extends LitElement
{
	render(): TemplateResult
	{
		return html`${this.systems}`;
	}

	createRenderRoot(): Galaxy
	{
		return this;
	}

	get systems(): System[]
	{
		return ([...this.querySelectorAll('nmsh-system')].filter(
			e => {
				return e instanceof System;
			}
		) as System[]);
	}

	get planets(): Planet[]
	{
		return this.systems.reduce(
			(accumulator, system): Planet[] => {
				accumulator.push(...system.planets);

				return accumulator;
			},
			[] as Planet[]
		);
	}
}
