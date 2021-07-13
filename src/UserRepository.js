
class UserRepository {
  constructor(userData) {
    this.users = userData;
  }
  getUser(id) {
    const currentUser = this.users.find(user=> user.id === id)
    console.log(currentUser)
    return currentUser;
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
}

module.exports =  UserRepository;




/// Methods to use in UserRepository Class/////
// [ ]  `new UserRepository(data);`
// - [X]  A `UserRepository` holds onto all of the `User` objects
// - [X]  It should have a parameter to take in user `data`
// - [X]  It should have methods to determine:
// - [X]  Given a user’s ID, what is their user data?
// - [ ]  The average step goal amongst all users
//- [X]  For a user (identified by their `userID` - this is the same for all methods requiring a specific user’s data), the average fluid ounces consumed per day for all time
 //[X]  For a user, how many fluid ounces of water consumed each day over the course of a week (7 days) - return the amount for each day
 //- [ ]  For a user, their average sleep quality per day over all time
 //- [ ]  For a user, their sleep data over the course of the latest week (hours slept and quality of sleep)
//- [ ]  For a user, their all-time average sleep quality and all-time average number of hours slept
//- [ ]  For a user, how many hours slept each day over the course of a given week (7 days) - you should be able to calculate this for any week, not just the latest week
// - [ ]  For a user, their sleep quality each day over the course of a given week (7 days) - you should be able to calculate this for any week, not just the latest week
// - [ ]  For all users, the average sleep quality
// - [ ]  Find all users who average a sleep quality greater than `3` for a given week (7 days) - you should be able to calculate this for any week, not just the latest week
// - [ ]  For a user, how many minutes active did they average for a given week (7 days)?
//- [ ]  For a user, find their all-time stair climbing record
