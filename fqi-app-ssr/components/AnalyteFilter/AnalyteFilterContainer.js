import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import AnalyteFilter from './AnalyteFilter';
import { 
  getProduceInfo,
  getProducesState,
  getViewport ,
  getUsdaContent,
  getProduceProfileContent,
} from '../../selectors/index';
import { setViewport } from '../../actions/content';

const mapStateToProps = state => {
  return {
    viewport: getViewport(state),
    produceInfo: getProduceInfo(state),
    producesData: getProducesState(state),
    usdaTexts: getUsdaContent(state),
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
)(AnalyteFilter);