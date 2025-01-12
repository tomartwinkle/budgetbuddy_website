
const ctx = document.getElementById('financial-growth').getContext('2d');


const data = {
  labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  datasets: [{
    label: 'Financial Growth',
    borderColor: 'green',
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
    data: [0, 10, 15, 25, 35, 50, 70, 85, 100, 120],
    fill: true,
    tension: 0.4, 
  }]
};


const options = {
  responsive: true,
  plugins: {
    tooltip: {
      callbacks: {
        label: function(tooltipItem) {
          return `Growth: $${tooltipItem.raw}`;
        }
      }
    }
  },
  scales: {
    x: {
      grid: {
        display: false,
      }
    },
    y: {
      beginAtZero: true,
      grid: {
        color: '#444'
      }
    }
  }
};


const chart = new Chart(ctx, {
  type: 'line',
  data: data,
  options: options
});


document.getElementById('part2').addEventListener('mouseover', function() {
  chart.update(); 
});
