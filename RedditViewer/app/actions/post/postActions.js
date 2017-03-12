const RECEIVE_POSTS = "RECEIVE POSTS";
import * as postAPI from '../../util/api';



export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts: posts,
});

export const requestPosts = (route) => dispatch => {
  return postAPI.fetchPosts(route)
  .then((responsePosts) => {
      dispatch(receivePosts(responsePosts));
    }
  );
};
