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


describe('User Repository', () => {
  let users, userRepo;
  beforeEach(()=> {
    users = new User(userData);
    userRepo = new UserRepository(users);
  })
  it('should be a function', function () {
    expect(UserRepository).to.be.a('function');
  });

  it('Should be instance of UserRepository', () => {
    expect(userRepo).to.be.instanceof(UserRepository);
  });
});
