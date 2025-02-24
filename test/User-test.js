import {
  expect
} from 'chai';
import User from '../src/User';
import {
  activityData,
  hydrationData,
  sleepData
} from '../src/data/sampleData';

import {
  userData
} from '../src/data/users.js';

describe('User', () => {
  let users, user1;
  beforeEach(() => {
    users = new User(userData);
    user1 = new User(userData[0]);
  });

  it('Should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('Should be an instance of User', () => {
    expect(users).to.be.instanceof(User);
  });

  it('Should have an id', () => {
    expect(user1.id).to.equal(userData[0].id);
  });

  it('Should have user/s name', () => {
    expect(user1.name).to.equal('Luisa Hane');
  });

  it('Should have user/s adress', () => {
    expect(user1.address).to.equal('15195 Nakia Tunnel, Erdmanport VA 19901-1697');
  });

  it('Should have user/s email', () => {
    expect(user1.email).to.equal('Diana.Hayes1@hotmail.com');
  });

  it('Should have user/s stride length', () => {
    expect(user1.strideLength).to.equal(4.3);
  });

  it('Should have user/s average step goal', () => {
    expect(user1.dailyStepGoal).to.equal(10000);
  });

  it('Should have user/s friends', () => {
    expect(user1.friends.length).to.deep.equal(3);
  });

  it('Should display user/s first name', () => {
    expect(user1.getName()).to.equal('Luisa');
  });

  it('Should get user/s water consume for day', () => {
    expect(user1.dailyTrackOfData(hydrationData, 'numOunces', '2019/06/15')).to.equal(37);
  });

  it('Should return how much average water consumed for all times', () => {
    expect(user1.allTimeTrackOfData(hydrationData, 'numOunces')).to.equal(65);
  });

  it('Should find how many fluid ounces of water consumed each day over the course of a week', () => {
    expect(user1.trackOfDataOverWeek(hydrationData, 'numOunces').length).to.equal(7);
  });

  it('Should return user/s slept hours for a day', () => {
    expect(user1.hrsOfSleep(sleepData, 'hoursSlept', '2019/06/15')).to.equal(6.1);
  });

  it('Should return user/s sleeping quality for a day', () => {
    expect(user1.sleepQuality(sleepData, 'sleepQuality', '2019/06/15')).to.equal(2.2);
  });

  it('Should find a user/s average hours of sleep per day over all time', () => {
    expect(user1.getAvgSleep(sleepData, 'hoursSlept')).to.equal(9);
  });

  it('Should find a user/s average sleep quality per day over all time', () => {
    expect(user1.avgSleepQuality(sleepData, 'sleepQuality')).to.equal(3);
  });

  it('Should find a user/s hours slept each day over the course of a given week', () => {
    expect(user1.getHoursSleptOverWeek(sleepData, 'hoursSlept').length).to.equal(7);
  });

  it('Should find a user/s sleep quality for each day over the course of a given week', () => {
    expect(user1.getSleepQualityForWeek(sleepData, 'sleepQuality').length).to.equal(7);
  });

  it('Should return number of teps taken for a day', () => {
    expect(user1.numSteps(activityData, 'numSteps', '2019/06/15')).to.equal(3577);
  });

  it('Should have users active minutes for a day', () => {
    expect(user1.activeMinutes(activityData, 'minutesActive', '2019/06/15')).to.equal(140);
  });

  it('Should have user/s steps for a day in miles', () => {
    expect(user1.stepsCountInMiles(activityData, userData, '2019/06/15')).to.equal(2.91);
  });

  it('Should find a user/s average minutes active per day over the course of a given week', () => {
    expect(user1.getMinActiveForWeek(activityData, 'minutesActive').length).to.equal(7);
  });

  it('Should check if user reached his/hers/them daily step goal for a day', () => {
    expect(user1.reachedStepGoals(activityData, userData, 'dailyStepGoal', '2019/06/15', 1)).to.equal(`You are almost there, you have 6423 left!`);
    // expect(user1.dailyStepGoals(activity, userData, 'dailyStepGoal', '2019/06/15', 1)).to.equal('You reached your daily goal!');
  });

  it('Should find all days where user exceeded their step goal', () => {
    expect(user1.exceededStepGoal(activityData, 'numSteps').length).to.equal(2);
  });

  it('Should find user/s all time stair climbing record', () => {
    expect(user1.allTimeRecord(activityData)).to.equal(36);
  });

  it('should check all activity total step, minutes active, and stairs climbed for week', () => {
    expect(user1.findAllActivityOnWeek(activityData).length).to.equal(3);
  });
});