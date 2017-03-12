import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
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
    const numComments = post.num_comments;
    const title = `${post.title} (${domain})`;
    const currentTime = Date.now();
    const timeDiff = this.elapsedTime(post.created_utc, currentTime);
    const url = post.url;
    let uriObj;
    let img;

    if (url.slice(url.length - 4, url.length) === ".gif") {
      let uriObj = {uri: url};
      img = <Image source={uriObj} style={styles.thumbnail}/>
    }
    else if (post.thumbnail !== "default") {
      uriObj = {uri: post.thumbnail};
      img = (<Image source={uriObj} style={styles.thumbnail}/>)
    } else {
      img = (<Image
        source={require("../../images/defaultThumb.png")}
        style={styles.thumbnail}/>)
    }

    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity style={styles.button} onPress={this.createIndexScene}>
            <Image
              style={styles.backArrow}
              source={require('../../images/leftArrow.png')}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>POST DETAILS</Text>
        </View>

        <ScrollView contentContainerStyle={styles.postIndexItem}>
          <View style={{flex: 1}}>
          <Text style={styles.title}>{title}</Text>
            <View style={styles.scoreView}>
              <Image style={styles.upArrow} source={require("../../images/upArrow.png")} />
              <Text style={styles.score}>{score}</Text>
            </View>
            {img}

            <View style={styles.postText}>
              <Text style={styles.authorSubTime}>{numComments} comments</Text>
              <Text style={styles.authorSubTime}>
                Posted by {author} to {subreddit} {timeDiff}
              </Text>
            </View>
          </View>
        </ScrollView>

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
    height: 60,
    flexDirection: 'row',
    padding: 6,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#dbdbdb',
  },
  button: {
    backgroundColor: '#5daf26',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    alignSelf: 'stretch'
  },
  backArrow: {
    height: 22,
    width: 26,
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
    padding: 10,
    paddingBottom: 80,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    flexDirection: 'column',
    color: 'black',
    textAlign: 'center',
    padding: 5,
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
    margin: 10,
    height: 250,
    width: 250,
  },
});
