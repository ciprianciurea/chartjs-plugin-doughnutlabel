# Chart.js Doughnut plugin to allow for lines of text in the middle

Chart.js plugin module that allows to display multiple lines of text centered in the middle area of the doughnut charts 

## Demo
Have a look at the [Demo page](https://ciprianciurea.github.io/chartjs-plugin-doughnutlabel/samples/index.html).

## Table of contents

- [Installation](#installation)
- [Usage example](#usage)
- [Development](#development)
- [License](#license)

## Installation

Install through npm:
```
npm install --save chartjs-plugin-doughnutlabel
```

## Usage 

```
var myDoughnutChart = new Chart(ctx, {
  type: 'doughnut',
  data: data,
  options: {
    plugins: {
      doughnutlabel: {
        labels: [
          {
            text: 'The title',
            font: {
              size: '60'
            }
          },
          {
            text: getTotal,
            font: {
              size: '50'
            },
            color: 'grey'
          },
          {
            text: '$100.000',
            font: {
              size: '30'
            },
            color: 'red'
          },
          {
            text: '95%',
            font: {
              size: '45'
            },
          color: 'green'
          }
        ]
      }
    }		
  }
});

var getTotal = function(myDoughnutChart) {
	var sum = myDoughnutChart.config.data.datasets[0].data.reduce((a, b) => a + b, 0);
	return `Total: ${sum}`;
}
```

### Usage without a module bundler
The plugin can be manually downloaded from the 
[Releases page on GitHub!](https://github.com/ciprianciurea/chartjs-plugin-doughnutlabel/releases)
```
<script src="chartjs-plugin-doughnutlabel.js"></script>
```
or use the minified version
```
<script src="chartjs-plugin-doughnutlabel.min.js"></script>
```

## Development

You first need to install node dependencies (requires [Node.js](https://nodejs.org/)):

    > npm install

The following commands will then be available from the repository root:

    > gulp lint             // perform code linting
    > gulp build            // build dist files
    > gulp build --watch    // build and watch for changes
    > gulp package          // create an archive with dist files and samples

## In Angular

For an example on how to use this plugin with angular, please check this stackblitz prototype:
[doughnutlabel plugin in angular](https://stackblitz.com/edit/angular-v9tfg7)

## License

`chartjs-plugin-doughnutlabel` is available under the [MIT license](LICENSE.md).
