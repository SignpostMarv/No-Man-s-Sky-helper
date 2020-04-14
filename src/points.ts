import {
	Points,
	BufferGeometry,
	PointsMaterial,
} from 'three';

import {
	marker,
} from './defs';

function freshPoints(): Points
{
	return new Points(new BufferGeometry(), new PointsMaterial({
		size: 0.01,
		vertexColors: true,
	}));
}

declare type pointsTuple = [
	string,
	Points,
	marker[],
	string[],
];

export const points = {
	markers: [
		'📍',
		freshPoints(),
		[],
		[], // empty on purpose
	] as pointsTuple,
	dropPods: [
		'🕴',
		freshPoints(),
		[],
		[
			'nmsh-drop-pod',
		],
	] as pointsTuple,
	distressBeacons: [
		'🚨',
		freshPoints(),
		[],
		[
			'nmsh-distress-beacon',
		],
	] as pointsTuple,
	ships: [
		'🚢',
		freshPoints(),
		[],
		[
			'nmsh-crashed-freighter',
		],
	] as pointsTuple,
	monolith: [
		'🏫',
		freshPoints(),
		[],
		[
			'nmsh-monolith',
		],
	] as pointsTuple,
	knowledgeStones: [
		'🏺',
		freshPoints(),
		[],
		[
			'nmsh-knowledge-stone',
		],
	] as pointsTuple,
	damagedMachinery: [
		'⚙',
		freshPoints(),
		[],
		[
			'nmsh-damaged-machinery',
		],
	] as pointsTuple,
	mineralDeposits: [
		'⛏',
		freshPoints(),
		[],
		[
			'nmsh-mineral-deposit',
		],
	] as pointsTuple,
	building: [
		'🏢',
		freshPoints(),
		[],
		[
			'nmsh-building',
		],
	] as pointsTuple,
	waypoint: [
		'ℹ',
		freshPoints(),
		[],
		[
			'nmsh-waypoint',
		],
	] as pointsTuple,
	tradePost: [
		'🏪',
		freshPoints(),
		[],
		[
			'nmsh-trade-post',
		],
	] as pointsTuple,
	minorSettlements: [
		'🏘',
		freshPoints(),
		[],
		[
			'nmsh-minor-settlement',
		],
	] as pointsTuple,
	transmissionTowers: [
		'🗼',
		freshPoints(),
		[],
		[
			'nmsh-transmission-tower',
		],
	] as pointsTuple,
	ancientRuins: [
		'🏛',
		freshPoints(),
		[],
		[
			'nmsh-ancient-ruin',
		],
	] as pointsTuple,
};
