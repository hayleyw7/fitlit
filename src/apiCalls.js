const fetchUsersData = () => {
  return fetch('http://localhost:3001/api/v1/users')
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.error("user promise rejected"));
}

const fetchActivityData = () => {
  return fetch('http://localhost:3001/api/v1/activity')
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.error("activity promise rejected"));
}

const fetchHydrationData = () => {
  return fetch('http://localhost:3001/api/v1/hydration')
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.error("hydration promise rejected"));
}

const fetchSleepData = () => {
  return fetch(`http://localhost:3001/api/v1/sleep`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.error("sleep promise rejected"));
}

const allData = () => {
  return Promise.all([fetchUsersData(), fetchActivityData(), fetchHydrationData(), fetchSleepData()])
};
export default {
  allData
}