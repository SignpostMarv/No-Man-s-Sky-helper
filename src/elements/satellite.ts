import {
	customElement,
	property,
} from 'lit-element';
import {
	Thing,
} from './thing';

@customElement('nmsh-satellite')
export class Satellite extends Thing
{
	@property({type: Number})
	count = 1;
}
