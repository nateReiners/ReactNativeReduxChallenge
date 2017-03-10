const REQUEST_URL = 'https://www.reddit.com/.json';

export const fetchPosts = () => (
  fetch(REQUEST_URL, {
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
