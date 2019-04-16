'use strict';

var DEFAULT_COLORS1 = ['#f08700', '#f49f0a', '#efca08', '#00a6a6', '#bbdef0'];
var DEFAULT_COLORS2 = ['#7fb7be', '#357266', '#dacc3e', '#bc2c1a', '#7d1538'];

var randomScalingFactor = function() {
	return Math.round(Math.random() * 100);
};

document.getElementById('randomizeData').addEventListener('click', function() {
	myChart3.config.data.datasets[0].data = [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()];
	myChart3.update();
});

var getTotal = function(myChart) {
	var sum = myChart.config.data.datasets[0].data.reduce((a, b) => a + b, 0);
	return `Total: ${sum}`;
}

// Doughnut with multiple lines of text in the center
var ctx = document.getElementById('chart1').getContext('2d');
new Chart(ctx, {
	type: 'doughnut',
	data: {
		datasets: [{
			data: [4000, 3000, 2000, 1000],
			backgroundColor: DEFAULT_COLORS1,
			label: 'Dataset 1'
		}],
		labels: ['Item one', 'Item two', 'Item three', 'Item four']
	},
	options: {
		responsive: true,
		legend: {
			display: false,
			position: 'top',
		},
		title: {
			display: true,
			fontSize: 20,
			text: 'Multiple lines of text'
		},
		animation: {
			animateScale: true,
			animateRotate: true
		},
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
						text: 'The subtitle',
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

// Doughnut with one line of text in the center
ctx = document.getElementById('chart2').getContext('2d');
new Chart(ctx, {
	type: 'doughnut',
	data: {
		datasets: [{
			data: [4000, 3000, 2000, 1000],
			backgroundColor: DEFAULT_COLORS2,
			label: 'Dataset 1'
		}],
		labels: ['Item one', 'Item two', 'Item three', 'Item four']
	},
	options: {
		responsive: true,
		legend: {
			display: false,
			position: 'top',
		},
		title: {
			display: true,
			fontSize: 20,
			text: 'One line of text'
		},
		animation: {
			animateScale: true,
			animateRotate: true
		},
		plugins: {
			doughnutlabel: {
				labels: [
					{
						text: 'This is one line of text',
						font: {
							size: '60',
							family: 'Arial, Helvetica, sans-serif',
							style: 'italic',
							weight: 'bold'
						},
						color: '#bc2c1a'
					}
				]
			}
		}
	}
});

// Doughnut with one line of text in the center
ctx = document.getElementById('chart3').getContext('2d');
var myChart3 = new Chart(ctx, {
	type: 'doughnut',
	data: {
		datasets: [{
			data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()],
			backgroundColor: DEFAULT_COLORS2,
			label: 'Dataset 1'
		}],
		labels: ['Item one', 'Item two', 'Item three', 'Item four']
	},
	options: {
		responsive: true,
		legend: {
			display: false,
			position: 'top',
		},
		title: {
			display: true,
			fontSize: 20,
			text: 'Calculated value'
		},
		animation: {
			animateScale: true,
			animateRotate: true
		},
		plugins: {
			doughnutlabel: {
				labels: [
					{
						text: getTotal,
						font: {
							size: '60',
							family: 'Arial, Helvetica, sans-serif',
							style: 'italic',
							weight: 'bold'
						},
						color: '#bc2c1a'
					}
				]
			}
		}
	}
});
