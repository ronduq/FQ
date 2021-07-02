import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import TrendsFilters from './TrendsFilters';

import { setCompareByThunk } from '../../actions/produceTrends';
import { selectAllRetailersThunk, updateRetailerTrendsThunk } from '../../actions/retailers';
import { getFiltersContent } from '../../selectors/index'

const mapStateToProps = state => {
  return {
    filtersContent: getFiltersContent(state),
    title: getFiltersContent(state).retailers,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateSelection: (produceId, check) => updateRetailerTrendsThunk(produceId, check),
      selectAll: (status) => selectAllRetailersThunk(status, true),
      setCompareBy: (value) => setCompareByThunk(value),
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrendsFilters);
