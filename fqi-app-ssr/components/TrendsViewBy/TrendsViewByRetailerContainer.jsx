import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import TrendsViewBy from './TrendsViewBy';

import { 
  getShowViewByDropdown
} from '../../selectors/index';

import { setRetailerTrendsViewThunk } from '../../actions/retailerTrends';

const mapStateToProps = state => {
  return {
    showViewByDropdown: getShowViewByDropdown(state),
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setViewBy: (e) => setRetailerTrendsViewThunk(e.target.value),
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrendsViewBy);
