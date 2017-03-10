import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ListView,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';

class PostIndexItem extends Component {
  constructor(props) {
    super(props);
    this.createDetailScene = this.createDetailScene.bind(this);
  }

  createDetailScene() {
    console.log("hit createDetailScene from PostIndexItem");
    this.props.navigator.push({name: 'DetailScene'});
  }

  render() {
    let post = this.props.post;

    let img;
    if (post.data.thumbnail !== "default") {
      let uriObj = {uri: post.data.thumbnail};
      img = (<Image source={uriObj} style={styles.thumbnail}/>)
    } else {
      img = (<Image
        source={require("../../images/defaultThumb.png")}
        style={styles.thumbnail}/>)
    }

    const score = post.data.score;
    const author = post.data.author;
    const domain = post.data.domain;
    const subreddit = post.data.subreddit_name_prefixed;

    let title = post.data.title;
    if (title.length > 100) {
      title = `${post.data.title.slice(0, 100)}... (${domain})`;
    } else {
      title = `${post.data.title}... (${domain})`
    }


    return(
      <TouchableHighlight onPress={() => this.createDetailScene()}>
        <View style={styles.postIndexItem}>
          {img}
          <View style={styles.postText}>
            <Text style={styles.title}>{title}</Text>
            <View>
              <Text style={styles.score}>Score: {post.data.score}</Text>
              <Text style={styles.author}>/u/{author} in {subreddit}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

export default PostIndexItem;

const styles = StyleSheet.create({
  postIndexItem: {
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#dbdbdb',
  },
  postText: {
    paddingLeft: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    flexDirection: 'column',
    flexWrap: 'wrap',
    paddingBottom: 5,
  },
  score: {
    fontSize: 14,
    paddingBottom: 5,
  },
  thumbnail: {
    height: 150,
    flex: 1,
    borderRightWidth: 1,
    borderColor: 'black',
  },
});
