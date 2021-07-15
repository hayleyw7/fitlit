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
  //
  // avgData(currentData, property, date) {
  //   // check first to make sure user id from given data matches this.id;
  //   let array = currentData.filter(data => data.userID === this.id)
  //
  //   // run condition to check if given date data is a string or number
  //   if (typeof date === "string") {
  //     // console.log('YOOO');
  //     array = array.filter(data => data.date === date);
  //     // console.log('DIS THE ARRAY',array);
  //     if (!array.length) {
  //       return 0;
  //     }
  //     // check if date is instance of the array if it is we want to get data, if its not
  //     // just leave array emty;
  //   } else if (date instanceof Array) {
  //     array = array.filter(data => date.some(date => data.date === date));
  //     if (!array.length) {
  //       return 0;
  //     }
  //   }
  //   // else, we want to iterate over array and match the property of the data
  //   // and we want to add data together and devide to the length of arrays length, to get avg num;
  //   return array.map(data => data[property]).reduce((total, currentVal) =>
  //     total + currentVal) / array.length;
  // }

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
    let hydrationAvg = hydrationData.reduce((total, userHydration) => {
      if (userHydration.userID === this.id) {
        total += userHydration[property]
      }
      return total
    }, 0)
    return Math.round(hydrationAvg / hydrationData.length)
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
    // console.log('all time sleep avg', avgHrs);
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

  stepsCountInMiles(activityData, userData, date, id) {
    const userStride = userData[id - 1].strideLength;
    let steps = this.dailyTrackOfData(activityData, 'numSteps', date);
    let convertToMiles = parseFloat(((steps * userStride) / 5280).toFixed(2))
    return convertToMiles;

  }


  getMinActiveForWeek(activityData, property) {
    let result = this.trackOfDataOverWeek(activityData, property);
    // console.log('Avg minutes active for given week', result)
    return result;
  }

  reachedStepGoals(activityData, userData, property, date, id) {
    let steps = activityData.reduce((num, currentVal) => {
      if ((currentVal.userID === id) && (currentVal.date === date)) {
        num = currentVal.numSteps;
      }
      return num;
    }, 0);

    let goals = userData.reduce((num, currentVal) => {
      if (currentVal.id === id) {
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


}

module.exports = User;

//// THESE METHODS ARE DONE IN THIS CLASS //////

// Create classes and methods that can calculate:

//[X] For a user (identified by their userID - this is the same for all methods requiring a specific user’s data), the average fluid ounces consumed per day for all time
//[X] For a user, how many fluid ounces they consumed for a specific day (identified by a date)
//[x] For a user, how many fluid ounces of water consumed each day over the course of a week (7 days) - return the amount for each day


// Create classes and methods that can calculate:
//
// [x] For a user (identified by their userID), the average number of hours slept per day
// [x] For a user, their average sleep quality per day over all time
// [x] For a user, how many hours they slept for a specific day (identified by a date)
// [x] For a user, their sleep quality for a specific day (identified by a date)
// [x] For a user, how many hours slept each day over the course of a given week (7 days) - you should be able to calculate this for any week, not just the latest week
// [x] For a user, their sleep quality each day over the course of a given week (7 days) - you should be able to calculate this for any week, not just the latest week


// Create classes and methods that can calculate:
// [x] For a specific day (specified by a date), return the miles a user has walked based on their number of steps (use their strideLength to help calculate this)
// [x] For a user, (identified by their userID) how many minutes were they active for a given day (specified by a date)?
// [x] For a user, how many minutes active did they average for a given week (7 days)?
// [x] For a user, did they reach their step goal for a given day (specified by a date)?
// [x] For a user, find all the days where they exceeded their step goal
// [x] For a user, find their all-time stair climbing record


// Dashboard
// Items to add to the dashboard:
//
// [x] For a user, the number of steps for the latest day
// [x] For a user, the number minutes active for the latest day
// [x] For a user, the distance they have walked (in miles) for the latest day based on their step count
// How their number of steps, minutes active, and flights of stairs climbed compares to all users for the latest day
// For a user, a weekly view of their step count, flights of stairs climbed, and minutes active