import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

class PostIndexItem extends Component {
  constructor(props) {
    super(props);
    this.createDetailScene = this.createDetailScene.bind(this);
  }

  createDetailScene(post) {
    this.props.navigator.push({
      name: 'Detail',
      passProps: {
        post: post
      }
    });
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
    if (title.length > 50) {
      title = `${post.data.title.slice(0, 50)}... (${domain})`;
    } else {
      title = `${post.data.title}... (${domain})`
    }


    return(
      <TouchableOpacity onPress={() => this.createDetailScene(post)}>
        <View style={styles.postIndexItem}>
          {img}
          <View style={styles.postText}>
              <Text style={styles.title}>{title}</Text>
              <View style={styles.scoreView}>
                <Image style={styles.upArrow} source={require("../../images/upArrow.png")} />
                <Text style={styles.score}>{post.data.score}</Text>
              </View>
              <Text style={styles.author}>by {author}</Text>
              <Text style={styles.author}>in {subreddit}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default PostIndexItem;

const styles = StyleSheet.create({
  postIndexItem: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 8,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderColor: '#dbdbdb',
  },
  postText: {
    paddingLeft: 15,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: 1,
  },
  title: {
    fontSize: 18,
    flexDirection: 'column',
    flexWrap: 'wrap',
    paddingBottom: 5,
    color: 'black',
  },
  scoreView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  score: {
    fontSize: 16,
    color: '#5daf26',
  },
  upArrow: {
    height: 16,
    width: 16,
    marginRight: 2,
  },
  author: {
    fontSize: 16,
  },
  thumbnail: {
    height: 150,
    flex: 1,
    borderRightWidth: 1,
    borderColor: 'black',
    alignSelf: 'center'
  },
});
