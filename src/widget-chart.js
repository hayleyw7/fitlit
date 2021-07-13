// SINGLE USER GOAL CHART //









/// USER GOAL VS OTHER USERS ///

const data = {
  labels: ['fara', 'Hayley'],
  datasets: [{
    backgroundColor: 'rgb(224, 117, 129)',
    data: [40, 400],
  }]
};

const config = {
  type: 'horizontalBar',
  data,
  options: {
    tooltips: {
      enabled: false
    },
    hover: {
      mode: null
    },
    legend: {
      display: false
    }
  }
};

var myChart = new Chart(
  document.getElementById('myGoalChart'),
  config
);