import {
	customElement,
	property,
} from 'lit-element';
import { Thing } from './thing';
import { Planet } from './planet';

@customElement('nmsh-marker')
export class Marker extends Thing
{
	@property({type: Number})
	lat = 0;

	@property({type: Number})
	lng = 0;

	@property({type: String})
	title = 'marker';

	focusHere(distance: 0.01): void
	{
		if ( ! (this.parentNode instanceof Planet)) {
			throw new Error('Cannot focus on a marker when not in a planet!');
		}

		this.parentNode.focusOn(this, distance);
	}
}

@customElement('nmsh-drop-pod')
export class DropPod extends Marker
{
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

@customElement('nmsh-minor-settlement')
export class MinorSettlement extends Building
{
}

@customElement('nmsh-transmission-tower')
export class TransmissionTower extends Building
{
}

@customElement('nmsh-ancient-ruin')
export class AncientRuin extends Building
{
}
