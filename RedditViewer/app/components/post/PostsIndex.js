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
    };
    this.renderRow = this.renderRow.bind(this);
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

  renderRow(post) {
    let img;
    if (post.data.thumbnail !== "default") {
      let uriObj = {
        uri: post.data.thumbnail,
      };
      img = (<Image source={uriObj} style={styles.thumbnail}/>)
    } else {
      img = (<Image source={require("../../images/defaultThumb.png")} style={styles.thumbnail}/>)

    }
    const title = post.data.title;
    const score = post.data.score;
    const user = post.data.user;

    return(
      <View style={styles.postIndexItem}>
        {img}
        <View style={styles.postText}>
          <Text style={styles.title}>Title: {post.data.title}</Text>
          <Text>Score: {post.data.score}</Text>
          <Text></Text>
        </View>
      </View>

    );
  }

  render () {
    let posts = this.props.posts;
    if (posts instanceof Array) {
      console.log(posts);
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      return (
        <View>
          <View style={styles.header}>
            <Text style={styles.headerText}>Front Page Posts</Text>
          </View>
          <ListView
            dataSource={ds.cloneWithRows(posts)}
            renderRow={this.renderRow}
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
    height: 50,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: 'black',
  },
  headerText: {
    fontSize: 20,
    color: 'white',
    position: 'absolute',
  },
  postIndexItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    borderWidth: 2,
    borderColor: 'black',
  },
  postText: {
    padding: 5,
    flexDirection: 'column',
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    flexDirection: 'column',
    flexWrap: 'wrap',
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
