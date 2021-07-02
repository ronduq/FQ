import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import TrendsFilters from './TrendsFilters';

import { selectAllProducesThunk, updateProduceTrendsThunk } from '../../actions/producesActions';
import { setCompareByThunk } from '../../actions/retailerTrends';
import { getFiltersContent } from '../../selectors/index'

const mapStateToProps = state => {
  return {
    filtersContent: getFiltersContent(state),
    title: getFiltersContent(state).produce,
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateSelection: (produceId, check, parentCode, isParent) => updateProduceTrendsThunk(produceId, check, parentCode, isParent),
      selectAll: (status) => selectAllProducesThunk(status, true),
      setCompareBy: (value) => setCompareByThunk(value),
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrendsFilters);
