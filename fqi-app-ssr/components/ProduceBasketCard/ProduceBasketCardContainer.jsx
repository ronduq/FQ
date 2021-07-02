import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import ProduceBasketCard from '../ProduceBasketCard/ProduceBasketCard';

import { updateProduceTrendsThunk } from '../../actions/producesActions';

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateProduce: (produceId, checked, parentCode) => updateProduceTrendsThunk(produceId, checked, parentCode, false),
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(ProduceBasketCard);
