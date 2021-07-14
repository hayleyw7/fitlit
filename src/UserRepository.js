
class UserRepository {
  constructor(userData) {
    this.users = userData;
  }

  getWeek() {
    return `day.date === day1 || day.date === day2 || day.date === day3 || day.date === day4 || day.date === day5 || day.date === day6 || day.date === day7`;
  }

  getUser(id) {
    const currentUser = this.users.find(user=> user.id === id)
    console.log(currentUser)
    return currentUser;
  }

  getAvgStepGoalOfAllUsers() {
    const totalStepGoalOfAllUsers = this.users.reduce((steps, user) => {
      return steps += user.dailyStepGoal;
    }, 0);
    return totalStepGoalOfAllUsers / this.users.length;
  }

  waterConsumedAllTime(hydrationData) {
    let hydrationAvg = hydrationData.reduce((total, userHydration) => {
      return total + userHydration.numOunces
    }, 0)
    return Math.round(hydrationAvg / hydrationData.length)
  }

  waterConsumedOverWeek(hydrationData) {
    let hydration = hydrationData.map(hydrate => {
      hydrate.userID === this.users.id;
      return hydrate.numOunces;
    })
    return hydration;
  }

  getAvgSleepQualityOfUser(sleepData) {
    const totalSleepQualityOfUser = sleepData.reduce((sleep, day) => {
      return sleep += day.sleepQuality;
    }, 0);
    return totalSleepQualityOfUser / sleepData.length;
  }

  // The next 3 functions will need refactored A LOT but it works if weeks are entered really strangely (AKA one day at a time). This is a start, & it's definitely fixable.

  getHoursSleptOverWeek(sleepData, id, day1, day2, day3, day4, day5, day6, day7) {
		let result = [];
		sleepData.forEach(day => {
			if (this.getWeek()) {
				if (day.userID ==== id) {
					result.push(day.hoursSlept);
				}
			}
		})
		return result;
	}

  getSleepQualityForWeek(sleepData, id, day1, day2, day3, day4, day5, day6, day7) {
		let result = [];
		sleepData.forEach(day => {
			if (this.getWeek()) {
				if (day.userID === id) {
					result.push(day.sleepQuality);
				}
			}
		})
		return result;
	}



  function getWeek() {
    return `day.date === day1 || day.date === day2 || day.date === day3 || day.date === day4 || day.date === day5 || day.date === day6 || day.date === day7`;
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

module.exports =  UserRepository;




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