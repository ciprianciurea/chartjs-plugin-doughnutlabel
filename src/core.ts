import {Chart} from 'chart.js';
import {resolve} from 'chart.js/helpers'
import utils from './utils';

const drawDoughnutLabel(chart, options) => {
  if (chart.chartArea && options && options.labels && options.labels.length > 0) {
    const {ctx, chartArea: {top, right, bottom, left}} = chart;
    const { labels } = options;
    const color = Chart.defaults.color;

    const innerLabels = [];
    labels.forEach(function (label) {
      const text =
        typeof label.text === "function" ? label.text(chart) : label.text;
      const innerLabel = {
        text: text,
        font: utils.parseFont(resolve([label.font, options.font, {}], ctx, 0)),
        color: resolve(
          [label.color, options.color, color],
          ctx,
          0
        ),
      };
      innerLabels.push(innerLabel);
    });

    let textAreaSize = utils.textSize(ctx, innerLabels);

    // Calculate the adjustment ratio to fit the text area into the doughnut inner circle
    const hypotenuse = Math.sqrt(
      Math.pow(textAreaSize.width, 2) + Math.pow(textAreaSize.height, 2)
    );
    const innerDiameter = chart.innerRadius * 2;
    const fitRatio = innerDiameter / hypotenuse;

    // Adjust the font if necessary and recalculate the text area after applying the fit ratio
    if (fitRatio < 1) {
      innerLabels.forEach(function (innerLabel) {
        innerLabel.font.size = Math.floor(innerLabel.font.size * fitRatio);
        innerLabel.font.lineHeight = undefined;
        innerLabel.font = utils.parseFont(
          resolve([innerLabel.font, {}], ctx, 0)
        );
      });

      textAreaSize = utils.textSize(ctx, innerLabels);
    }

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // The center of the inner circle
    const centerX = (left + right) / 2;
    const centerY = (top + bottom) / 2;

    // The top Y coordinate of the text area
    const topY = centerY - textAreaSize.height / 2;

    let i;
    const ilen = innerLabels.length;
    let currentHeight = 0;
    for (i = 0; i < ilen; ++i) {
      ctx.fillStyle = innerLabels[i].color;
      ctx.font = innerLabels[i].font.string;

      // The Y center of each line
      const lineCenterY =
        topY + innerLabels[i].font.lineHeight / 2 + currentHeight;
      currentHeight += innerLabels[i].font.lineHeight;

      // Draw each line of text
      ctx.fillText(innerLabels[i].text, centerX, lineCenterY);
    }
  }
}

const coreFunctions = {
  drawDoughnutLabel,
}

export default coreFunctions;
