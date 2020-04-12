import {
	customElement,
	property,
} from 'lit-element';
import { Thing } from './thing';

@customElement('nmsh-marker')
export class Marker extends Thing
{
	@property({type: Number})
	lat = 0;

	@property({type: Number})
	lng = 0;

	@property({type: String})
	title = 'marker';
}

@customElement('nmsh-drop-pod')
export class DropPod extends Marker
{
	@property({type: String})
	needs = '';
}
