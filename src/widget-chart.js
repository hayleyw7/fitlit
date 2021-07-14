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

// USER STEPS/MILES/MINUTESACTIVE FOR A DAY WIDGET/////

const stepsMinsMiles = {
  labels: [
    'Steps',
    'Miles',
    'Active Minutes'
  ],
  datasets: [{
    label: 'Activity',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
};

const activityChart = {
  type: 'pie',
  data: stepsMinsMiles,
};

let activeChart = new Chart(
  document.getElementById('activity-chart'),
  activityChart
)






// / USER HYDRATION CHART /////

const waterInDay = {
  labels: [
    'Oz water consumed today'
  ],
  datasets: [{
    label: 'Oz of Water',
    data: [11],
    backgroundColor: 'rgb(54, 162, 235)'
  }]
};

const waterConfig = {
  type: 'polarArea',
  data: waterInDay,
};

let waterChart = new Chart(
  document.getElementById('hydration-chart'),
  waterConfig
)