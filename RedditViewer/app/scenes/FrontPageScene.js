import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity
} from 'react-native';

import PostsIndexContainer from '../components/post/PostsIndexContainer';


export default class FrontPageScene extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <PostsIndexContainer navigator={this.props.navigator}/>
      </View>
    );
  }
}
