export * from './elements/galaxy';
export * from './elements/system';
export * from './elements/planet';
export * from './elements/marker';

/*
const canvas = document.createElement('canvas');
const worker = new Worker('./init.worker.js');
canvas.width = 640;
canvas.height = 480;

document.body.appendChild(canvas);

const offscreen = canvas.transferControlToOffscreen();

worker.postMessage({offscreen}, [offscreen]);

function resize(): void {
    worker.postMessage({
        resize: [
            canvas.clientWidth,
            canvas.clientHeight,
        ],
    });
}

onresize = resize;

resize();

worker.postMessage({
    addMarker: [0, 90, 0, 'north pole'],
});
worker.postMessage({
    addMarker: [1, -90, 0, 'south pole'],
});
worker.postMessage({
    addMarker: [2, -90, 0, 'random'],
});

function render(): void {
    worker.postMessage({
        updateMarker: [
            2,
            -90 + (180 * Math.random()),
            0,
            'random'
        ],
    });

    requestAnimationFrame(render);
};

render();
*/
