import React, { Component } from 'react';
import {
  Navigator,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './store';
import FrontPageSceneContainer from './scenes/FrontPageSceneContainer';
import DetailSceneContainer from './scenes/FrontPageSceneContainer';

import { requestPosts } from './actions/post/postActions';
import { fetchPosts } from './util/api';
window.store = configureStore();
window.requestPosts = requestPosts();
window.fetchPosts = fetchPosts();

export default class RedditViewer extends Component {
  constructor() {
    super();
    this.store = configureStore();
  }

  renderScene(route, navigator) {
     if(route.name === 'FrontPageScene') {
       return <FrontPageSceneContainer
                navigator={navigator}/>
     } else if(route.name === 'DetailScene') {
       return <DetailSceneContainer
                navigator={navigator}/>
     }
  }


  render() {

    const routes = [
      {name: 'FrontPageScene'},
      {name: 'DetailScene'}
    ];

    return (
      <Provider store={this.store}>
        <Navigator
          style={{ flex:1 }}
          initialRoute={ routes[0] }
          initialRouteStack={ [routes[0]] }
          renderScene={ this.renderScene } />
      </Provider>
    );
  }
}
