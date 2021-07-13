// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');

// An example of how you tell webpack to use a JS file

import userData from './data/users';
import UserRepository from './UserRepository';



/////////////////////////////////
////////// chart tests //////////
/////////////////////////////////
//// this code will be moved ////
/////////////////////////////////

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
];

const data = {
  labels: ['You', 'Community'],
  datasets: [{
    label: 'My First dataset',
    backgroundColor: 'rgb(255, 99, 132)',
    // borderColor: 'rgb(255, 99, 132)',
    data: [40, 400],
  }]
};

const config = {
  type: 'horizontalBar',
  data,
  options: {}
};

  var myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
