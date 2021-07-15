class UserRepository {
  constructor(userData) {
    this.users = userData;
    // console.log('here',
    //   this.users[0].getName())
  }

  getUser(id) {
    const currentUser = this.users.find(user => user.id === id)
    return currentUser;
  }

  getAvgStepGoalOfAllUsers() {
    const totalStepGoalOfAllUsers = this.users.reduce((steps, user) => {
      return steps += user.dailyStepGoal;
    }, 0);
    return totalStepGoalOfAllUsers / this.users.length;
  }

  avgSleepQuality(sleepData, property) {
    let avgQual = sleepData.reduce((quality, currentVal) => {
      this.users.forEach(user => {
        if (currentVal.userID === user.id) {
          quality += currentVal[property]
        }
      })
      return quality;
    }, 0)
    return Math.round(avgQual / sleepData.length);

  }

  allActivityAvg(activityData, date) {
    let avgActivity = activityData.reduce((obj, currentVal) => {
      this.users.forEach(user => {
        if ((user.id === currentVal.userID) && (!obj[currentVal]) && (currentVal.date === date)) {
          obj.flightsOfStairs = currentVal.flightsOfStairs;
          obj.numSteps = currentVal.numSteps;
          obj.minutesActive = currentVal.minutesActive;
        }
      })
      return obj;
    }, {})
    // console.log(avgActivity);
    return avgActivity;
  }

}

module.exports = UserRepository;

// Dashboard
// [x] The average step goal amongst all users


/// Sleep ////

//  For all users, the average sleep quality


/// Activity ////

// For all users, what is the average number of:
// stairs climbed for a specified date
// steps taken for a specific date
// minutes active for a specific date