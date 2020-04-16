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

abstract class CrashedShip extends Marker
{
}

@customElement('nmsh-crashed-freighter')
export class CrashedFreighter extends CrashedShip
{
}

@customElement('nmsh-damaged-starship')
export class DamagedStarship extends CrashedShip
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

@customElement('nmsh-observatory')
export class Observatory extends Building
{
}

@customElement('nmsh-portal')
export class Portal extends Marker
{
}

@customElement('nmsh-cargo-drop')
export class CargoDrop extends Marker
{
}

@customElement('nmsh-manufacturing-facility')
export class ManufacturingFacility extends Building
{
}

@customElement('nmsh-shelter')
export class Shelter extends Building
{
}

@customElement('nmsh-comms-tower')
export class HolographicCommsTower extends Building
{
}
