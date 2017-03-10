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
    let title = post.data.title;
    if (title.length > 70) {
      title = title.slice(0, 70) + "...";
    }
    const score = post.data.score;
    const author = post.data.author;

    return(
      <View style={styles.postIndexItem}>
        {img}
        <View style={styles.postText}>
          <Text style={styles.title}>Title: {title}</Text>
          <Text style={styles.score}>Score: {post.data.score}</Text>
          <Text style={styles.author}>/u/{author}</Text>
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
