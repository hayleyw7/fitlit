class UserRepository {
  constructor(userData) {
    this.users = userData;
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
    return avgActivity;
  }

}

module.exports = UserRepository;