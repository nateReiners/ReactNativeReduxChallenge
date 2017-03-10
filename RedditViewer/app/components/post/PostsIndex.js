import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ListView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

export default class PostsIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  componentDidMount() {
    this.setState({ loading: true });
    const that = this;
    this.props.requestPosts().then(
      (res) => {
        that.setState({ loading: false });
      }
    );
  }

  render () {
    let posts = this.props.posts;
    if (posts instanceof Array) {
      return (
        <View>
          <Text>This is the Posts Index after data fatching</Text>
        </View>
      );
    } else {
      return (
        <View>
        <ActivityIndicator
            animating={this.state.loading}
            color="black"
            style={[styles.centering, {height: 80}]}
            size="large"
          />
          <Text>This is the Posts Index Before data fetching completess</Text>
        </View>
      );
    }

  }
}
const styles = StyleSheet.create({

});
