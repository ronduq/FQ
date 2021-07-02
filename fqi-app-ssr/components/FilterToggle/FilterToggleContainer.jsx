import { connect } from 'react-redux'
import FilterToggle from './FilterToggle';
import { getViewport } from '../../selectors/index';

const mapStateToProps = state => {
  return {
    viewport: getViewport(state)
  }
}

export default connect(
  mapStateToProps,
  null
)(FilterToggle);
