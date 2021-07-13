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
    user1 = new User(userData[0])
    user2 = new User(userData[1])
    users = []
    users.push(user1, user2)
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
  });
});
