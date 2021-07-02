import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import MatchCard from './MatchCard';
import { 
  getRetailersState,
  getMatchCardsContent,
  getViewport ,
} from '../../selectors/index';

const mapStateToProps = state => {
  return {
    retailersData: getRetailersState(state),
    content: getMatchCardsContent(state),
    viewport: getViewport(state),
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
)(MatchCard);