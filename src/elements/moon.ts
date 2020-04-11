import {
	LitElement,
	customElement,
	property
} from 'lit-element';

@customElement('nmsh-moon')
export class Moon extends LitElement
{
	@property({type: String})
	title = '';
}
