import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import BestPicksTemplate from '../components/BestPicksTemplate/BestPicksTemplate';

import { generateBestPicksAndFetch, setInitalBestPicksCriteria } from '../actions/bestPicks';
import { 
  getSelectedLocation, 
  getBestPicksContent,
  getBestPicksNotFoundContent,
  getBestPicks,
  getRetailersState,
  getProducesState,
  getViewport,
  getBreadcrumbsContent,
} from '../selectors/index'
import { setBreadcrumbs } from '../actions/breadcrumbs';
import { setCurrentPage } from '../actions/locations';

const mapStateToProps = state => {
  return {
    content: getBestPicksContent(state),
    selectedLocation: getSelectedLocation(state),
    notFoundContent: getBestPicksNotFoundContent(state),
    bestPicks: getBestPicks(state),
    retailersData: getRetailersState(state),
    producesData: getProducesState(state),
    viewport: getViewport(state),
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
    },
    dispatch
  );

  BestPicksTemplate.getInitialProps = async ({ isServer, store, query }) => {
  const { dispatch, getState } = store;
  const { location, compare } = query;
  const state = getState();
  const bestPicks = getBestPicks(state);

  if (isServer && compare) dispatch(setInitalBestPicksCriteria(compare));

  if (isServer && Object.keys(bestPicks.topPicks).length == 0) {
    await generateBestPicksAndFetch(dispatch, getState(), location)
  } else {
    generateBestPicksAndFetch(dispatch, getState(), location)
  }

  // Set breadcrumbs

  const label = getBreadcrumbsContent(state).bestpicks ? getBreadcrumbsContent(state).bestpicks.label : '';

  // leave until sitemap confirmed
  // const breadcrumbParentPage = {
  //   label: 'Produce Basket',
  //   link: `/produce-basket?location=${location}`,
  //   as: `/${location}/produce`
  // }

  const metaExtra = `${label} in ${getSelectedLocation(state).label}`
  
  dispatch(setBreadcrumbs(label));
  dispatch(setCurrentPage('BestPicks', metaExtra));
  return {
    pageId: 'BestPicks'
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BestPicksTemplate)
