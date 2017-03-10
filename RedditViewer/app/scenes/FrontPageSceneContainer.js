import { connect } from 'react-redux';
import FrontPageScene from './FrontPageScene';

const mapStateToProps = (state, ownProps) => ({
  posts: state.posts,
  navigator: ownProps.navigator,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(FrontPageScene);
