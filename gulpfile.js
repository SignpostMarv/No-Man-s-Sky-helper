const gulp = require('gulp');
const rollup = require('rollup');
const htmlmin = require('gulp-htmlmin');
const newer = require('gulp-newer');
const eslint = require('gulp-eslint');
const postcss = require('gulp-postcss');

const rollupPlugins = {
	commonjs: require('@rollup/plugin-commonjs'),
	nodeResolve: require('@rollup/plugin-node-resolve'),
	jsonResolve: require('@rollup/plugin-json'),
	typescript: require('@rollup/plugin-typescript'),
	minifyHtml: require('rollup-plugin-minify-html-literals').default,
};

const postcssPlugins = {
	calc: require('postcss-calc'),
	cssnano: require('cssnano'),
    fontFamilySystemUi: require('postcss-font-family-system-ui'),
	fontFamilySystemMonospace: require('postcss-system-monospace'),
    import: require('postcss-import'),
    nested: require('postcss-nested'),
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

gulp.task('css', () => {
	return gulp.src('./src/**/*.css').pipe(
		postcss([
			postcssPlugins.import(),
			postcssPlugins.nested(),
			postcssPlugins.calc(),
			postcssPlugins.fontFamilySystemUi(),
			postcssPlugins.fontFamilySystemMonospace(),
			postcssPlugins.cssnano({
				cssDeclarationSorter: 'concentric-css',
			}),
		]),
	).pipe(
		gulp.dest('./dist/')
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
    gulp.parallel(...[
		'html',
		'css',
        'rollup--init',
        'rollup--worker',
    ]),
]));
