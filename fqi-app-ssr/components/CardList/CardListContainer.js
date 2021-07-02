import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import CardList from './CardList';
import { 
  getRetailersState,
  getProducesState,
  getRetailerProduces,
  getSelectedRetailer,
} from '../../selectors/index';

const mapStateToProps = state => {
  return {
    retailersData: getRetailersState(state),
    producesData: getProducesState(state),
    retailerProduces: getRetailerProduces(state),
    selectedRetailerId: getSelectedRetailer(state) ,
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
)(CardList);