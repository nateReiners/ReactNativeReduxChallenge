const RECEIVE_POSTS = "RECEIVE POSTS";
import { merge } from 'lodash';


const postsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_POSTS:
      return action.posts;
    default:
      return state;
  }
};

export default postsReducer;
