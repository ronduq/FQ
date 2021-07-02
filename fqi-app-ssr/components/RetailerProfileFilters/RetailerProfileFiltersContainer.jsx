import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import RetailerProfileFilters from './RetailerProfileFilters';

import { 
  getRetailersState, 
  getProducesState,
  getFiltersContent,
} from '../../selectors/index'

import { updateProduceThunk, selectAllProducesThunk } from '../../actions/producesActions';
import { updateRetailerProfileThunk, selectAllRetailerProfileThunk } from '../../actions/retailers';
import { sortRetailerProducesCompareByAndFetchThunk } from '../../actions/retailerProduces';

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
      updateRetailer: (retailerId, check) => updateRetailerProfileThunk(retailerId, check),
      updateProduce: (produceId, check, parentCode, isParent, produce, retailer) => updateProduceThunk(produceId, check, parentCode, isParent, produce, retailer),
      selectAllRetailers: (currentSelection) => selectAllRetailerProfileThunk(currentSelection),
      selectAllProduces: (status) => selectAllProducesThunk(status, false, true),
      sortRanks: (compareby, direction) => sortRetailerProducesCompareByAndFetchThunk(compareby, direction),
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RetailerProfileFilters);