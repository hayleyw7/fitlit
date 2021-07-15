// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS file

// *************** IMPORTS ************


// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './css/styles.css';
import './images/turing-logo.png'
import './widget-chart.js'
console.log('This is the JavaScript entry file - your code begins here.');

// An example of how you tell webpack to use a JS file

import userData from './data/users';
import User from './User';
import UserRepository from './UserRepository';
import apiCalls from './apiCalls';
// console.log(apiCalls.allData());


// *************** QUERY SELECTORS ************







// *************** GLOBAL VARIABLES ************

let activityData;
let hydrationData;
let usersData;
let sleepData;

const retrieveData = () => {
  apiCalls.allData()
  .then(data => {
    usersData = data[0] 
    activityData = data[1]
    hydrationData = data[2]
    sleepData = data[3]
    // console.log('user test', usersData)
    // console.log('activity test', activityData)
    // console.log('hydration test', hydrationData)
    // console.log('sleep test', sleepData)
    
  })
}

retrieveData()


// *************** EVENT LISTENERS ************






// *************** EVENT HANDLERS AND FUNCTIONS  ************