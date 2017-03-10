import React, { Component } from 'react';
import {
  Navigator,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './store';
import PostsIndexContainer from './components/post/PostsIndexContainer';
import { requestPosts } from './actions/post/postActions';
import { fetchPosts } from './util/api';
window.store = configureStore();
window.requestPosts = requestPosts();
window.fetchPosts = fetchPosts();

export default class RedditViewer extends Component {
  constructor(props) {
    super(props);
    this.store = configureStore();
  }

  render() {
    return (
      <Provider store={store}>
          <PostsIndexContainer />
      </Provider>
    );
  }
}
