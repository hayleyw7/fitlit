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

console.log('This is the JavaScript entry file - your code begins here.');

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
      // console.log('currentUser ---->', currentUser)
      renderPage(currentUser, activityData, hydrationData, sleepData, 'numSteps', convertDate(currentDate), usersData);
    })
})

const renderPage = (currentUser, activityData, hydrationData, sleepData, property, date, usersData) => {
  // console.log("inside render page", currentUser);
  // currentDate = new Date().toISOString().slice(0, 10);
  // console.log(usersData)
  userName.innerText = `Welcome, ${currentUser.getName()}!`;
  userAddress.innerText = currentUser.address;
  userEmail.innerText = currentUser.email;
  // console.log(calendar.max)
  // console.log('user test ---->', currentUser)
  // console.log('activity test ---->', activityData)
  // console.log('hydration test ---->', hydrationData)
  // console.log('sleep test ----->', sleepData)
  userStepGoal(currentUser, activityData, property, date)
  userAvgStepGoalVsOthers(usersData, userStepGoal(currentUser, activityData, property, date))
}



// *************** EVENT HANDLERS AND FUNCTIONS  ************





// UserRepository & User Class Dashboard
// Use the scripts.js file to add information to the DOM. This JS file should call methods from your classes to retrieve information. There should not be any DOM manipulation within the User or UserRepository class files.

// To develop this dashboard, first choose a user at random - someone with a randomly generated name that speaks to you. On the dashboard for a user:

// [] Create an info card on the dashboard with all of user’s info on the page
// [] Display their first name somewhere prominently on the page to welcome them
// [] For a specific user, display how their step goal compares to the average step goal amongst all users (this display should not be hard-coded)