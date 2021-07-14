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


const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const waterOverWeek = {
  labels: labels,
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};

const configWater = {
  type: 'bar',
  data: waterOverWeek,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  },
};

let waterOverWeekChart = new Chart(
  document.getElementById('hydration-chart1'),
  configWater
)



// SLEEP WIDGETS //////


const hoursQualitySleep = {
  labels: [
    'Hours of Sleep',
    'Quality of Sleep'
  ],
  datasets: [{
    label: 'Sleep',
    data: [11, 8],
    backgroundColor: [
      'rgb(75, 192, 192)',
      'rgb(201, 203, 207)'
    ]
  }]
};

const sleepConfig = {
  type: 'polarArea',
  data: hoursQualitySleep,
};

let sleepChart = new Chart(
  document.getElementById('sleep-chart'),
  sleepConfig
)