import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

export default class PostIndexItem extends Component {
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

  elapsedTime(previousTime, current) {
    const previous = previousTime * 1000;
    const msPerMin = 60 * 1000;
    const msPerHr = msPerMin * 60;
    const msPerDay = msPerHr * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYr = msPerDay * 365;
    const elapsed = (current - previous);

    if (elapsed < msPerMin) {
         return Math.round(elapsed/1000) + ' seconds ago';
    } else if (elapsed < msPerHr) {
         return Math.round(elapsed/msPerMin) + ' minutes ago';
    } else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHr ) + ' hours ago';
    } else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days ago';
    } else if (elapsed < msPerYr) {
        return Math.round(elapsed/msPerMonth) + ' months ago';
    } else {
        return Math.round(elapsed/msPerYr ) + ' years ago';
    }
  }

  render() {
    const post = this.props.post;
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
    const numComments = post.data.num_comments;
    const currentTime = Date.now();
    const timeDiff = this.elapsedTime(post.data.created_utc, currentTime);
    let title = post.data.title;

    if (title.length > 50) {
      title = `${post.data.title.slice(0, 50)}... (${domain})`;
    } else {
      title = `${post.data.title}... (${domain})`
    }

    return (
      <TouchableOpacity onPress={() => this.createDetailScene(post)}>
        <View style={styles.postIndexItem}>
          {img}
          <View style={styles.postText}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.scoreView}>
              <Image style={styles.upArrow} source={require("../../images/upArrow.png")} />
              <Text style={styles.score}>{post.data.score}</Text>
            </View>
            <Text style={styles.author}>{numComments} comments</Text>
            <Text style={styles.author}>{subreddit}</Text>
            <Text style={styles.author}>{timeDiff} by {author}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  postIndexItem: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 8,
    paddingBottom: 6,
    borderBottomWidth: 1.5,
    borderColor: '#5daf26',
    backgroundColor: '#f9f9f9',
  },
  postText: {
    paddingLeft: 15,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: 1,
  },
  title: {
    fontSize: 16,
    flexDirection: 'column',
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
