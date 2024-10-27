// @ts-check

import { defineConfig, pvtnbr } from 'lintroll';

export default defineConfig([
	{
		ignores: [
			'tests/fixtures/**/*',
			'node_modules/**/*',
			'chrome-mv3/**/*',
			'.wxt/**/*',
			'.output/**/*',
		],
	},

	...pvtnbr({
		node: true,
	}),

	{
		rules: {
			'unicorn/filename-case': 'off',
		},
	},
]);
