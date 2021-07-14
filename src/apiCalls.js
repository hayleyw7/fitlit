const fetchUserData = () => {
  return fetch('http://localhost:3001/api/v1/user')
    .then(response => response.json());
    .then(data => data)
    .catch(error => console.error("user promise rejected"));
}
