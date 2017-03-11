import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
} from 'react-native';


export default class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.createIndexScene = this.createIndexScene.bind(this);
    this.elapsedTime = this.elapsedTime.bind(this);
  }

  createIndexScene() {
    this.props.navigator.pop();
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
         return 'about ' + Math.round(elapsed/1000) + ' seconds ago';
    } else if (elapsed < msPerHr) {
         return 'about ' + Math.round(elapsed/msPerMin) + ' minutes ago';
    } else if (elapsed < msPerDay ) {
         return 'about ' + Math.round(elapsed/msPerHr ) + ' hours ago';
    } else if (elapsed < msPerMonth) {
        return 'about ' + Math.round(elapsed/msPerDay) + ' days ago';
    } else if (elapsed < msPerYr) {
        return 'about ' + Math.round(elapsed/msPerMonth) + ' months ago';
    } else {
        return 'about ' + Math.round(elapsed/msPerYr ) + ' years ago';
    }
}

  render() {
    const post = this.props.post.data;
    const score = post.score;
    const author = post.author;
    const domain = post.domain;
    const subreddit = post.subreddit_name_prefixed;
    const title = post.title;
    const currentTime = Date.now();
    const timeDiff = this.elapsedTime(post.created_utc, currentTime);
    let img;
    if (post.thumbnail !== "default") {
      let uriObj = {uri: post.thumbnail};
      img = (<Image source={uriObj} style={styles.thumbnail}/>)
    } else {
      img = (<Image
        source={require("../../images/defaultThumb.png")}
        style={styles.thumbnail}/>)
    }
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableHighlight style={styles.button} onPress={this.createIndexScene}>
          <Image
            style={styles.backArrow}
            source={require('../../images/leftArrow.png')}
          />
          </TouchableHighlight>
          <Text style={styles.headerText}>POST DETAILS</Text>
        </View>
        <View style={styles.postIndexItem}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.scoreView}>
            <Image style={styles.upArrow} source={require("../../images/upArrow.png")} />
            <Text style={styles.score}>{score}</Text>
          </View>
          {img}
          <View style={styles.postText}>
              <Text style={styles.authorSubTime}>
                Posted by {author} to {subreddit} {timeDiff}
              </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    height: 70,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#dbdbdb',
  },
  button: {
    backgroundColor: '#5daf26',
    padding: 8,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  backArrow: {
    height: 24,
    width: 30,
  },
  headerText: {
    flex: 1,
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#5daf26',
  },
  postIndexItem: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 8,
    paddingBottom: 10,
  },
  postText: {
    paddingLeft: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    flexDirection: 'column',
    flexWrap: 'wrap',
    color: 'black',
    textAlign: 'center',
  },
  scoreView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  score: {
    fontSize: 20,
    color: '#5daf26',
  },
  upArrow: {
    height: 18,
    width: 18,
    marginRight: 2,
  },
  authorSubTime: {
    fontSize: 20,
    textAlign: 'center',
  },
  thumbnail: {
    alignSelf: 'center',
    margin: 20,
    height: 250,
    width: 250,
  },
});
