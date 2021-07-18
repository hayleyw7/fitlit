class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.address = userData.address;
    this.email = userData.email;
    this.strideLength = userData.strideLength;
    this.dailyStepGoal = userData.dailyStepGoal;
    this.friends = userData.friends;
  }

  getName() {
    return this.name.split(' ')[0];
  }

  /// HYDRATION DATA METHODS ///

  dailyTrackOfData(hydrationData, property, date) {
    let fluid = hydrationData.find(currentData => {
      if ((currentData.date === date) && (currentData.userID === this.id)) {
        return currentData[property];
      }
    })
    return fluid[property];
  }

  allTimeTrackOfData(hydrationData, property) {
    let num = 0;
    let hydrationAvg = hydrationData.reduce((total, userHydration) => {
      if (userHydration.userID === this.id) {
        num += 1
        total += userHydration[property]
      }
      return total
    }, 0);
    return Math.ceil(hydrationAvg / num)
  }

  trackOfDataOverWeek(hydrationData, property) {
    let hydration = hydrationData.sort((a, b) => a.date - b.date);
    let perChunk = 7 // items per chunk
    let inputArray = hydration
    let result = inputArray.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / perChunk)
      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [] // start a new chunk
      }
      resultArray[chunkIndex].push(item.date)
      return resultArray
    }, [])
    let week = result.flat();
    let waters = hydrationData.reduce((hydrate, currentVal) => {
      if (currentVal.userID === this.id) {
        if (week.includes(currentVal.date)) {
          hydrate.push({
            date: currentVal.date,
            [property]: currentVal[property]
          });
        }
      }
      return hydrate;
    }, [])
    return waters;
  }

  /// SLEEP DATA ///

  hrsOfSleep(sleepData, property, date) {
    let hrs = this.dailyTrackOfData(sleepData, property, date)
    return hrs;
  }

  sleepQuality(sleepData, property, date) {
    let sleepQuality = this.dailyTrackOfData(sleepData, property, date)
    return sleepQuality;
  }

  getAvgSleep(sleepData, property) {
    let avgHrs = this.allTimeTrackOfData(sleepData, property);
    return avgHrs;
  }

  avgSleepQuality(sleepData, property) {
    let sleepQuality = this.allTimeTrackOfData(sleepData, property);
    return sleepQuality;
  }

  getHoursSleptOverWeek(sleepData, property) {
    let result = this.trackOfDataOverWeek(sleepData, property)
    return result;
  }

  getSleepQualityForWeek(sleepData, property) {
    let result = this.trackOfDataOverWeek(sleepData, property);
    return result;
  }

  /// ATIVITY ///

  numSteps(activityData, property, date) {
    let steps = this.dailyTrackOfData(activityData, property, date);
    // console.log('Steps in current day', steps)
    return steps;
  }

  activeMinutes(activityData, property, date) {
    let activity = this.dailyTrackOfData(activityData, property, date);
    // console.log('minutes active for day', activity)
    return activity;
  }

  stepsCountInMiles(activityData, userData, date) {
    const userStride = this.strideLength;
    let steps = this.dailyTrackOfData(activityData, 'numSteps', date);
    let convertToMiles = parseFloat(((steps * userStride) / 5280).toFixed(2))
    return convertToMiles;

  }

  getMinActiveForWeek(activityData, property) {
    let result = this.trackOfDataOverWeek(activityData, property);
    return result;
  }

  reachedStepGoals(activityData, userData, property, date) {
    let steps = activityData.reduce((num, currentVal) => {
      if ((currentVal.userID === this.id) && (currentVal.date === date)) {
        num = currentVal.numSteps;
      }
      return num;
    }, 0);

    let goals = userData.reduce((num, currentVal) => {
      if (currentVal.id === this.id) {
        num = currentVal[property];
      }
      return num;
    }, 0);

    if (steps >= goals) {
      return `You reached your daily goal!`
    } else {
      return `You are almost there, you have ${goals - steps} left!`
    }
  }

  exceededStepGoal(activityData, property) {
    let daysOfReached = activityData.reduce((arr, currentVal) => {
      if ((currentVal.userID === this.id) && (currentVal[property] > this.dailyStepGoal)) {
        arr.push(currentVal.date)
      }
      return arr
    }, []);
    return daysOfReached;
  }

  allTimeRecord(activityData) {
    let highestStairCount =
      activityData.sort((a, b) => a.flightsOfStairs > b.flightsOfStairs ? -1 : 1);
    return highestStairCount[0].flightsOfStairs;
  }

  findAllActivityOnWeek(activityData, property) {
    let weeklyMinutes = this.trackOfDataOverWeek(activityData, property);
    let weeklySteps = this.trackOfDataOverWeek(activityData, 'numSteps');
    let weeklyFlight = this.trackOfDataOverWeek(activityData, 'flightsOfStairs');
    // console.log(weeklyMinutes, weeklySteps, weeklyFlight)
    let getData = weeklyMinutes.reduce((obj, currentVal) => {
      weeklySteps.forEach(date => {
        weeklyFlight.forEach(flights => {
          obj.totalSteps += date.numSteps;
          obj.totalMinutes += currentVal.minutesActive;
          obj.totalStairs += flights.flightsOfStairs;
        })
      })
      return obj
    }, {
      totalSteps: 0,
      totalMinutes: 0,
      totalStairs: 0
    });
    console.log(getData)
    return getData
  }

}

module.exports = User;