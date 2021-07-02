import { connect } from 'react-redux'
import ProduceTrendsTemplate from '../components/ProduceTrendsTemplate/ProduceTrendsTemplate';

import {
  getIsAnyRetailerSelected,
  getIsProduceTrendsLoading,
  getRetailersState,
  getProduceList,
  getProduceTrendsContent,
  getProduceTrendsNotFoundContent,
  getProduceTrendsCompareBy,
  getProduceTrendsViewBy,
  getProduceTrendsData,
  getViewport,
  getBreadcrumbsContent,
  getSelectedLocation,
} from '../selectors/index'

import { 
  generateProduceTrendsQueryAndFetch, 
  setProduceTrendCompareBy,
  setProduceTrendsView
} from '../actions/produceTrends';

import { setBreadcrumbs } from '../actions/breadcrumbs';
import { setCurrentPage } from '../actions/locations';

const mapStateToProps = state => {
  return {
    content: getProduceTrendsContent(state),
    isAnyRetailersSelected: getIsAnyRetailerSelected(state),
    isLoading: getIsProduceTrendsLoading(state),
    notFoundContent: getProduceTrendsNotFoundContent(state),
    retailerData: getRetailersState(state),
    produceList: getProduceList(state),
    compareBy: getProduceTrendsCompareBy(state),
    trendsData: getProduceTrendsData(state),
    viewport: getViewport(state),
    viewBy: getProduceTrendsViewBy(state),
    location: getSelectedLocation(state),
  }
}

  ProduceTrendsTemplate.getInitialProps = async ({ isServer, store, query }) => {
  const { dispatch, getState } = store;
  const { compare, location, produce, viewby } = query;
  const state = getState();

  // On intial load (from the server) we want to wait for the request to complete before render
  if (isServer) {
    if (compare) dispatch(setProduceTrendCompareBy(compare));
    if (viewby) dispatch(setProduceTrendsView(viewby));
    await generateProduceTrendsQueryAndFetch(dispatch, getState(), location, produce);  
  }

  // When client side request we want the page render as soon as possible and then then update when the data is available
  if (!isServer) {
    generateProduceTrendsQueryAndFetch(dispatch, getState(), location, produce);  
  }

  // Set breadcrumbs
  const trendsLabel = getBreadcrumbsContent(state).producetrends ? getBreadcrumbsContent(state).producetrends.label : '';
  const bestpicksLabel = getBreadcrumbsContent(state).bestpicks ? getBreadcrumbsContent(state).bestpicks.label : '';
  const breadcrumbParentPage = {
    label: bestpicksLabel,
    link: `/best-picks?location=${location}`,
    as: `/${location}/produce/best-picks`
  }
  const metaExtra = `${getBreadcrumbsContent(state).producetrends.label} for ${produce} in ${getSelectedLocation(state).label}`

  dispatch(setBreadcrumbs(trendsLabel, breadcrumbParentPage));
  dispatch(setCurrentPage('ProduceTrends',metaExtra));
  return {
    pageId: 'ProduceTrends'
  };
}

export default connect(
  mapStateToProps,
  null
)(ProduceTrendsTemplate);
