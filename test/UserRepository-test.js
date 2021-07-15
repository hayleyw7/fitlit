import {
  expect
} from 'chai';
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


describe('User Repository', () => {
  let users, userRepo, allUsers;
  beforeEach(() => {
    allUsers = userData.map(user => new User(user))
    userRepo = new UserRepository(allUsers);
  })
  it('should be a function', function() {
    expect(UserRepository).to.be.a('function');
  });

  it('Should be instance of UserRepository', () => {
    expect(userRepo).to.be.instanceof(UserRepository);
  });

  it('Should have all user/s credentials', () => {
    expect(userRepo.users).to.deep.equal(allUsers);
    expect(userRepo.users.length).to.equal(50)
  });

  it('Should user/s data by it/s own unique id', () => {
    expect(userRepo.getUser(1)).to.equal(allUsers[0]);
  });

  it('Should return the average step goal amongst all users', () => {
    expect(userRepo.getAvgStepGoalOfAllUsers()).to.equal(6700);
  });

  it('Should return all users average sleep quality', () => {
    expect(userRepo.avgSleepQuality(sleepData, 'sleepQuality')).to.equal(3);
  });

  it('For all users, what is the average number of stairs climber, steps taken, minutes active for current day', () => {
    expect(userRepo.allActivityAvg(activityData, '2019/06/15')).to.equal('')
  });


});