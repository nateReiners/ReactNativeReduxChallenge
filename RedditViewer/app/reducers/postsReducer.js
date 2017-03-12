const RECEIVE_POSTS = "RECEIVE POSTS";
import { merge } from 'lodash';

const defaultState = {
    hot: [],
    new: [],
    rising: [],
    controversial: [],
    top: [],
};
const postsReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_POSTS:
      const newState = merge({}, state, {[action.routeName]: action.posts});
      return newState;
    default:
      return state;
  }
};

export default postsReducer;
