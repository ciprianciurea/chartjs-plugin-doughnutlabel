import { drawDoughnutLabel } from "./core.ts";

export default {
  id: 'doughnutLabel',
  defaults: {
    font: {
      family: undefined,
      lineHeight: 1.2,
      size: 16,
      style: 'normal',
      weight: null
    },
  },
  beforeDraw: (chart, args, options) => drawDoughnutLabel(chart, options);
}
