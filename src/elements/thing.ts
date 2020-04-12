import {
	LitElement,
	property,
} from 'lit-element';

export abstract class Thing extends LitElement
{
	@property({type: String})
	title = '';
}
