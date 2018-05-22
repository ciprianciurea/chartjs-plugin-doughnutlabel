export default {
	input: 'src/plugin.js',
	format: 'umd',
	external: [
		'chart.js'
	],
	globals: {
		'chart.js': 'Chart'
	}
};
