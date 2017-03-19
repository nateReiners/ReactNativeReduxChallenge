import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
  Dimensions,
  Image,
} from 'react-native';


export default class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      winWidth: 0,
    };
    this.createIndexScene = this.createIndexScene.bind(this);
    this.elapsedTime = this.elapsedTime.bind(this);
    this._onLayout = this._onLayout.bind(this);
    this.setSize = this.setSize.bind(this);
    this.hasHighQualityImage = this.hasHighQualityImage.bind(this);
  }

  componentDidMount() {
    this.setSize();
  }

  _onLayout() {
    this.setSize();
  }

  setSize() {
      const url = this.props.post.data.url;
      const windowSize = Dimensions.get('window');
      this.setState({winWidth: windowSize.width});
      if (this.hasHighQualityImage()) {
        Image.getSize(url, (width, height) => {
          if ((width / height) > (windowSize.width / (windowSize.height - 68))) {
              const imageHeight = (height * windowSize.width) / width;
              this.setState({width: windowSize.width, height: imageHeight});
          } else {
            const imageWidth = (width * windowSize.height ) / height;
            this.setState({width: imageWidth, height: windowSize.height - 68});
          }
        });
      }
  }

  hasHighQualityImage() {
    const url = this.props.post.data.url;
    if ( Platform.OS === 'ios' &&
         url.slice(url.length - 4, url.length) === ".jpg") {
        if (url.includes("imgur")) {
          return false;
        } else {
          return true;
        }
    } else if ( url.slice(url.length - 4, url.length) === ".gif" ||
                url.slice(url.length - 4, url.length) === ".jpg" ) {
      return true;
    } else {
      return false;
    }
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

    if (this.hasHighQualityImage()) {
      let uriObj = {uri: url};

      img = <View style={{height: (this.state.height),
                          alignSelf: 'stretch',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#1a330a',
                          flex: 1,
                        }}>
              <Image
                resizeMode="contain"
                source={uriObj}
                style={styles.higherQualityImage}/>
            </View>;
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
      <View style={styles.container} onLayout={this._onLayout}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.button} onPress={this.createIndexScene}>
            <Image
              style={styles.backArrow}
              source={require('../../images/leftArrow.png')}
            />
          </TouchableOpacity>

          <View style={styles.scoreView}>
            <Image style={styles.upArrow} source={require("../../images/upArrow.png")} />
            <Text style={styles.score}>
              {score}
            </Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={[styles.postIndexItem, {width: this.state.winWidth }]}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {img}
            <Text style={styles.title}>
              {title}
            </Text>

            <Text style={styles.link} onPress={() => Linking.openURL(
                `https://www.reddit.com/${post.url}`)}>
              View on Reddit
            </Text>
            <View style={styles.postText}>
              <Text style={styles.authorSubTime}>
                {numComments} comments
              </Text>
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
    marginTop: (Platform.OS === 'ios') ? 20 : 0,
  },
  header: {
    height: 45,
    flexDirection: 'row',
    padding: 5,
    paddingLeft: 12,
    paddingRight: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#dbdbdb',
  },
  button: {
    backgroundColor: '#5daf26',
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    alignSelf: 'stretch'
  },
  backArrow: {
    height: 16,
    width: 18,
  },
  postIndexItem: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontSize: 16,
  },
  scoreView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  score: {
    fontSize: 20,
    color: '#5daf26',
    fontWeight: 'bold',
  },
  upArrow: {
    height: 24,
    width: 24,
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
  higherQualityImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: -1,
    right: -1,
  },
});
