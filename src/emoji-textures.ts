import {
	points,
} from './points';

const emojiTextures: {[emoji: string]: CanvasRenderingContext2D} = {};

Object.values(points).forEach(e => {
	const [emoji] = e;

	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	if ( ! ctx) {
		throw new Error('could not get 2d context!');
	}

	canvas.width = canvas.height = 64;

	ctx.font = '48px serif';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillStyle = '#fff';

	ctx.fillText(emoji, 32, 32);

	emojiTextures[emoji] = ctx;
});

function emojiTextureBuffers(): {[emoji: string]: ArrayBuffer}
{
	const emojis: {[emoji: string]: ArrayBuffer} = {};

	Object.entries(emojiTextures).forEach(e => {
		const [emoji, ctx] = e;

		emojis[emoji] = ctx.getImageData(0, 0, 64, 64).data.buffer;
	});

	return emojis;
}

export {
	emojiTextures,
	emojiTextureBuffers,
};
