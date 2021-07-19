// IMPORTS //
import './css/styles.css';
import './widget-chart.js';
import {
  userStepGoal
} from './widget-chart.js';
import {
  userAvgStepGoalVsOthers
} from './widget-chart.js';
import {
  stepMilesMinutesForDay
} from './widget-chart.js';
import {
  waterConsumptionDay
} from './widget-chart.js';
import {
  waterOverLatestWeek
} from './widget-chart.js';
import {
  allActivityForDayVsAll
} from './widget-chart.js';
import {
  hoursQualitySleep
} from './widget-chart.js';
import {
  allTimeSleepQualityUser
} from './widget-chart.js';
import {
  weeklySleepHrsQuality
} from './widget-chart.js';

import userData from './data/users';
import User from './User';
import UserRepository from './UserRepository';
import apiCalls from './apiCalls';


// *************** QUERY SELECTORS ************
const userName = document.getElementById('userName');
const userAddress = document.getElementById('userAddress');
const userEmail = document.getElementById('userEmail');
const totalStepsThisWeek = document.getElementById('totalStepsThisWeek');
const totalStairsThisWeek = document.getElementById('totalStairsThisWeek');
const totalMinThisWeek = document.getElementById('totalMinThisWeek');
const calendar = document.getElementById('dropDownCalendar');


// *************** GLOBAL VARIABLES ************

let activityData, hydrationData, usersData, sleepData, currentUser, allUsers, currentDate;
currentDate = calendar.max;

// *************** EVENT LISTENERS ************


window.addEventListener('load', function() {
  apiCalls.allData()
    .then(data => {
      allUsers = data[0].userData.map(user => new User(user));
      usersData = new UserRepository(allUsers);
      activityData = data[1].activityData;
      hydrationData = data[2].hydrationData;
      sleepData = data[3].sleepData;
      currentUser = usersData.users[getRandomIndex(usersData.users)];
      renderPage(currentUser, activityData, hydrationData, sleepData, convertDate(currentDate), usersData);
    });
});


// *************** EVENT HANDLERS AND FUNCTIONS  ************

const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length)
};

const convertDate = (date) => {
  return date.split("-").join("/");
};

const findTotalActivityForWeek = (currentUser, activityData) => {
  let object = currentUser.findAllActivityOnWeek(activityData, 'minutesActive')
  let [weeklyMinutes, weeklySteps, weeklyStairs] = object
  let minutesData = weeklyMinutes.slice(193)
  let stepsData = weeklySteps.slice(193)
  let stairsData = weeklyStairs.slice(193)
  const getDataMinutes = minutesData.reduce((acc, currentVal) => {
    acc += currentVal.minutesActive;
    return acc
  }, 0)
  const getDataSteps = stepsData.reduce((acc, currentVal) => {
    acc += currentVal.numSteps;
    return acc
  }, 0)
  const getDataStairs = stairsData.reduce((acc, currentVal) => {
    acc += currentVal.flightsOfStairs;
    return acc
  }, 0)
  let weekActivity = {
    totalSteps: getDataSteps,
    totalStairs: getDataStairs,
    totalMins: getDataMinutes
  }
  return weekActivity;
}

const renderPage = (currentUser, activityData, hydrationData, sleepData, date, usersData) => {
  userName.innerText = `Welcome, ${currentUser.getName()}!`;
  userAddress.innerText = currentUser.address;
  userEmail.innerText = currentUser.email;
  totalStepsThisWeek.innerText = findTotalActivityForWeek(currentUser, activityData).totalSteps;
  totalStairsThisWeek.innerText = findTotalActivityForWeek(currentUser, activityData).totalStairs;
  totalMinThisWeek.innerText = findTotalActivityForWeek(currentUser, activityData).totalMins;
  userStepGoal(currentUser);
  userAvgStepGoalVsOthers(usersData, userStepGoal(currentUser));
  stepMilesMinutesForDay(currentUser, activityData, date, usersData);
  waterConsumptionDay(currentUser, hydrationData, date);
  waterOverLatestWeek(currentUser, hydrationData, 'numOunces');
  allActivityForDayVsAll(usersData, currentUser, activityData, date);
  hoursQualitySleep(currentUser, sleepData, date);
  allTimeSleepQualityUser(currentUser, sleepData);
  weeklySleepHrsQuality(currentUser, sleepData);
};