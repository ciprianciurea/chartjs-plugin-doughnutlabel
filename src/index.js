import {Chart, registerables} from 'chart.js';
import DoughnutLabel from './plugin';

Chart.register(DoughnutLabel, ...registerables);

export default DoughnutLabel;
