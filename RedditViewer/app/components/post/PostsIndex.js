import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ListView,
  RefreshControl,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import PostIndexItem from './PostIndexItem';


export default class PostsIndex extends Component {
  constructor(props) {
    super(props);
    this.state = { refreshing: false };
    this.renderRow = this.renderRow.bind(this);
  }

  componentDidMount() {
    this.setState({ refreshing: true });
    const that = this;
    this.props.requestPosts().then(
      (res) => {
        that.setState({ refreshing: false });
      }
    );
  }

  _onRefresh() {
    this.setState({refreshing: true});
    console.log("refreshing...");
    this.props.requestPosts().then(() => {
      this.setState({refreshing: false});
    });
  }

  renderRow(post) {
    return (
      <PostIndexItem post={post} navigator={this.props.navigator}/>
    );
  }

  render () {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let posts = this.props.posts;
    console.log(posts);
    const hiddenBar = <StatusBar
                         backgroundColor="blue"
                         barStyle="light-content"
                         hidden={true}
                       />;
    if (posts instanceof Array) {
      return (
        <View style={styles.container}>
          {hiddenBar}
          <View style={styles.header}>
            <Text style={styles.headerText}>REDDIT VIEWER</Text>
          </View>
          <ListView
            dataSource={ds.cloneWithRows(posts)}
            renderRow={this.renderRow}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
          />
       </View>
     );
    } else {
      return (
        <View style={styles.loading}>
        {hiddenBar}
        <Text style={styles.loadingMessage}>FETCHING TOP POSTS...</Text>
          <ActivityIndicator
              animating={this.state.loading}
              color="#5daf26"
              style={[styles.centering, {height: 160}]}
              size="large"
            />
        </View>
      );
    }

  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
  header: {
    height: 23,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#dbdbdb',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#5daf26',
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingMessage: {
    fontSize: 22,
    paddingTop: 70,
    fontWeight: 'bold',
    color: '#5daf26',
  }
});
