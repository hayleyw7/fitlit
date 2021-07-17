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
      // console.log(currentData[property])
      if ((currentData.date === date) && (currentData.userID === this.id)) {
        return currentData[property];
      }
    })
    // console.log('Ounces', fluid[property])
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
    // console.log(hydration);
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
    // console.log('Array of fluids for every day for week',waters);
    return waters;
  }

  /// SLEEP DATA ///

  hrsOfSleep(sleepData, property, date) {
    let hrs = this.dailyTrackOfData(sleepData, property, date)
    // console.log('sleep hours', hrs)
    return hrs;
  }

  sleepQuality(sleepData, property, date) {
    let sleepQuality = this.dailyTrackOfData(sleepData, property, date)
    // console.log('sleep hours', sleepQuality)
    return sleepQuality;
  }

  getAvgSleep(sleepData, property) {
    let avgHrs = this.allTimeTrackOfData(sleepData, property);
    return avgHrs;
  }

  avgSleepQuality(sleepData, property) {
    let sleepQuality = this.allTimeTrackOfData(sleepData, property);
    // console.log('all time sleep quality avg', sleepQuality);
    return sleepQuality;
  }
  getHoursSleptOverWeek(sleepData, property) {
    let result = this.trackOfDataOverWeek(sleepData, property)
    // console.log('weekly sleep', result)
    return result;
  }

  getSleepQualityForWeek(sleepData, property) {
    let result = this.trackOfDataOverWeek(sleepData, property);
    // console.log('weekly sleep quality', result)
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
    // console.log('days when they pass step goal', daysOfReached);
    return daysOfReached;
  }

  allTimeRecord(activityData) {
    let highestStairCount =
      activityData.sort((a, b) => a.flightsOfStairs > b.flightsOfStairs ? -1 : 1);
    return highestStairCount[0].flightsOfStairs;
  }

  findAllActivityOnWeekMin(activityData, date) {
    const findAllStuff = activityData.reduce((obj, currentVal) => {
      if ((currentVal.userID === this.id) && (date.includes(currentVal.date))) {
        obj.totalMinutes += currentVal.minutesActive;
        // obj.allSteps += currentVal.numSteps;
        // obj.allStairs += currentVal.flightsOfStairs;
      }
      return obj
    }, {
      totalMinutes: 0,
      // allSteps: 0,
      // allStairs: 0
    });
    
    return findAllStuff.totalMinutes;
  }

//   findAllActivityOnWeekSteps(activityData, date) {
//     const findAllStuff = activityData.reduce((obj, currentVal) => {
//       if ((currentVal.userID === this.id) && (date.includes(currentVal.date))) {
//         // obj.totalMinutes += currentVal.minutesActive;
//         obj.allSteps += currentVal.numSteps;
//         // obj.allStairs += currentVal.flightsOfStairs;
//       }
//       return obj
//     }, {
//       totalMinutes: 0,
//       // allSteps: 0,
//       // allStairs: 0
//     });

//     console.log(findAllStuff)
    
//     return findAllStuff.numSteps;
//   }
// }

  // findAllActivityOnWeekFlights(activityData, date) {
  //   const findAllStuff = activityData.reduce((obj, currentVal) => {
  //     if ((currentVal.userID === this.id) && (date.includes(currentVal.date))) {
  //       // obj.totalMinutes += currentVal.minutesActive;
  //       // obj.allSteps += currentVal.numSteps;
  //       obj.allStairs += currentVal.flightsOfStairs;
  //     }
  //     return obj
  //   }, {
  //     // totalMinutes: 0,
  //     // allSteps: 0,
  //     allStairs: 0
  //   });
    
  //   return findAllStuff.flightsOfStairs;
  // };
}

module.exports = User;

//// THESE METHODS ARE DONE IN THIS CLASS //////

/// HYDRATION DATA BULLET POINT ////

// Create classes and methods that can calculate:

//[X] For a user (identified by their userID - this is the same for all methods requiring a specific user’s data), the average fluid ounces consumed per day for all time
//[X] For a user, how many fluid ounces they consumed for a specific day (identified by a date)
//[x] For a user, how many fluid ounces of water consumed each day over the course of a week (7 days) - return the amount for each day

// Dashboard
// [x]For your user (or any user you choose), add:
// [x]A display to show how much water they have consumed today (these displays are often called “widgets” in the FE tech world)
//[x] A display to show much water they have consumed each day over the course of the latest week



// SLEEP DATA BULLET POINT////

// Create classes and methods that can calculate:
//
// [x] For a user (identified by their userID), the average number of hours slept per day
// [x] For a user, their average sleep quality per day over all time
// [x] For a user, how many hours they slept for a specific day (identified by a date)
// [x] For a user, their sleep quality for a specific day (identified by a date)
// [x] For a user, how many hours slept each day over the course of a given week (7 days) - you should be able to calculate this for any week, not just the latest week
// [x] For a user, their sleep quality each day over the course of a given week (7 days) - you should be able to calculate this for any week, not just the latest week


// Dashboard
// Items to add to the dashboard:

// [x]For a user, their sleep data for the latest day (hours slept and quality of sleep)
//[x] For a user, their sleep data over the course of the latest week (hours slept and quality of sleep)
// [x] For a user, their all-time average sleep quality and all-time average number of hours slept

//// ATIVITY DATA BULLET POINTS ////

// Create classes and methods that can calculate:
// [x] For a specific day (specified by a date), return the miles a user has walked based on their number of steps (use their strideLength to help calculate this)
// [x] For a user, (identified by their userID) how many minutes were they active for a given day (specified by a date)?
// [x] For a user, how many minutes active did they average for a given week (7 days)?
// [x] For a user, did they reach their step goal for a given day (specified by a date)?
// [x] For a user, find all the days where they exceeded their step goal
// [x] For a user, find their all-time stair climbing record


// Dashboard
// Items to add to the dashboard:
// [x] For a user, the number of steps for the latest day
// [x] For a user, the number minutes active for the latest day
// [x] For a user, the distance they have walked (in miles) for the latest day based on their step count
// [x] How their number of steps, minutes active, and flights of stairs climbed compares to all users for the latest day
// [x] For a user, a weekly view of their step count, flights of stairs climbed, and minutes active