import { connect } from 'react-redux';
import PostsIndex from './PostsIndex';
import { requestPosts } from '../../actions/post/postActions';

const mapStateToProps = (state, ownProps) => ({
  posts: state.posts,
  navigator: ownProps.navigator,
});

const mapDispatchToProps = dispatch => ({
  requestPosts: () => dispatch(requestPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsIndex);
