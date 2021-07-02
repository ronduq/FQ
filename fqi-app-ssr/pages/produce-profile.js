import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import ProduceProfileTemplate from '../components/ProduceProfileTemplate/ProduceProfileTemplate';

import { generateProduceInfoAndFetch } from '../actions/produceInfo';
import { setCurrentPage } from '../actions/locations';

import { 
  getRetailersState,
  getSelectedRetailer,
  getProduceInfo,
  getProducesState,
  getProduceProfileContent,
  getBreadcrumbsContent,
  getSelectedRetailerLabel,
  getButtonsContent,
  getSelectedLocation,
} from '../selectors/index'

import { setBreadcrumbs } from '../actions/breadcrumbs';

const mapStateToProps = state => {
  return {
    retailersData: getRetailersState(state),
    selectedRetailerId: getSelectedRetailer(state),
    produceInfo: getProduceInfo(state),
    producesData: getProducesState(state),
    content: getProduceProfileContent(state),
    buttonContent: getButtonsContent(state),
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
    },
    dispatch
  );


ProduceProfileTemplate.getInitialProps = async ({ isServer, store, query }) => {
  const { dispatch, getState } = store;
  const { location, retailer, produce } = query;
  const state = getState();
  await generateProduceInfoAndFetch(dispatch, state, location, retailer, produce)

  // Set breadcrumbs
  const retailerLabel = getSelectedRetailerLabel(state);
  const produceLabel = getProducesState(state).itemsLabels[produce]
  const overallLabel = getBreadcrumbsContent(state).overallrank ? getBreadcrumbsContent(state).overallrank.label : '';

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

  const metaExtra = `${produceLabel} in ${retailerLabel}, ${getSelectedLocation(state).label}`

  dispatch(setBreadcrumbs(produceLabel, breadcrumbParentPage, breadcrumbGrandparentPage));
  dispatch(setCurrentPage('ProduceProfile', metaExtra));
  return {
    pageId: 'ProduceProfile'
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProduceProfileTemplate)

