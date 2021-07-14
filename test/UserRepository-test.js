import { expect } from 'chai';
import UserRepository from '../src/UserRepository';
import User from '../src/User';
import {
  activityData,
  hydrationData,
  sleepData
} from '../src/data/sampleData';

import {
  userData
} from '../src/data/users.js';
console.log(userData)


describe('User Repository', () => {
  let users, userRepo, user1, user2;
  beforeEach(()=> {
    users = userData
    userRepo = new UserRepository(users);
  })
  it('should be a function', function () {
    expect(UserRepository).to.be.a('function');
  });

  it('Should be instance of UserRepository', () => {
    expect(userRepo).to.be.instanceof(UserRepository);
  });

  it('Should have all user/s credentials', () => {
    expect(userRepo.users).to.deep.equal(users);
    expect(userRepo.users.length).to.equal(50)
  });

  it('Should user/s data by it/s own unique id', () => {
    expect(userRepo.getUser(1)).to.equal(userData[0]);
  });

  it('Should return the average step goal amongst all users', () => {
    expect(userRepo.getAvgStepGoalOfAllUsers()).to.equal(6700);
  });

  it('Should return how much average water consumed for all times', () => {
    expect(userRepo.waterConsumedAllTime(hydrationData)).to.equal(65);
  });

  it('Should find how many fluid ounces of water consumed each day over the course of a week', () => {
    expect(userRepo.waterConsumedOverWeek(hydrationData).length).to.equal(7);
  });

  it('Should find a user/s average sleep quality per day over all time', () => {
    expect(userRepo.getAvgSleepQualityOfUser(sleepData)).to.equal(2.614285714285714);
  });

  it('Should find a user/s hours slept each day over the course of a given week', () => {
    expect(userRepo.getHoursSleptOverWeek(sleepData, 1, "2019/06/15", "2019/06/16", "2019/06/17", "2019/06/18", "2019/06/19", "2019/06/20", "2019/06/21")).to.deep.equal([6.1, 4.1, 8, 10.4, 10.7, 9.3, 7.8]);
  });

  it('Should find a user/s sleep quality for each day over the course of a given week', () => {
    expect(userRepo.getSleepQualityForWeek(sleepData, 1, "2019/06/15", "2019/06/16", "2019/06/17", "2019/06/18", "2019/06/19", "2019/06/20", "2019/06/21")).to.deep.equal([2.2, 3.8, 2.6, 3.1, 1.2, 1.2, 4.2]);
  });

});

