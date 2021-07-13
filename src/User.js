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

    let goals = userData.reduce((num, currentVal ) => {
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
}

module.exports = User;
