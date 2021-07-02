import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import AggregatedScore from './AggregatedScore';
import { getSelectedRetailerRanks, getButtonsContent, } from '../../selectors/index';

const mapStateToProps = state => {
  return {
    retailerRankData: getSelectedRetailerRanks(state),
    buttonContent: getButtonsContent(state),
  }
}

export default connect(
  mapStateToProps,
  null
)(AggregatedScore);