import { connect } from 'react-redux'
import Footer from './Footer';
import { getFooterItems } from '../../selectors/index';


const mapStateToProps = state => {
  return {
    footerItems: getFooterItems(state),
  }
}

export default connect(
  mapStateToProps,
  null
)(Footer);