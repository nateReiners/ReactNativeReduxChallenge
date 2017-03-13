import React, { Component } from 'react';
import {
  Navigator,
  View,
  StyleSheet,
  StatusBar,
  Text,
} from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './store';
import PostsIndexContainer from './components/post/PostsIndexContainer';
import PostDetail from './components/post/PostDetail';
import { requestPosts } from './actions/post/postActions';
import { fetchPosts } from './util/api';

window.store = configureStore();

export default class RedditViewer extends Component {
  constructor() {
    super();
    this.store = configureStore();
  }

  renderScene(route, navigator) {
     if(route.name === 'Index') {
       return <PostsIndexContainer
                navigator={navigator}/>
     } else if(route.name === 'Detail') {
       return <PostDetail
                navigator={navigator} {...route.passProps}/>
     }
  }

  render() {
    const routes = [
      {name: 'Index'},
      {name: 'Detail'}
    ];
    return (
      <Provider store={store}>
        <Navigator
          style={{ flex:1 }}
          initialRoute={ routes[0] }
          initialRouteStack={[routes[0]]}
          renderScene={ this.renderScene.bind(this) } />
      </Provider>
    );
  }
}
