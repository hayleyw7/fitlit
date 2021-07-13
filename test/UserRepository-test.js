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
  let user, userRepo;
  beforeEach(()=> {
  
  })
  it('should be a function', function () {
    expect(UserRepository).to.be.a('function');
  });
});
