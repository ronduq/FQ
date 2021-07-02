import { connect } from 'react-redux'
import Meta from './Meta';

import { 
  getSocialLinksContent,
  getButtonsContent,
  getMetadataContent,
  getCurrentPage,
  getMetaExtra,
  getCookieBannerContent,
} from '../../selectors/index';

const mapStateToProps = state => {
  return {
    socialContent: getSocialLinksContent(state),
    buttonContent: getButtonsContent(state),
    metadataContent: getMetadataContent(state),
    currentPageId: getCurrentPage(state),
    metaExtra: getMetaExtra(state),
    cookieBannerContent: getCookieBannerContent(state),
  }
}

export default connect(
  mapStateToProps,
  null
)(Meta);
