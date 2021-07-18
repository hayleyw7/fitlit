// COLORS - DELETE LATER

// GREEN - rgb(172, 224, 117)
// RED - rgb(224, 117, 129)
// YELLOW - rgb(245, 200, 127)
// BLUE - rgb(127, 182, 245)
// PURPLE - rgb(195, 177, 225)
// WHITE - rgb(255,255,255)
// BLACK - rgb(0, 0, 0)

// GOALS - SINGLE USER GOAL CHART //

export const userStepGoal = (currentUser) => {

  let steps = currentUser.dailyStepGoal;
  const stepGoal = {
    labels: ['Steps'],
    datasets: [{
      label: 'My First Dataset',
      data: [steps],
      backgroundColor: 'rgb(127, 182, 245)',
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
  return steps
}


/// GOALS - USER GOAL VS OTHER USERS ///

export const userAvgStepGoalVsOthers = (usersData, stepGoal) => {

  let avgStepGoal = usersData.getAvgStepGoalOfAllUsers()
  const data = {
    labels: ['Community', 'You'],
    datasets: [{
      backgroundColor: 'rgb(172, 224, 117)',
      data: [avgStepGoal, stepGoal],
      label: 'Steps',
    }]
  };

  const config = {
    type: 'horizontalBar',
    data,
    options: {
      hover: {
        mode: null
      },
      legend: {
        display: false
      }
    }
  };

  let myChart = new Chart(
    document.getElementById('myGoalChart'),
    config
  );
  return myChart;
}


///ACTIVITY - USER STEPS/MILES/MINUTESACTIVE FOR A DAY/////

export const stepMilesMinutesForDay =
  (currentUser, activityData, date, usersData) => {

    let numSteps = currentUser.numSteps(activityData, 'numSteps', date);
    let minsActive =
      currentUser.activeMinutes(activityData, 'minutesActive', date);
    let miles = currentUser.stepsCountInMiles(activityData, usersData, date);

    const stepsMinsMiles = {
      labels: [
        'Steps',
        'Miles',
        'Active Minutes'
      ],
      datasets: [{
        label: 'Latest day steps, miles, active minutes',
        data: [numSteps, miles, minsActive],
        backgroundColor: [
          'rgb(195, 177, 225)',
          'rgb(224, 117, 129)',
          'rgb(245, 200, 127)',

        ],
        hoverOffset: 4
      }]
    };

    const allActivityConfig = {
      type: 'doughnut',
      data: stepsMinsMiles,
    };

    let activeChart = new Chart(
      document.getElementById('activity-chart'),
      allActivityConfig
    )
    return activeChart;
  }


/// USERS ALL ACTIVITY VS COMMUNITY ///

export const allActivityForDayVsAll =
  (usersData, currentUser, activityData, date) => {

    let object = usersData.allActivityAvg(activityData, date)
    let minutes, steps, stairs;
    minutes = object.minutesActive;
    steps = object.numSteps;
    stairs = object.flightsOfStairs;
    let singleUser = activityData.find(user => {
      if (user.userID === currentUser.id) {
        return user
      }
    })

    const labels = ['Steps', 'Active Minutes', 'Stairs']
    const data = {
      labels,
      datasets: [{
          label: 'Community',
          data: [steps, minutes, stairs],
          backgroundColor: 'rgb(172, 224, 117)'
        },
        {
          label: 'You',
          data: [singleUser.numSteps, singleUser.minutesActive,
            singleUser.flightsOfStairs
          ],
          backgroundColor: 'rgb(127, 182, 245)'
        }
      ]
    };

    const actions = [{
      name: 'Randomize',
      handler(chart) {
        chart.data.datasets.forEach(dataset => {
          dataset.data = [{
            count: chart.data.labels.length,
            min: -100,
            max: 100
          }];
        });
        chart.update();
      }
    }, ];

    const config = {
      type: 'horizontalBar',
      data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Bar Chart'
          }
        }
      },
    };

    let allChart = new Chart(
      document.getElementById('activity2-chart'),
      config,
      actions
    )
    return allChart;
  }





/// HYDRATION - USER HYDRATION CHART /////

export const waterConsumptionDay = (currentUser, hydrationData, date) => {

  let water = currentUser.dailyTrackOfData(hydrationData, 'numOunces', date)
  const waterInDay = {
    labels: [
      'Oz water consumed today'
    ],
    datasets: [{
      label: 'Oz of Water',
      data: [water],
      backgroundColor: 'rgb(127, 182, 245)'
    }]
  };

  const waterConfig = {
    type: 'doughnut',
    data: waterInDay,
  };

  let waterChart = new Chart(
    document.getElementById('hydration-chart'),
    waterConfig
  )
  return water;
}

