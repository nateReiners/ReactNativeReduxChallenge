const BASE_URL = 'https://www.reddit.com/';

export const fetchPosts = (route) => (
  fetch(BASE_URL + route + '/.json', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then((response) => response.json())
  .then((responseJson) => {
     return responseJson.data.children;
   })
   .catch((error) => {
     console.error(error);
   })
);
