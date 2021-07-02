import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import ProduceDetails from './ProduceDetails';
import { 
  getRetailersState,
  getProducesState,
  getSelectedRetailer,
  getProduceInfo,
  getViewport,
  getProduceProfileContent,
} from '../../selectors/index';
import { setViewport } from '../../actions/content';

const mapStateToProps = state => {
  return {
    retailersData: getRetailersState(state),
    producesData: getProducesState(state),
    produceInfo: getProduceInfo(state),
    selectedRetailerId: getSelectedRetailer(state),
    viewport: getViewport(state),
    content: getProduceProfileContent(state),
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setViewport: (width) => setViewport(width),
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProduceDetails);