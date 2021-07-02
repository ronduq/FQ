import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import TrendsViewBy from './TrendsViewBy';

import { 
  getShowViewByDropdownProduce
} from '../../selectors/index';

import { setProduceTrendsViewThunk } from '../../actions/produceTrends';

const mapStateToProps = state => {
  return {
    showViewByDropdown: getShowViewByDropdownProduce(state),
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setViewBy: (e) => setProduceTrendsViewThunk(e.target.value),
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrendsViewBy);
