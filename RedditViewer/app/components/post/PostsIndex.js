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
    this._onRefresh = this._onRefresh.bind(this);
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
    if (tab !== this.state.currentTab) {
      this.setState({currentTab: tab});
      this.getData(tab);
    }
  }


  render () {
    const tabNames = ['hot', 'new', 'rising', 'controversial', 'top'];
    const tabStyles = {};
    selectedStatusTabs = tabNames.forEach((tabName) => {
      if (tabName === this.state.currentTab) {
        tabStyles[tabName] = [styles.selectedTabLink, styles.selectedTabText];
      } else {
        tabStyles[tabName] = [styles.tabLink, styles.tabText];
      }
    });

    const posts = this.props.posts[this.state.currentTab];
    console.log(posts);
    const hideBar = <StatusBar hidden={true}/>;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(posts);
    let index;
    if (posts.length < 0) {
      index = <View></View>
    } else {
      index =
        <ListView
          dataSource={dataSource}
          renderRow={this.renderRow}
          enableEmptySections={true}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
              colors={["#5daf26"]}/>
          }/>
    }

    const tabNav =
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
      </View>;


      return (
        <View>
          {hideBar}
          <View style={styles.header}>
            <Text style={styles.headerText}>REDDIT VIEWER</Text>
            <Text style={styles.headerText}>/{this.state.currentTab}</Text>
          </View>
          {tabNav}
          {index}
       </View>
     );
  }

}
const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#5daf26',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
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
    borderBottomWidth: 2,
    borderColor: '#38751e',
  },
  header: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
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
