import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ListView,
  RefreshControl,
  ActivityIndicator,
  StatusBar,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import _, { isEqual }  from 'lodash';


import PostIndexItem from './PostIndexItem';


export default class PostsIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      currentTab: 'hot',
     };
    this.renderRow = this.renderRow.bind(this);
    this.setTab = this.setTab.bind(this);
    this.getData = this.getData.bind(this);
  }


  componentDidMount() {
    this.getData();
  }

  componentWillReceiveProps(nextProps) {
    let prev = this.props || {};
    let next = nextProps || {};
    if ( _.isEqual(prev, next) ) {
    } else {
    }
  }

  _onRefresh() {
    this.getData();
  }

  getData() {
    this.setState({ refreshing: true });
    this.props.requestPosts(this.state.currentTab).then(
      (res) => {
        this.setState({ refreshing: false });
      }
    );
  }


  renderRow(post) {
    return (
      <PostIndexItem post={post} navigator={this.props.navigator}/>
    );
  }

  setTab(tab) {
    this.setState({currentTab: tab});
    this.props.requestPosts(tab);
  }

  render () {

    const tabNames = ['hot', 'new', 'rising', 'controversial', 'top'];


    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let posts = this.props.posts;
    console.log(posts);
    const hideBar = <StatusBar
                         backgroundColor="blue"
                         barStyle="light-content"
                         hidden={true}
                       />;
    if (posts instanceof Array) {
      return (
        <View style={styles.container}>
          {hideBar}
          <View style={styles.header}>
            <Text style={styles.headerText}>REDDIT VIEWER</Text>
          </View>

          <View style={styles.tabs}>
            <TouchableHighlight style={styles.tabLink} onPress={() => this.setTab(tabNames[0])}>
              <Text style={styles.tabText}>{tabNames[0]}</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.tabLink} onPress={() => this.setTab(tabNames[1])}>
              <Text style={styles.tabText}>{tabNames[1]}</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.tabLink} onPress={() => this.setTab(tabNames[2])}>
              <Text style={styles.tabText}>{tabNames[2]}</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.tabLink} onPress={() => this.setTab(tabNames[3])}>
              <Text style={styles.tabText}>{tabNames[3]}</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.tabLink} onPress={() => this.setTab(tabNames[4])}>
              <Text style={styles.tabText}>{tabNames[4]}</Text>
            </TouchableHighlight>
          </View>
          <ListView
            dataSource={ds.cloneWithRows(posts)}
            renderRow={this.renderRow}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
                colors={["#5daf26"]}
              />
            }
          />
       </View>
     );
    } else {
      return (
        <View style={styles.loading}>
        <View style={styles.header}>
          <Text style={styles.headerText}>LOADING REDDIT VIEWER...</Text>
        </View>
        {hideBar}
          <ActivityIndicator
              animating={this.state.loading}
              color="#5daf26"
              style={[styles.centering, {height: 160}]}
              size="large"
            />
        </View>
      );
    }

  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 34,
    backgroundColor: '#5daf26',
  },
  tabText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'white',
  },
  tabLink: {
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderColor: 'black',
    paddingLeft: 22,
    paddingRight: 22,
  },
  header: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#dbdbdb',
    padding: 4,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#5daf26',
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingMessage: {
    fontSize: 22,
    paddingTop: 70,
    fontWeight: 'bold',
    color: '#5daf26',
  }
});
