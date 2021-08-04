import { ChartType, Plugin } from "chart.js";
import { Options } from './options';

declare module "chart.js" {
  interface PluginOptionsByType<TType extends ChartType> {
    /**
     * Per chart doughnutlabel plugin options.
     * @since 0.1.0
     */
    doughnutLabel?: Options;
  }
}

declare const DoughnutLabel: Plugin;

export default DoughnutLabel;
