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

class PostIndexItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let post = this.props.post || {};
    let img;
    if (post.data.thumbnail !== "default") {
      let uriObj = {
        uri: post.data.thumbnail,
      };
      img = (<Image source={uriObj} style={styles.thumbnail}/>)
    } else {
      img = (<Image
        source={require("../../images/defaultThumb.png")}
        style={styles.thumbnail}/>)
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
}

export default PostIndexItem;

const styles = StyleSheet.create({
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
});
