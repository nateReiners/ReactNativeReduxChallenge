import { connect } from 'react-redux';
import DetailScene from './DetailScene';

const mapStateToProps = (state, ownProps) => ({
  posts: state.posts,
  navigator: ownProps.navigator,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailScene);
