import {
	Points,
	BufferGeometry,
	PointsMaterial,
} from 'three';

import {
	marker,
} from './defs';

declare type pointsTuple = [
	string,
	Points,
	marker[],
	string[],
];

function freshPoints(): Points
{
	return new Points(new BufferGeometry(), new PointsMaterial({
		size: 64,
		vertexColors: true,
	}));
}

function freshTuple(emoji: string, elements: string[]): pointsTuple
{
	return [
		emoji,
		freshPoints(),
		[],
		elements,
	];
}

export const points = {
	markers: freshTuple(
		'📍',
		[] // empty on purpose
	),
	dropPods: freshTuple(
		'🕴',
		[
			'nmsh-drop-pod',
		]
	),
	distressBeacons: freshTuple(
		'🚨',
		[
			'nmsh-distress-beacon',
		]
	),
	ships: freshTuple(
		'🚢',
		[
			'nmsh-crashed-freighter',
		]
	),
	monolith: freshTuple(
		'🏫',
		[
			'nmsh-monolith',
		]
	),
	knowledgeStones: freshTuple(
		'🏺',
		[
			'nmsh-knowledge-stone',
		]
	),
	damagedMachinery: freshTuple(
		'⚙',
		[
			'nmsh-damaged-machinery',
		]
	),
	mineralDeposits: freshTuple(
		'⛏',
		[
			'nmsh-mineral-deposit',
		]
	),
	building: freshTuple(
		'🏢',
		[
			'nmsh-building',
		]
	),
	waypoint: freshTuple(
		'ℹ',
		[
			'nmsh-waypoint',
		]
	),
	tradePost: freshTuple(
		'🏪',
		[
			'nmsh-trade-post',
		]
	),
	minorSettlements: freshTuple(
		'🏘',
		[
			'nmsh-minor-settlement',
		]
	),
	transmissionTowers: freshTuple(
		'🗼',
		[
			'nmsh-transmission-tower',
		]
	),
	ancientRuins: freshTuple(
		'🏛',
		[
			'nmsh-ancient-ruin',
		]
	),
	observatories: freshTuple(
		'🔭',
		[
			'nmsh-observatory',
		]
	),
	portals: freshTuple(
		'🚪',
		[
			'nmsh-portal',
		],
	),
	cargoDrop: freshTuple(
		'📦',
		[
			'nmsh-cargo-drop',
		]
	),
	damagedStarship: freshTuple(
		'🛩',
		[
			'nmsh-damaged-starship',
		]
	),
	manufacturingFacility: freshTuple(
		'🏭',
		[
			'nmsh-manufacturing-facility',
		]
	),
	shelters: freshTuple(
		'⛺',
		[
			'nmsh-shelter',
		]
	),
	holographicCommsTower: freshTuple(
		'📻',
		[
			'nmsh-comms-tower',
		]
	),
	ancientDataStructure: freshTuple(
		'💽',
		[
			'nmsh-ancient-data-structure',
		]
	),
};
