import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import RetailerHighlightsFilter from './RetailerHighlightsFilter';

import { 
  getRetailerProducesSortDirection,
} from '../../selectors/index';

import { setRetailerProducesDirectionAndFetch } from '../../actions/retailerProduces'

const mapStateToProps = state => {
  return {
    sortDirection: getRetailerProducesSortDirection(state)
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateSortDirection: (direction) => setRetailerProducesDirectionAndFetch(direction),
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RetailerHighlightsFilter);