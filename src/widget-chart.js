// SINGLE USER GOAL CHART //
const stepGoal = {
  labels: ['Steps'],
  datasets: [{
    label: 'My First Dataset',
    data: [100],
    backgroundColor: 'rgb(54, 162, 235)',
    color: 'blue'
  }]
};

const stepGoalDay = {
  type: 'doughnut',
  data: stepGoal,
};

let stepGoalChart = new Chart(
  document.getElementById('mySetGoalChart'),
  stepGoalDay
);

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