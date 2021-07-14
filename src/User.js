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

  avgData(currentData, property, date) {
    // check first to make sure user id from given data matches this.id;
    let array = currentData.filter(data => data.userID === this.id)

    // run condition to check if given date data is a string or number
    if (typeof date === "string") {
      // console.log('YOOO');
      array = array.filter(data => data.date === date);
      // console.log('DIS THE ARRAY',array);
      if (!array.length) {
        return 0;
      }
      // check if date is instance of the array if it is we want to get data, if its not
      // just leave array emty;
    } else if (date instanceof Array) {
      array = array.filter(data => date.some(date => data.date === date));
      if (!array.length) {
        return 0;
      }
    }
    // else, we want to iterate over array and match the property of the data
    // and we want to add data together and devide to the length of arrays length, to get avg num;
    return array.map(data => data[property]).reduce((total, currentVal) =>
      total + currentVal) / array.length;
  }

  getAvgFluidCons(currentData, property, date) {
    let avgFluid = this.avgData(currentData, property, date);
    // console.log(avgFluid);
    return avgFluid;
  }

  hrsSleptQuality(currentData, property, date) {
    let hrs = this.avgData(currentData, property, date);
    // console.log(hrs)
    return hrs;
  }

  mostSleptUser(sleepData, userData, date) {
    let hrs = []
    let user = userData.reduce((userName, currentVal) => {
      sleepData.forEach(data => {
        if ((data.userID === currentVal.id) &&
          (data.date === date)) {
          hrs.push(data.hoursSlept)
        }
        if (hrs.length > 0) {
          hrs.forEach(hr => {
            if (hr >= data.hoursSlept) {
              userName = currentVal.name;
            }
          })
        }
      })

      return userName;
    }, '');
    return user;
  }

  numSteps(activityData, property, date) {
    let steps = this.avgData(activityData, property, date);
    return steps;
  }

  stepsActiveDay(activityData, userData, date, id) {
    const userStride = userData[id - 1].strideLength;
    let steps = this.avgData(activityData, 'numSteps', date);
    let convertToMiles = parseFloat(((steps * userStride) / 5280).toFixed(2))
    return convertToMiles;

  }

  activeMinutes(activityData, property, date) {
    let activity = this.avgData(activityData, property, date);
    return activity;
  }

  dailyStepGoals(activityData, userData, property, date, id) {
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
  waterConsumedAllTime(hydrationData) {
    /// i think we need to check here maybe users id, because we are checking this
    //for specific user
    let hydrationAvg = hydrationData.reduce((total, userHydration) => {
      return total + userHydration.numOunces
    }, 0)
    return Math.round(hydrationAvg / hydrationData.length)
  }

  getAvgSleepQualityOfUser(sleepData) {
    const totalSleepQualityOfUser = sleepData.reduce((sleep, day) => {
      return sleep += day.sleepQuality;
    }, 0);
    return Math.round(totalSleepQualityOfUser / sleepData.length);
  }


  waterConsumedOverWeek(hydrationData, property) {
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
    // console.log(waters);
    return waters;
  }

  getHoursSleptOverWeek(sleepData, property) {
    let result = this.waterConsumedOverWeek(sleepData, property)
    // console.log('Here', result)
    return result;
  }

  getSleepQualityForWeek(sleepData, property) {
    let result = this.waterConsumedOverWeek(sleepData, property);
    // console.log('here', result)
    return result;
  }

  getMinActiveForWeek(activityData, id, day1, day2, day3, day4, day5, day6, day7) {
    let dailyActivity = [];
    activityData.forEach(day => {
      if (this.getWeek()) {
        if (day.userID === id) {
          dailyActivity.push(day.minutesActive);
        }
      }
    })
    return (dailyActivity.reduce((dayA, dayB) => (dayA + dayB), 0)) / 7;
  }

}

module.exports = User;

//// THESE METHODS ARE DONE IN THIS CLASS //////

// A `User` represents a single user
// - [x]  It should have a parameter to take in a `userData` object
// - [x]  Each user holds on to the user properties from the data file
// - [x]  Should have a method to:
// - [x]  Return a user’s first name only
// [x]  For a user, how many fluid ounces they consumed for a specific day (identified by a date)
//- [x]  For a given day (identified by the date), find the users who slept the most number of hours (one or more if they tied)
//[x]  For a user (identified by their `userID`), the average number of hours slept per day
// - [x]  For a user, how many hours they slept for a specific day (identified by a date)
// - [x]  For a user, their sleep quality for a specific day (identified by a date)
// - [x]  For a user, the distance they have walked (in miles) for the latest day based on their step count
// - [x]  For a user, the number minutes active for the latest day
//   [X]  For a user, the number of steps for the latest day


/// Methods to use in UserRepository Class/////
// [ ]  `new UserRepository(data);`
// - [X]  A `UserRepository` holds onto all of the `User` objects
// - [X]  It should have a parameter to take in user `data`
// - [X]  It should have methods to determine:
// - [X]  Given a user’s ID, what is their user data?
// - [x]  The average step goal amongst all users
//- [X]  For a user (identified by their `userID` - this is the same for all methods requiring a specific user’s data), the average fluid ounces consumed per day for all time
//[X]  For a user, how many fluid ounces of water consumed each day over the course of a week (7 days) - return the amount for each day
//- [x]  For a user, their average sleep quality per day over all time
//- [ ]  For a user, their sleep data over the course of the latest week (hours slept and quality of sleep)
//- [ ]  For a user, their all-time average sleep quality and all-time average number of hours slept
//- [x]  For a user, how many hours slept each day over the course of a given week (7 days) - you should be able to calculate this for any week, not just the latest week
// - [x]  For a user, their sleep quality each day over the course of a given week (7 days) - you should be able to calculate this for any week, not just the latest week
// - [x]  For all users, the average sleep quality
// - [ ]  Find all users who average a sleep quality greater than `3` for a given week (7 days) - you should be able to calculate this for any week, not just the latest week
// - [x]  For a user, how many minutes active did they average for a given week (7 days)?
//- [ ]  For a user, find their all-time stair climbing record