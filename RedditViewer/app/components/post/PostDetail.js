import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';


export default class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.createIndexScene = this.createIndexScene.bind(this);
    this.timeDifference = this.timeDifference.bind(this);
  }

  createIndexScene() {
    this.props.navigator.pop();
  }

  timeDifference(previous, current) {

    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;
    const elapsed = (current - previous) / 100000;

    if (elapsed < msPerMinute) {
         return 'about ' + Math.round(elapsed/1000) + ' seconds ago';
    } else if (elapsed < msPerHour) {
         return 'about ' + Math.round(elapsed/msPerMinute) + ' minutes ago';
    } else if (elapsed < msPerDay ) {
         return 'about ' + Math.round(elapsed/msPerHour ) + ' hours ago';
    } else if (elapsed < msPerMonth) {
        return 'about ' + Math.round(elapsed/msPerDay) + ' days ago';
    } else if (elapsed < msPerYear) {
        return 'about ' + Math.round(elapsed/msPerMonth) + ' months ago';
    } else {
        return 'about ' + Math.round(elapsed/msPerYear ) + ' years ago';
    }
}

  render() {
    const post = this.props.post.data;
    const score = post.score;
    const author = post.author;
    const domain = post.domain;
    const subreddit = post.subreddit_name_prefixed;
    const title = post.title;
    const currentTime = new Date().getTime();
    const timeDiff = this.timeDifference(post.created, currentTime);
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
          <Button
            style={styles.backButton} title={"BACK TO VIEWER"}
            onPress={this.createIndexScene}
            color={'#5daf26'}
             />
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
    flexDirection: 'row',
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#dbdbdb',
  },
  headerText: {
    flex: 1,
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 18,
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
  },
  upArrow: {
    height: 18,
    width: 24,
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
