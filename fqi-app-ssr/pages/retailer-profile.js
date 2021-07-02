import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import RetailerProfileTemplate from '../components/RetailerProfileTemplate/RetailerProfileTemplate';

import { generateRetailersRankQueryAndFetch } from '../actions/retailerRanks';
import { generateRetailersProduceQueryAndFetch, setRetailerProducesCompareBy } from '../actions/retailerProduces';

import { 
  getSelectedLocation, 
  getRetailerProfileContent,
  getRetailerRanksStateLabels, 
  getSelectedRetailerLabel,
  getRetailerRanksSingle,
  getRetailerRanks,
  getRetailerProduces,
  getProducesState,
  getNotFoundScreens,
  getViewport,
  getBreadcrumbsContent,
  getRetailerProducesCompareBy
} from '../selectors/index';

import { setBreadcrumbs } from '../actions/breadcrumbs';
import { setProduceInfoTable } from '../actions/retailerProduces';
import { setCurrentPage } from '../actions/locations';

const mapStateToProps = state => {
  return {
    content: getRetailerProfileContent(state),
    retailersLabels: getRetailerRanksStateLabels(state),
    selectedLocation: getSelectedLocation(state),
    selectedRetailer: getSelectedRetailerLabel(state),
    retailerRanks: getRetailerRanks(state),
    notFoundScreens: getNotFoundScreens(state),
    viewport: getViewport(state),
    compareBy: getRetailerProducesCompareBy(state),
    producesData: getProducesState(state),
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
    },
    dispatch
  );


RetailerProfileTemplate.getInitialProps = async ({ isServer, store, query }) => {
  const { dispatch, getState } = store;
  const { location, retailer, compare } = query;

  if (isServer && compare) dispatch(setRetailerProducesCompareBy(compare));
  

  const state = getState();
  const firstProduct = getProducesState(state).items.find(product => (!product.isParent && product.selected));
  dispatch(setProduceInfoTable(firstProduct.id, getProducesState(state).itemsLabels[firstProduct.id]));
  
  if (getRetailerRanksSingle(state).length === 0 || isServer) {
    await generateRetailersRankQueryAndFetch(dispatch, getState(), location, firstProduct.id, retailer);
  } else {
    generateRetailersRankQueryAndFetch(dispatch, getState(), location, firstProduct.id, retailer);
  }

  if (getRetailerRanks(state).length === 0 || isServer) {
    await generateRetailersRankQueryAndFetch(dispatch, getState(), location);
  } else {
    generateRetailersRankQueryAndFetch(dispatch, getState(), location);
  }

  if (getRetailerProduces(state).items.length === 0 || isServer) {
    await generateRetailersProduceQueryAndFetch(dispatch, getState(), location, retailer);
  } else {
    generateRetailersProduceQueryAndFetch(dispatch, getState(), location, retailer);
  }

  // Set breadcrumbs
  const overallLabel = getBreadcrumbsContent(state).overallrank ? getBreadcrumbsContent(state).overallrank.label : '';
  const retailerLabel = getSelectedRetailerLabel(state)
  const breadcrumbParentPage = {
    label: overallLabel,
    link: `/overallrank?location=${location}`,
    as: `/${location}/retailers`
  }
  const metaExtra = `${retailerLabel} in ${getSelectedLocation(state).label}`

  dispatch(setBreadcrumbs(retailerLabel, breadcrumbParentPage));
  dispatch(setCurrentPage('RetailerProfile', metaExtra));
  return {
    pageId: 'RetailerProfile'
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RetailerProfileTemplate)

