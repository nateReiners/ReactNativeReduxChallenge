const RECEIVE_POSTS = "RECEIVE POSTS";
import * as postAPI from '../../util/api';



export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts: posts,
});

export const requestPosts = () => dispatch => {
  console.log("requestPosts Action Hit");
  return postAPI.fetchPosts()
  .then((responsePosts) => {
      dispatch(receivePosts(responsePosts));
    }
  );
};
