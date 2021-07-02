import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import TableFilter from './TableFilter';
import { 
  getRetailersState,
  getProducesState,
  getRetailerRanksState,
  getViewport,
  getSelectedLocationId,
  getProduceInfoTable,
  getRetailerProduces,
  getNotFoundScreens,
  getRetailerProfileContent,
} from '../../selectors/index';
import { setViewport } from '../../actions/content';
import { updateProduceThunk } from '../../actions/producesActions';
import { sortDirectionRetailerProfileThunk  } from '../../actions/retailers';
import { setProduceInfoTable } from '../../actions/retailerProduces'

const mapStateToProps = state => {
  return {
    viewport: getViewport(state),
    retailersData: getRetailersState(state),
    producesData: getProducesState(state),
    retailerRanksData: getRetailerRanksState(state),
    selectedLocation: getSelectedLocationId(state),
    tableInfo: getProduceInfoTable(state),
    retailerProduces: getRetailerProduces(state),
    notFoundScreens: getNotFoundScreens(state),
    content: getRetailerProfileContent(state),
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setViewport: (width) => setViewport(width),
      sortRanks: (criteria, direction, type) => sortDirectionRetailerProfileThunk(criteria, direction, type),
      updateProduce: (produceId, check, parentCode, isParent, produce) => updateProduceThunk(produceId, check, parentCode, isParent, produce),
      setProduceInfoTable: (produce, title) => setProduceInfoTable(produce, title),
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableFilter);