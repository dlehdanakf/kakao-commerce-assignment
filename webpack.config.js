const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);
const path = require(`path`);
const fs = require(`fs`);

const srcPath = path.resolve(__dirname, `./src/`);
const distPath = path.resolve(__dirname, `./dist/`);

module.exports = (mode = `development`) => {
	return {
		mode,
		resolve: {
			extensions: [`.ts`, `.scss`],
			alias: {
				"@": srcPath
			}
		},
		module: {
			rules: [
				{
					test: /\.ts$/,
					exclude: /node_modules/,
					loader: `awesome-typescript-loader`,
					options: {
						useBabel: true,
						babelCore: `@babel/core`
					}
				},
				{
					test: /\.scss$/,
					use: [
						{ loader: MiniCssExtractPlugin.loader },
						{ loader: "css-loader" },
						{ loader: "sass-loader", options: { sourceMap: true, sassOptions: { outputStyle: `compressed` }}}
					]
				}
			]
		},
		plugins: [
			new MiniCssExtractPlugin({ filename: '[name].css' })
		],
		entry: {
			'script': `${srcPath}/scripts/script.ts`,
			'style': `${srcPath}/styles/style.scss`
		},
		output: {
			path: distPath,
			filename: `[name].js`
		}
	};
};
