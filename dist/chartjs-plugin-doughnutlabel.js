(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('chart.js')) :
	typeof define === 'function' && define.amd ? define(['chart.js'], factory) :
	(factory(global.Chart));
}(this, (function (Chart) { 'use strict';

Chart = Chart && Chart.hasOwnProperty('default') ? Chart['default'] : Chart;

/**
 * @module Options
 */

'use strict';

var defaults = {
	/**
	 * The font options used to draw the label text.
	 * @member {Object|Array|Function}
	 * @prop {String} font.family - defaults to Chart.defaults.global.defaultFontFamily
	 * @prop {Number} font.lineHeight - defaults to 1.2
	 * @prop {Number} font.size - defaults to Chart.defaults.global.defaultFontSize
	 * @prop {String} font.style - defaults to Chart.defaults.global.defaultFontStyle
	 * @prop {Number} font.weight - defaults to 'normal'
	 * @default Chart.defaults.global.defaultFont.*
	 */
	font: {
		family: undefined,
		lineHeight: 1.2,
		size: undefined,
		style: undefined,
		weight: null
	}
};

'use strict';

var helpers$1 = Chart.helpers;

var utils = {

	parseFont: function(value) {
		var global = Chart.defaults.global;
		var size = helpers$1.valueOrDefault(value.size, global.defaultFontSize);
		var font = {
			family: helpers$1.valueOrDefault(value.family, global.defaultFontFamily),
			lineHeight: helpers$1.options.toLineHeight(value.lineHeight, size),
			size: size,
			style: helpers$1.valueOrDefault(value.style, global.defaultFontStyle),
			weight: helpers$1.valueOrDefault(value.weight, null),
			string: ''
		};

		font.string = utils.toFontString(font);
		return font;
	},

	toFontString: function(font) {
		if (!font || helpers$1.isNullOrUndef(font.size) || helpers$1.isNullOrUndef(font.family)) {
			return null;
		}

		return (font.style ? font.style + ' ' : '')
			+ (font.weight ? font.weight + ' ' : '')
			+ font.size + 'px '
			+ font.family;
	},

	textSize: function(ctx, lines, font) {
		var items = [].concat(lines);
		var ilen = items.length;
		var prev = ctx.font;
		var width = 0;
		var i;

		ctx.font = font.string;

		for (i = 0; i < ilen; ++i) {
			width = Math.max(ctx.measureText(items[i]).width, width);
		}

		ctx.font = prev;

		var result = {
			height: ilen * font.lineHeight,
			width: width
		};
		return result;
	}

};

'use strict';

var helpers = Chart.helpers;

Chart.defaults.global.plugins.doughnutlabel = defaults;

function drawDoughnutLabel(chart, options) {
	if (options && options.labels && options.labels.length > 0) {
		var ctx = chart.ctx;
		var resolve = helpers.options.resolve;
		var color = resolve([options.color, Chart.defaults.global.defaultFontColor], ctx, 0);
		var font = utils.parseFont(resolve([options.font, {}], ctx, 0));
		var textAreaSize = utils.textSize(ctx, options.labels, font);

		// Calculate the adjustment ratio to fit the text area into the doughnut inner circle
		var hypotenuse = Math.sqrt(Math.pow(textAreaSize.width, 2) + Math.pow(textAreaSize.height, 2));
		var innerDiameter = chart.innerRadius * 2;
		var fitRatio = innerDiameter / hypotenuse;

		// Adjust the font if necessary and recalculate the text area after applying the fit ratio
		if (fitRatio < 1) {
			font.size = Math.floor(font.size * fitRatio);
			font.lineHeight = undefined;
			font = utils.parseFont(resolve([font, {}], ctx, 0));
			textAreaSize = utils.textSize(ctx, options.labels, font);
		}

		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillStyle = color;
		ctx.font = font.string;

		// The center of the inner circle
		var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
		var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);

		// The top Y coordinate of the text area
		var topY = centerY - textAreaSize.height / 2;

		var i;
		var ilen = options.labels.length;
		for (i = 0; i < ilen; ++i) {
			// The Y center of each line
			var lineCenterY = topY + font.lineHeight / 2 + font.lineHeight * i;

			// Draw each line of text
			ctx.fillText(options.labels[i], centerX, lineCenterY);
		}
	}
}

Chart.plugins.register({
	id: 'doughnutlabel',
	beforeDatasetDraw: function(chart, args, options) {
		drawDoughnutLabel(chart, options);
	}
});

})));
