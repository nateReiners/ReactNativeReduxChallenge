import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity
} from 'react-native';

import PostDetail from '../components/post/PostDetail';


export default class DetailScene extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.requestPost();
  }

  render() {
    console.log("hit render method of DetailScene");
    return (
      <View>
      <Text>Detail Scene component</Text>
        <PostDetail post={this.props.postDetail} />
      </View>
    );
  }
}
