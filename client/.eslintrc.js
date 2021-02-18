module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true,
	},

	extends: [
		// README: https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md
		'eslint-config-standard',
		'plugin:eslint-plugin-vue/essential',
		'plugin:eslint-plugin-prettier/recommended',
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	plugins: [],
	rules: {},
}
