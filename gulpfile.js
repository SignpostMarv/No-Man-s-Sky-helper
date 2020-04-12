const gulp = require('gulp');
const rollup = require('rollup');
const htmlmin = require('gulp-htmlmin');
const newer = require('gulp-newer');
const eslint = require('gulp-eslint');

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
			rollupPlugins.minifyHtml(),
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

gulp.task('eslint', () => {
	return gulp.src(
		'./src/**/*.ts'
	).pipe(
		eslint({
			configFile: './.eslint.js',
		})
	).pipe(
		eslint.format()
	).pipe(
		eslint.failAfterError()
	);
});

gulp.task('html', () => {
	return gulp.src('./src/**/*.html').pipe(
		newer('./dist/')
	).pipe(htmlmin({
		collapseBooleanAttributes: true,
		collapseInlineTagWhitespace: false,
		collapseWhitespace: true,
		decodeEntities: true,
		sortAttributes: true,
		maxLineLength: 79,
	})).pipe(gulp.dest(
		'./dist/'
	));
});

gulp.task('default', gulp.series(...[
    'eslint',
    'html',
    gulp.parallel(...[
        'rollup--init',
        'rollup--worker',
    ]),
]));
