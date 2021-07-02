import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import BestPicksFilters from './BestPicksFilters';

import { 
  getRetailersState, 
  getProducesState,
  getFiltersContent,
} from '../../selectors/index'

import { updateBestPicksProduceThunk, selectAllBestPicksProducesThunk } from '../../actions/producesActions';
import { updateBestPicksRetailerThunk, selectAllBestPicksRetailersThunk } from '../../actions/retailers';
import { sortBestPicksThunk  } from '../../actions/bestPicks';

const mapStateToProps = state => {
  return {
    retailersData: getRetailersState(state),
    producesData: getProducesState(state),
    filtersContent: getFiltersContent(state),
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateRetailer: (retailerId, check, parentCode, isParent, criteria) => updateBestPicksRetailerThunk(retailerId, check, parentCode, isParent, criteria),
      updateProduce: (produceId, check, parentCode, isParent, criteria) => updateBestPicksProduceThunk(produceId, check, parentCode, isParent, criteria),
      sortBestPicks: (criteria, direction) => sortBestPicksThunk(criteria, direction),
      selectAllRetailers: (currentSelection, criteria) => selectAllBestPicksRetailersThunk(status, false, currentSelection, criteria),
      selectAllProduces: (status, criteria) => selectAllBestPicksProducesThunk(status, false, criteria)
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BestPicksFilters);