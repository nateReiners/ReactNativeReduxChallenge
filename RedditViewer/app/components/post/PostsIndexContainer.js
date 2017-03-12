import { connect } from 'react-redux';
import PostsIndex from './PostsIndex';
import { requestPosts } from '../../actions/post/postActions';

const mapStateToProps = (state, ownProps) => ({
  posts: state.posts,
  navigator: ownProps.navigator,
});

const mapDispatchToProps = dispatch => ({
  requestPosts: (route) => dispatch(requestPosts(route)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsIndex);
