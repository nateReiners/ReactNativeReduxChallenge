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

  getData(tab) {
    this.setState({ refreshing: true });
    this.props.requestPosts(tab || this.state.currentTab).then(
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
    const tabStyles = {}
    selectedStatusTabs = tabNames.forEach((tabName) => {
      if (tabName === this.state.currentTab) {
        tabStyles[tabName] = [styles.selectedTabLink, styles.selectedTabText];
      } else {
        tabStyles[tabName] = [styles.tabLink, styles.tabText];
      }
    });

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let posts = this.props.posts;
    const hideBar = <StatusBar hidden={true}/>;
    if (posts instanceof Array) {
      return (
        <View style={styles.container}>
          {hideBar}
          <ActivityIndicator
              animating={this.state.refreshing}
              color="#5daf26"
              style={[styles.centering, {height: 160, zIndex: 1, position: 'absolute', top: 100}]}
              size="large"
            />
          <View style={styles.header}>
            <Text style={styles.headerText}>REDDIT VIEWER</Text>
            <Text style={styles.headerText}>/{this.state.currentTab}</Text>
          </View>
          <View style={styles.tabs}>
            <TouchableOpacity style={tabStyles[tabNames[0]][0]} onPress={() => this.setTab(tabNames[0])}>
              <Text style={tabStyles[tabNames[0]][1]}>{tabNames[0]}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tabStyles[tabNames[1]][0]} onPress={() => this.setTab(tabNames[1])}>
              <Text style={tabStyles[tabNames[1]][1]}>{tabNames[1]}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tabStyles[tabNames[2]][0]} onPress={() => this.setTab(tabNames[2])}>
              <Text style={tabStyles[tabNames[2]][1]}>{tabNames[2]}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tabStyles[tabNames[3]][0]} onPress={() => this.setTab(tabNames[3])}>
              <Text style={tabStyles[tabNames[3]][1]}>{tabNames[3]}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tabStyles[tabNames[4]][0]} onPress={() => this.setTab(tabNames[4])}>
              <Text style={tabStyles[tabNames[4]][1]}>{tabNames[4]}</Text>
            </TouchableOpacity>
          </View>
          <ListView
            dataSource={ds.cloneWithRows(posts)}
            renderRow={this.renderRow}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
                colors={["#5daf26"]}
              />}
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
              style={[styles.centering, {height: 160, zIndex: 1, position: 'absolute'}]}
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
    alignSelf: 'stretch',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 40,
    backgroundColor: 'white',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    color: '#5daf26',
  },
  selectedTabText: {
    color: '#5daf26',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tabLink: {
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
  selectedTabLink: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomWidth: 3,
    borderColor: '#5daf26',
  },
  header: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: 'white',
    padding: 4,
  },
  headerText: {
    textAlign: 'center',
    flex: 1,
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