// HYDRATION - WEEKLY HYDRATION CHART /////

export const waterOverLatestWeek = (currentUser, hydrationData, property) => {
  let weeklyArray = currentUser.trackOfDataOverWeek(hydrationData, property)
  let spliced = weeklyArray.slice(194, -1)
  let date = spliced.map(date => date.date);
  let values = spliced.map(date => date.numOunces);
  const labels = date
  const waterOverWeek = {
    labels,
    datasets: [{
      label: 'Ounces',
      data: values,
      backgroundColor: [
        'rgba(127, 182, 245)',
        'rgba(172, 224, 117)',
        'rgba(224, 117, 129)',
        'rgba(245, 200, 127)',
        'rgba(195, 177, 225)',
        'rgba(127, 182, 245)',
        'rgba(172, 224, 117)',
      ],
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
      },
      hover: {
        mode: null
      },
      legend: {
        display: false
      }
    }
  };

  let waterOverWeekChart = new Chart(
    document.getElementById('hydration-chart1'),
    configWater
  )
}




// SLEEP WIDGETS //////
// HOURS AND QUALITY OF SLEEP FOR A DAY.

export const hoursQualitySleep = (currentUser, sleepData, date) => {
  let hrsSleep = currentUser.hrsOfSleep(sleepData, 'hoursSlept', date);
  let quality = currentUser.sleepQuality(sleepData, 'sleepQuality', date);
  const hoursQualitySleep = {
    labels: [
      'Hours',
      'Quality'
    ],
    datasets: [{
      label: 'Sleep',
      data: [hrsSleep, quality],
      backgroundColor: [
        'rgb(172, 224, 117)',
        'rgb(127, 182, 245)'
      ]
    }]
  };

  const sleepConfig = {
    type: 'doughnut',
    data: hoursQualitySleep,
  };

  let sleepChart = new Chart(
    document.getElementById('sleep-chart'),
    sleepConfig
  )
  return sleepChart;
}

// ALL TIME SLEEP QUALITY AND SLEEP HOURS FOR A SINGLE USER //

export const allTimeSleepQualityUser = (currentUser, sleepData) => {

  let avgAllHrs = currentUser.getAvgSleep(sleepData, 'hoursSlept');
  let avgQuality = currentUser.avgSleepQuality(sleepData, 'sleepQuality');

  const allTimeSleepQuality = {
    labels: [
      'Quality',
      'Hours',
    ],
    datasets: [{
      label: 'Data',
      data: [avgQuality, avgAllHrs],
      backgroundColor: [
        'rgb(224, 117, 129)',
        'rgb(195, 177, 225)',
      ],
      hoverOffset: 4
    }]
  };

  const allConfig = {
    type: 'doughnut',
    data: allTimeSleepQuality,
  };

  let sleepChart1 = new Chart(
    document.getElementById('sleep-chart2'),
    allConfig
  )
}

// USERS SLEEP QUALITY AND SLEEP HOURS FOR WEEK //

export const weeklySleepHrsQuality = (currentUser, sleepData) => {
  let sleepHrs = currentUser.getHoursSleptOverWeek(sleepData, 'hoursSlept');
  let slice = sleepHrs.slice(193);
  let dates = slice.map(date => date.date);
  let values = slice.map(values => values.hoursSlept);
  // console.log(dates, values)

  let sleepQuality = currentUser.getSleepQualityForWeek(sleepData, 'sleepQuality');
  let weeklyData = sleepQuality.slice(193);
  let quality = weeklyData.map(quality => quality.sleepQuality);
  console.log(quality)

  const labels = dates;
  const data = {
    labels,
    datasets: [{
        label: 'Sleep',
        data: values,
        backgroundColor: 'rgb(195, 177, 225)'
      },
      {
        label: 'Quality',
        data: quality,
        backgroundColor: 'rgb(224, 117, 129)'
      }
    ]
  };

  const actions = [{
    name: 'Randomize',
    handler(chart) {
      chart.data.datasets.forEach(dataset => {
        dataset.data = [{
          count: chart.data.labels.length,
          min: -100,
          max: 100
        }];
      });
      chart.update();
    }
  }, ];

  const sleepQualityConfig = {
    type: 'bar',
    data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Bar Chart'
        }
      }
    },
  };

  let allChart = new Chart(
    document.getElementById('sleepWeek-chart'),
    sleepQualityConfig,
    actions
  )
  return allChart;
}