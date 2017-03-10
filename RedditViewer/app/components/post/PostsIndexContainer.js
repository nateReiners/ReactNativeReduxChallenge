import { connect } from 'react-redux';
import PostsIndex from './PostsIndex';
import { requestPosts } from '../../actions/post/postActions';

const mapStateToProps = state => ({
  posts: state.posts,
});

const mapDispatchToProps = dispatch => ({
  requestPosts: () => dispatch(requestPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsIndex);
