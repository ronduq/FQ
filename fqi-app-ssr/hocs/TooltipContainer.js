import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Tooltip from './Tooltip';
import { 
  getTooltipsContent,
  getViewport ,
} from '../selectors/index';

const mapStateToProps = state => {
  return {
    content: getTooltipsContent(state),
    viewport: getViewport(state),
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tooltip);