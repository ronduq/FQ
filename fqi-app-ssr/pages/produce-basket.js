import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import ProduceBasketTemplate from '../components/ProduceBasketTemplate/ProduceBasketTemplate';

import {
  getProduceBasketContent,
  getProduceitems,
  getProduceImages,
  getProduceLabels,
  getProduceCount,
  getProduceAllSelected,
  getProduceInitialSelection,
  getSelectedLocation,
  getViewport,
} from '../selectors/index';

import { selectAllProduces, updateProduceTrendsThunk } from '../actions/producesActions';
import { setBreadcrumbs } from '../actions/breadcrumbs';
import { setCurrentPage } from '../actions/locations';

const mapStateToProps = state => {
  return {
    allSelected: getProduceAllSelected(state),
    count: getProduceCount(state),
    content: getProduceBasketContent(state),
    images: getProduceImages(state),
    items: getProduceitems(state),
    labels: getProduceLabels(state),
    selectedLocation: getSelectedLocation(state),
    viewport: getViewport(state),
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      selectAllProduces: (status) => selectAllProduces(status),
      updateProduce: (produceId, checked, parentCode) => updateProduceTrendsThunk(produceId, checked, parentCode, false),
    },
    dispatch
  );

ProduceBasketTemplate.getInitialProps = async ({ store }) => {
  const { dispatch, getState } = store;
  const state = getState();

  if (getProduceInitialSelection(state)) {
    dispatch(selectAllProduces(false))
  }

  const metaExtra = `Produce Basket in ${getSelectedLocation(state).label}`

  dispatch(setBreadcrumbs(''));
  dispatch(setCurrentPage('ProduceBasket',metaExtra));
  return {
    pageId: 'ProduceBasket'
  };
}

  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProduceBasketTemplate)

