import { connect } from 'react-redux'
import RetailerTrendsTemplate from '../components/RetailerTrendsTemplate/RetailerTrendsTemplate';

import {
  getIsAnyProduceSelected,
  getIsRetailerTrendsLoading,
  getProducesState,
  getRetailerList,
  getRetailerTrendsContent,
  getRetailerTrendsNotFoundContent,
  getRetailerTrendsCompareBy,
  getRetailerTrendsViewBy,
  getRetailerTrendsData,
  getViewport,
  getSelectedRetailerLabel,
  getBreadcrumbsContent,
  getSelectedLocation,
} from '../selectors/index'

import { 
  generateRetailerTrendsQueryAndFetch, 
  setRetailersTrendCompareBy,
  setRetailerTrendsView,
} from '../actions/retailerTrends';

import { setBreadcrumbs } from '../actions/breadcrumbs';
import { setCurrentPage } from '../actions/locations';

const mapStateToProps = state => {
  return {
    content: getRetailerTrendsContent(state),
    isAnyProduceSelected: getIsAnyProduceSelected(state),
    isLoading: getIsRetailerTrendsLoading(state),
    notFoundContent: getRetailerTrendsNotFoundContent(state),
    producesData: getProducesState(state),
    retailersList: getRetailerList(state),
    compareBy: getRetailerTrendsCompareBy(state),
    trendsData: getRetailerTrendsData(state),
    viewport: getViewport(state),
    viewBy: getRetailerTrendsViewBy(state),
    location: getSelectedLocation(state),
  }
}

RetailerTrendsTemplate.getInitialProps = async ({ isServer, store, query }) => {
  const { dispatch, getState } = store;
  const { compare, location, retailer, viewby } = query;
  const state = getState();

  // On intial load (from the server) we want to wait for the request to complete before render
  if (isServer) {
    if (compare) dispatch(setRetailersTrendCompareBy(compare));
    if (viewby) dispatch(setRetailerTrendsView(viewby));
    await generateRetailerTrendsQueryAndFetch(dispatch,  getState(), location, retailer);  
  }

  // When client side request we want the page render as soon as possible and then then update when the data is available
  if (!isServer) {
    generateRetailerTrendsQueryAndFetch(dispatch,  getState(), location, retailer);  
  }

  // Set breadcrumbs
  const overallLabel = getBreadcrumbsContent(state).overallrank ? getBreadcrumbsContent(state).overallrank.label : '';
  const retailertrendsLabel = getBreadcrumbsContent(state).retailertrends ? getBreadcrumbsContent(state).retailertrends.label : '';
  const retailerLabel = getSelectedRetailerLabel(state)

  const breadcrumbParentPage = {
    label: retailerLabel,
    link: `/retailer-profile?location=${location}&retailer=${retailer}`,
    as: `/${location}/retailers/${retailer}`
  }

  const breadcrumbGrandparentPage = {
    label: overallLabel,
    link: `/overallrank?location=${location}`,
    as: `/${location}/retailers`
  }
  const metaExtra = `${retailerLabel} in ${getSelectedLocation(state).label}`
  dispatch(setBreadcrumbs(retailertrendsLabel, breadcrumbParentPage, breadcrumbGrandparentPage));
  dispatch(setCurrentPage('RetailerTrends',metaExtra));
  return {
    pageId: 'RetailerTrends'
  };
}


export default connect(
  mapStateToProps,
  null,
)(RetailerTrendsTemplate);
