// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS file

// *************** IMPORTS ************


// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './css/styles.css';
import './images/turing-logo.png'
import './widget-chart.js'
import {
  userStepGoal
} from './widget-chart.js'
import {
  userAvgStepGoalVsOthers
} from './widget-chart.js'
import {
  stepMilesMinutesForDay
} from './widget-chart.js'

import {
  waterConsumptionDay
} from './widget-chart.js'

import {
  waterOverLatestWeek
} from './widget-chart.js'

import {
  allActivityForDayVsAll
} from './widget-chart.js'

import {
  hoursQualitySleep
} from './widget-chart.js'

import {
  allTimeSleepQualityUser
} from './widget-chart.js'

// console.log('This is the JavaScript entry file - your code begins here.');

// An example of how you tell webpack to use a JS file

import userData from './data/users';
import User from './User';
import UserRepository from './UserRepository';
import apiCalls from './apiCalls';
// console.log(apiCalls.allData());


// *************** QUERY SELECTORS ************

// user info card

const userName = document.getElementById('userName');
const userAddress = document.getElementById('userAddress');
const userEmail = document.getElementById('userEmail');
// weekly activity totals

const totalStepsThisWeek = document.getElementById('totalStepsThisWeek');
const totalMilesThisWeek = document.getElementById('totalMilesThisWeek');
const totalMinThisWeek = document.getElementById('totalMinThisWeek');

// weekly sleep totals

const sleepHrsForWeek = document.getElementById('sleepHrsForWeek');
const sleepQualityForWeek = document.getElementById('sleepQualityForWeek');


// calendar

const calendar = document.getElementById('dropDownCalendar');


// *************** GLOBAL VARIABLES ************

let activityData, hydrationData, usersData, sleepData, currentUser, allUsers, currentDate, currentDate1;
currentDate = calendar.max;





// *************** EVENT LISTENERS ************

const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length)
}


const convertDate = (date) => {
  return date.split("-").join("/");

}

window.addEventListener('load', function() {
  apiCalls.allData()
    .then(data => {
      allUsers = data[0].userData.map(user => new User(user));
      usersData = new UserRepository(allUsers);
      activityData = data[1].activityData;
      hydrationData = data[2].hydrationData;
      sleepData = data[3].sleepData;
      // console.log('user test ---->', usersData)
      // console.log('activity test ---->', activityData)
      // console.log('hydration test ---->', hydrationData)
      // console.log('sleep test ----->', sleepData)
      currentUser = usersData.users[getRandomIndex(usersData.users)];
      renderPage(currentUser, activityData, hydrationData, sleepData, convertDate(currentDate), usersData);
    })
})

const renderPage = (currentUser, activityData, hydrationData, sleepData, date, usersData) => {
  userName.innerText = `Welcome, ${currentUser.getName()}!`;
  userAddress.innerText = currentUser.address;
  userEmail.innerText = currentUser.email;
  userStepGoal(currentUser);
  userAvgStepGoalVsOthers(usersData, userStepGoal(currentUser));
  stepMilesMinutesForDay(currentUser, activityData, date, usersData);
  waterConsumptionDay(currentUser, hydrationData, date);
  waterOverLatestWeek(currentUser, hydrationData, 'numOunces');
  allActivityForDayVsAll(usersData, currentUser, activityData, date);
  hoursQualitySleep(currentUser, sleepData, date);
  allTimeSleepQualityUser(currentUser, sleepData);
}



// *************** EVENT HANDLERS AND FUNCTIONS  ************





// UserRepository & User Class Dashboard
// Use the scripts.js file to add information to the DOM. This JS file should call methods from your classes to retrieve information. There should not be any DOM manipulation within the User or UserRepository class files.

// To develop this dashboard, first choose a user at random - someone with a randomly generated name that speaks to you. On the dashboard for a user:

// [X] Create an info card on the dashboard with all of user’s info on the page
// [X] Display their first name somewhere prominently on the page to welcome them
// [X] For a specific user, display how their step goal compares to the average step goal amongst all users (this display should not be hard-coded)




// activity dashboard

//[x]For a user, the number of steps for the latest day
//[x]For a user, the number minutes active for the latest day
//[x]For a user, the distance they have walked (in miles) for the latest day based on their step count
//[x] How their number of steps, minutes active, and flights of stairs climbed compares to all users for the latest day
// For a user, a weekly view of their step count, flights of stairs climbed, and minutes active



// sleep dashboard

// [x] For a user, their sleep data for the latest day (hours slept and quality of sleep)
// [ ] For a user, their sleep data over the course of the latest week (hours slept and quality of sleep)
// [X] For a user, their all-time average sleep quality and all-time average number of hours slept