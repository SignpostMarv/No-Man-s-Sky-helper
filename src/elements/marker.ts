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

@customElement('nmsh-distress-beacon')
export class DistressBeacon extends Marker
{
}

@customElement('nmsh-crashed-freighter')
export class CrashedFreighter extends Marker
{
}

@customElement('nmsh-monolith')
export class Monolith extends Marker
{
}

@customElement('nmsh-knowledge-stone')
export class KnowledgeStone extends Marker
{
}

@customElement('nmsh-damaged-machinery')
export class DamagedMachinery extends Marker
{
}

@customElement('nmsh-mineral-deposit')
export class MineralDeposit extends Marker
{
}

@customElement('nmsh-building')
export class Building extends Marker
{
}

@customElement('nmsh-waypoint')
export class Waypoint extends Building
{
}

@customElement('nmsh-trade-post')
export class TradePost extends Building
{
}
