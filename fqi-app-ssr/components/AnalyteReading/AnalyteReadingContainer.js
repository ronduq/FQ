import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import AnalyteReading from './AnalyteReading';
import { 
  getUsdaContent,
  getProduceInfo,
  getProduceProfileContent,
  getSelectedRetailerLabel
} from '../../selectors/index';

const mapStateToProps = state => {
  return {
    usdaTexts: getUsdaContent(state),
    produceInfo: getProduceInfo(state),
    content: getProduceProfileContent(state),
    retailerLabel: getSelectedRetailerLabel(state)
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
)(AnalyteReading);