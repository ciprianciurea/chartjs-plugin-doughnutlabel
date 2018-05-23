DEFAULT_COLORS1 = ['#f08700', '#f49f0a', '#efca08', '#00a6a6', '#bbdef0'];
DEFAULT_COLORS2 = ['#7fb7be', '#357266', '#dacc3e', '#bc2c1a', '#7d1538'];

// Doughnut with multiple lines of text in the center
var ctx =  document.getElementById("chart1").getContext("2d");
new Chart(ctx, {
	type: 'doughnut',
	data: {
		datasets: [{
			data: [4000, 3000, 2000, 1000],
			backgroundColor: DEFAULT_COLORS1,
			label: 'Dataset 1'
		}],
		labels: ["Item one", "Item two", "Item three", "Item four"]
	},
	options: {
		responsive: true,
		legend: {
			position: 'top',
		},
		title: {
			display: true,
			fontSize: 20,
			text: 'Doughnut Chart with multiple lines of text in the center'
		},
		animation: {
			animateScale: true,
			animateRotate: true
		},
		plugins: {
			doughnutlabel: {
				labels: ['The title', 'The subtitle', '$100.000', '95%'],
				font: {
					size: '60'
				},
				color: 'grey'						
			}
		}
	}
});

// Doughnut with one line of text in the center
var ctx =  document.getElementById("chart2").getContext("2d");
new Chart(ctx, {
	type: 'doughnut',
	data: {
		datasets: [{
			data: [4000, 3000, 2000, 1000],
			backgroundColor: DEFAULT_COLORS2,
			label: 'Dataset 1'
		}],
		labels: ["Item one", "Item two", "Item three", "Item four"]
	},
	options: {
		responsive: true,
		legend: {
			position: 'top',
		},
		title: {
			display: true,
			fontSize: 20,
			text: 'Doughnut Chart with one line of text in the center'
		},
		animation: {
			animateScale: true,
			animateRotate: true
		},
		plugins: {
			doughnutlabel: {
				labels: ['This is one line of text'],
				font: {
					size: '60'
				},
				color: '#bc2c1a'						
			}
		}
	}
});
