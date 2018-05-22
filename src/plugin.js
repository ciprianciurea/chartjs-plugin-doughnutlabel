'use strict';

import Chart from 'chart.js';
import defaults from './defaults';
import utils from './utils';

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
    var topY = centerY - textAreaSize.height / 2
  
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
  beforeDatasetDraw: function (chart, args, options) {
    drawDoughnutLabel(chart, options);
  },
});
