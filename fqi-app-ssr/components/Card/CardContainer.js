import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Card from './Card';
import { getProductCardLabels, getSelectedLocationId, getRetailersState } from '../../selectors/index';

const mapStateToProps = state => {
  return {
    cardLabels: getProductCardLabels(state),
    selectedLocation: getSelectedLocationId(state),
    retailersData: getRetailersState(state),
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card);