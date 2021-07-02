import { connect } from 'react-redux'
import SharePage from './SharePage';

import { 
  getSelectedProducesURL,
  getSelectedRetailerURL,
  getSocialLinksContent,
  getButtonsContent,
} from '../../selectors/index';

const mapStateToProps = state => {
  return {
    content: getSocialLinksContent(state),
    producesUrl: getSelectedProducesURL(state),
    retailersUrl: getSelectedRetailerURL(state),
    buttonContent: getButtonsContent(state),
  }
}

export default connect(
  mapStateToProps,
  null
)(SharePage);
