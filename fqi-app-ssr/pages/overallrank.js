import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import OverallRankTemplate from '../components/OverallRankTemplate/OverallRankTemplate';
import { 
  getRetailersState, 
  getProducesState,
  getRetailerRanks,
  getRetailerRanksState,
  getSelectedLocation,
  getNotFoundScreens,
  getViewport,
  getBreadcrumbsContent,
  getFiltersContent,
  getOverallRankContent,
} from '../selectors/index';

import { generateRetailersRankQueryAndFetch, setInitialCompareBy } from '../actions/retailerRanks';

import { updateProduceThunk, selectAllProducesThunk } from '../actions/producesActions';
import { updateRetailerThunk, selectAllRetailersThunk } from '../actions/retailers';
import { sortRankDirectionThunk  } from '../actions/retailerRanks';
import { setBreadcrumbs } from '../actions/breadcrumbs';
import { setCurrentPage } from '../actions/locations';

const mapStateToProps = state => {
  return {
    retailersData: getRetailersState(state),
    producesData: getProducesState(state),
    retailerRanksData: getRetailerRanksState(state),
    selectedLocation: getSelectedLocation(state),
    notFoundScreens: getNotFoundScreens(state),
    viewport: getViewport(state),
    filtersContent: getFiltersContent(state),
    content: getOverallRankContent(state),
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateRetailer: (retailerId, check) => updateRetailerThunk(retailerId, check),
      updateProduce: (produceId, check, parentCode, isParent) => updateProduceThunk(produceId, check, parentCode, isParent),
      sortRanks: (criteria, direction) => sortRankDirectionThunk(criteria, direction),
      selectAllRetailers: () => selectAllRetailersThunk(null, false),
      selectAllProduces: () => selectAllProducesThunk(null, false),
    },
    dispatch
  );

OverallRankTemplate.getInitialProps = async ({ isServer, store, query }) => {
  const { dispatch, getState } = store;
  const { location, compare } = query;

  if (isServer && compare) dispatch(setInitialCompareBy(compare));
  
  if (getRetailerRanks(getState()).length === 0) {
    await generateRetailersRankQueryAndFetch(dispatch, getState(), location)
  } 

  const state = getState();

  // Set breadcrumbs
  const label = getBreadcrumbsContent(state).overallrank ? getBreadcrumbsContent(state).overallrank.label : '';
  
  const metaExtra = `${getOverallRankContent(state).table_title } ${getSelectedLocation(state).label}`
  dispatch(setBreadcrumbs(label));
  dispatch(setCurrentPage('OverallRank', metaExtra));
  return {
    pageId: 'OverallRank'
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OverallRankTemplate);
