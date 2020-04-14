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
];

export const points = {
	markers: ['📍', freshPoints(), []] as pointsTuple,
	dropPods: ['🕴', freshPoints(), []] as pointsTuple,
	distressBeacons: ['🚨', freshPoints(), []] as pointsTuple,
	ships: ['🚢', freshPoints(), []] as pointsTuple,
	monolith: ['🏫', freshPoints(), []] as pointsTuple,
	knowledgeStones: ['🏺', freshPoints(), []] as pointsTuple,
	damagedMachinery: ['⚙', freshPoints(), []] as pointsTuple,
	mineralDeposits: ['⛏', freshPoints(), []] as pointsTuple,
	building: ['🏢', freshPoints(), []] as pointsTuple,
	waypoint: ['ℹ', freshPoints(), []] as pointsTuple,
	tradePost: ['🏪', freshPoints(), []] as pointsTuple,
	minorSettlements: ['🏘', freshPoints(), []] as pointsTuple,
	transmissionTowers: ['🗼', freshPoints(), []] as pointsTuple,
	ancientRuins: ['🏛', freshPoints(), []] as pointsTuple,
};
