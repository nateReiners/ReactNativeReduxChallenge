const RECEIVE_POSTS = "RECEIVE POSTS";
import * as postAPI from '../../util/api';



export const receivePosts = (posts, routeName) => ({
  type: RECEIVE_POSTS,
  posts: posts,
  routeName: routeName,
});

export const requestPosts = (route) => dispatch => {
  return postAPI.fetchPosts(route)
  .then((responsePosts) => {
      dispatch(receivePosts(responsePosts, route));
    }
  );
};
