'use strict';

import Chart from 'chart.js';

var helpers = Chart.helpers;

var utils = {

	parseFont: function(value) {
		var global = Chart.defaults.global;
		var size = helpers.valueOrDefault(value.size, global.defaultFontSize);
		var font = {
			family: helpers.valueOrDefault(value.family, global.defaultFontFamily),
			lineHeight: helpers.options.toLineHeight(value.lineHeight, size),
			size: size,
			style: helpers.valueOrDefault(value.style, global.defaultFontStyle),
			weight: helpers.valueOrDefault(value.weight, null),
			string: ''
		};

		font.string = utils.toFontString(font);
		return font;
	},

	toFontString: function(font) {
		if (!font || helpers.isNullOrUndef(font.size) || helpers.isNullOrUndef(font.family)) {
			return null;
		}

		return (font.style ? font.style + ' ' : '')
			+ (font.weight ? font.weight + ' ' : '')
			+ font.size + 'px '
			+ font.family;
	},

	textSize: function(ctx, labels) {
		var items = [].concat(labels);
		var ilen = items.length;
		var prev = ctx.font;
		var width = 0;
		var height = 0;
		var i;

		for (i = 0; i < ilen; ++i) {
			ctx.font = items[i].font.string;
			width = Math.max(ctx.measureText(items[i].text).width, width);
			height += items[i].font.lineHeight;
		}

		ctx.font = prev;

		var result = {
			height: height,
			width: width
		};
		return result;
	}

};

export default utils;
