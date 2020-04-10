const gulp = require('gulp');

const rollup = require('rollup');

const rollupPlugins = {
	commonjs: require('@rollup/plugin-commonjs'),
	nodeResolve: require('@rollup/plugin-node-resolve'),
	jsonResolve: require('@rollup/plugin-json'),
	typescript: require('@rollup/plugin-typescript'),
	minifyHtml: require('rollup-plugin-minify-html-literals').default,
};


gulp.task('rollup--worker', async () => {
    const bundle = await rollup.rollup({
        input: './src/init.worker.ts',
        plugins: [
            rollupPlugins.nodeResolve(),
            rollupPlugins.typescript({
                tsconfig: './tsconfig.workers.json',
                outDir: './dist/',
            }),
        ],
    });

    return await bundle.write({
        sourcemap: false,
        format: 'es',
        dir: './dist/',
    });
});

gulp.task('rollup--init', async () => {
    const bundle = await rollup.rollup({
        input: './src/init.ts',
        plugins: [
            rollupPlugins.nodeResolve(),
            rollupPlugins.typescript({
                tsconfig: './tsconfig.json',
                outDir: './dist/',
            }),
        ],
    });

    return await bundle.write({
        sourcemap: false,
        format: 'es',
        dir: './dist/',
    });
});

gulp.task('default', gulp.series(...[
    gulp.parallel(...[
        'rollup--init',
        'rollup--worker',
    ]),
]));
