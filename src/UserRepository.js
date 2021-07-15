class UserRepository {
  constructor(userData) {
    this.users = userData;
  }

  // getWeek() {
  //   console.log(`day.date === day1 || day.date === day2 || day.date === day3 || day.date === day4 || day.date === day5 || day.date === day6 || day.date === day7`)
  //   return `day.date === day1 || day.date === day2 || day.date === day3 || day.date === day4 || day.date === day5 || day.date === day6 || day.date === day7`;
  // }

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


}

module.exports = UserRepository;




/// Sleep ////

//  For all users, the average sleep quality


/// Activity ////

// For all users, what is the average number of:
// stairs climbed for a specified date
// steps taken for a specific date
// minutes active for a specific date