import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ListView,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import PostIndexItem from './PostIndexItem';
export default class PostsIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
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
      <PostIndexItem post={post}/>
    );
  }

  render () {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let posts = this.props.posts;
    console.log(posts);
    if (posts instanceof Array) {
      return (
        <View>
          <View style={styles.header}>
            <Text style={styles.headerText}>Front Page Posts</Text>
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
          <ActivityIndicator
              animating={this.state.loading}
              color="black"
              style={[styles.centering, {height: 200}]}
              size="large"
            />
          <Text style={styles.loadingMessage}>Loading Front Page Posts...</Text>
        </View>
      );
    }

  }
}
const styles = StyleSheet.create({
  header: {
    height: 30,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  headerText: {
    fontSize: 16,
    position: 'absolute',
  },
  postIndexItem: {
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  postText: {
    paddingLeft: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    flexDirection: 'column',
    flexWrap: 'wrap',
    paddingBottom: 5,
  },
  thumbnail: {
    height: 150,
    flex: 1,
    borderRightWidth: 1,
    borderColor: 'black',
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingMessage: {
    fontSize: 20
  }
});
