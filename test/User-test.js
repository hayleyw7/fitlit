import { expect } from 'chai';
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
  let users, user1, user2;
  beforeEach(() => {
    users = new User(userData);
    user1 = new User(userData[0]);
    // user2 = new User(userData[1]);
  });

  it('Should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('Should be an instance of User', () => {
    expect(users).to.be.instanceof(User);
  });

  it('Should have an id', () => {
    expect(user1.id).to.equal(1);
    // expect(user2.id).to.equal(2);
  });

  it('Should have user/s name', () => {
    expect(user1.name).to.equal('Luisa Hane');
    // expect(user2.name).to.equal('Jarvis Considine');
  });

  it('Should have user/s adress', () => {
    // expect(user2.address).to.equal('30086 Kathryn Port, Ciceroland NE 07273');
    expect(user1.address).to.equal('15195 Nakia Tunnel, Erdmanport VA 19901-1697');
  });

  it('Should have user/s email', () => {
    expect(user1.email).to.equal('Diana.Hayes1@hotmail.com');
    // expect(user2.email).to.equal('Dimitri.Bechtelar11@gmail.com');
  });

  it('Should have user/s stride length', () => {
    expect(user1.strideLength).to.equal(4.3);
    // expect(user2.strideLength).to.equal(4.5);
  });

  it('Should have user/s average step goal', () => {
    expect(user1.dailyStepGoal).to.equal(10000);
    // expect(user2.dailyStepGoal).to.equal(5000);
  });

  it('Should have user/s friends', () => {
    expect(user1.friends.length).to.deep.equal(3);
    // expect(user2.friends.length).to.deep.equal(4);
  });

  it('Should display user/s first name', () => {
    expect(user1.getName()).to.equal('Luisa');
    // expect(user2.getName()).to.equal('Jarvis');
  });

  // it('Should check all data for all times', () => {
  //   expect(user1.avgData(hydration, 'numOunces', '2019/06/15' )).to.deep.equal('37')
  // })

  it('Should get user/s water consume for day', () => {
    expect(user1.getAvgFluidCons(hydrationData, 'numOunces', '2019/06/15')).to.equal(37);
    // expect(user2.getAvgFluidCons(hydrationData, 'numOunces', '2019/06/15')).to.equal(75);
  });

  it('Should return user/s slept hours for a day', () => {
    expect(user1.hrsSleptQuality(sleepData, 'hoursSlept', '2019/06/15')).to.equal(6.1);
    // expect(user2.hrsSleptQuality(sleepData, 'hoursSlept', '2019/06/15')).to.equal(7);
  });

  it('Should return user/s sleeping quality for a day', () => {
    expect(user1.hrsSleptQuality(sleepData, 'sleepQuality', '2019/06/15')).to.equal(2.2);
    // expect(user2.hrsSleptQuality(sleepData, 'sleepQuality', '2019/06/15')).to.equal(4.7);
  });

  it('Should return user who slept the most amongs other user/s for a day', () => {
    expect(users.mostSleptUser(sleepData, userData, '2019/06/15')).to.equal('Jordon Lind');
  });
  
  it('Should return number of teps taken for a day', () => {
    expect(user1.numSteps(activityData, 'numSteps', '2019/06/15')).to.equal(3577);
  });

  it('Should have user/s steps for a day in miles', () => {
    expect(user1.stepsActiveDay(activityData, userData, '2019/06/15', 1)).to.equal(2.91);
  });

  it('Should have users active minutes for a day', () => {
    expect(user1.activeMinutes(activityData, 'minutesActive', '2019/06/15')).to.equal(140);
    // expect(user2.activeMinutes(activityData, 'minutesActive', '2019/06/15')).to.equal(138);
  });

  it('Should check if user reached his/hers/them daily step goal for a day', () => {
    expect(user1.dailyStepGoals(activityData, userData, 'dailyStepGoal', '2019/06/15', 1)).to.equal(`You are almost there, you have 6423 left!`);
    // expect(user2.dailyStepGoals(activityData, userData, 'dailyStepGoal', '2019/06/15', 2)).to.equal(`You are almost there, you have 706 left!`);

    // expect(user1.dailyStepGoals(activity, userData, 'dailyStepGoal', '2019/06/15', 1)).to.equal('You reached your daily goal!');
    // expect(user2.dailyStepGoals(activity, userData, 'dailyStepGoal', '2019/06/15', 2)).to.equal('You reached your daily goal!');
  });

});
