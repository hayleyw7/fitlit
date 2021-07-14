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



  getAvgSleepQualityOfUser(sleepData) {
    const totalSleepQualityOfUser = sleepData.reduce((sleep, day) => {
      return sleep += day.sleepQuality;
    }, 0);
    return Math.round(totalSleepQualityOfUser / sleepData.length);
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

  getMinActiveForWeek(activityData, property) {
    let result = this.waterConsumedOverWeek(activityData, property);
    console.log('Here', result)
    return result;
  }
}

module.exports = User;

//// THESE METHODS ARE DONE IN THIS CLASS //////

// Create classes and methods that can calculate:

//[X] For a user (identified by their userID - this is the same for all methods requiring a specific user’s data), the average fluid ounces consumed per day for all time
//[X] For a user, how many fluid ounces they consumed for a specific day (identified by a date)
//[x] For a user, how many fluid ounces of water consumed each day over the course of a week (7 days) - return the amount for each day