import { expect } from 'chai';
import User from '../src/User';


describe.only('User', () => {
  let userData, hydration, sleep, activity, user, user1, user2;
  beforeEach(() => {

    userData = [
      {
        "id": 1,
        "name": "Luisa Hane",
        "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
        "email": "Diana.Hayes1@hotmail.com",
        "strideLength": 4.3,
        "dailyStepGoal": 10000,
        "friends": [
          16,
          4,
          8
        ]
      },
      {
        "id": 2,
        "name": "Jarvis Considine",
        "address": "30086 Kathryn Port, Ciceroland NE 07273",
        "email": "Dimitri.Bechtelar11@gmail.com",
        "strideLength": 4.5,
        "dailyStepGoal": 5000,
        "friends": [
          9,
          18,
          24,
          19
        ]
      }];

    hydration = [{
      "userID": 1,
      "date": "2019/06/15",
      "numOunces": 37
    },
    {
      "userID": 2,
      "date": "2019/06/15",
      "numOunces": 75
    }];

    sleep = [{
      "userID": 1,
      "date": "2019/06/15",
      "hoursSlept": 6.1,
      "sleepQuality": 2.2
    },
    {
      "userID": 2,
      "date": "2019/06/15",
      "hoursSlept": 7,
      "sleepQuality": 4.7
    }];

    activity = [{
      "userID": 1,
      "date": "2019/06/15",
      "numSteps": 3577,
      "minutesActive": 140,
      "flightsOfStairs": 16
    },
    {
      "userID": 2,
      "date": "2019/06/15",
      "numSteps": 4294,
      "minutesActive": 138,
      "flightsOfStairs": 10
    }];

    user = new User(userData);
    user1 = new User(userData[0]);
    user2 = new User(userData[1]);
  });

  it('Should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('Should be an instance of User', () => {
    expect(user).to.be.instanceof(User);
  });

  it('Should have an id', () => {
    expect(user1.id).to.equal(1);
    expect(user2.id).to.equal(2);
  });

  it('Should have user/s name', () => {
    expect(user1.name).to.equal('Luisa Hane');
    expect(user2.name).to.equal('Jarvis Considine');
  });

  it('Should have user/s adress', () => {
    expect(user2.address).to.equal('30086 Kathryn Port, Ciceroland NE 07273');
    expect(user1.address).to.equal('15195 Nakia Tunnel, Erdmanport VA 19901-1697');
  });

  it('Should have user/s email', () => {
    expect(user1.email).to.equal('Diana.Hayes1@hotmail.com');
    expect(user2.email).to.equal('Dimitri.Bechtelar11@gmail.com');
  });

  it('Should have user/s stride length', () => {
    expect(user1.strideLength).to.equal(4.3);
    expect(user2.strideLength).to.equal(4.5);
  });

  it('Should have user/s average step goal', () => {
    expect(user1.dailyStepGoal).to.equal(10000);
    expect(user2.dailyStepGoal).to.equal(5000);
  });

  it('Should have user/s friends', () => {
    expect(user1.friends.length).to.deep.equal(3);
    expect(user2.friends.length).to.deep.equal(4);
  });

  it('Should display user/s first name', () => {
    expect(user1.getName()).to.equal('Luisa');
    expect(user2.getName()).to.equal('Jarvis');
  });

  // it('Should check all data for all times', () => {
  //   expect(user1.avgData(hydration, 'numOunces', '2019/06/15' )).to.deep.equal('37')
  // })

  it('Should get users average water consumed all times', () => {
    expect(user1.getAvgFluidCons(hydration, 'numOunces', '2019/06/15')).to.equal(37);
    expect(user2.getAvgFluidCons(hydration, 'numOunces', '2019/06/15')).to.equal(75);
  });

  it('Should return user/s slept hours per day', () => {
    expect(user1.hrsSleptQuality(sleep, 'hoursSlept', '2019/06/15')).to.equal(6.1);
    expect(user2.hrsSleptQuality(sleep, 'hoursSlept', '2019/06/15')).to.equal(7);
  });

  it('Should return user/s sleeping quality', () => {
    expect(user1.hrsSleptQuality(sleep, 'sleepQuality', '2019/06/15')).to.equal(2.2);
    expect(user2.hrsSleptQuality(sleep, 'sleepQuality', '2019/06/15')).to.equal(4.7);
  });

  it('Should return user who slept the most amongs other user/s', () => {
    expect(user.mostSleptUser(sleep, userData, '2019/06/15')).to.equal('Jarvis Considine');
  });

  it('Should have user/s steps for a day in miles', () => {
    expect(user1.stepsActiveDay(activity, userData, '2019/06/15', 1)).to.equal(2.91);
  });

  it('Should have users active minutes for a day', () => {
    expect(user1.activeMinutes(activity, 'minutesActive', '2019/06/15')).to.equal(140);
    expect(user2.activeMinutes(activity, 'minutesActive', '2019/06/15')).to.equal(138);
  })
});
