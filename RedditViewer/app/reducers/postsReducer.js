const RECEIVE_POSTS = "RECEIVE POSTS";
import { merge } from 'lodash';
import {REHYDRATE} from 'redux-persist/constants'

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
    case REHYDRATE:
      const incoming = action.payload.myReducer;
      if (incoming) return {...state, ...incoming, specialKey: processSpecial(incoming.specialKey)}
      return state;
    default:
      return state;
  }
};

export default postsReducer;
