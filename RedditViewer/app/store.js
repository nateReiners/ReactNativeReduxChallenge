import { compose, createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';

const configureStore = (preloadedState = {}) => {

  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk),
      autoRehydrate()
    )
  )

  persistStore(store, {storage: AsyncStorage})
  return store;
};

export default configureStore;
