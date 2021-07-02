import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import SubscribeTemplate from '../components/SubscribeTemplate/SubscribeTemplate';

import {
  getSubscribeContent,
  getSelectedLocation, 
} from '../selectors/index'

const mapStateToProps = state => {
  return {
    content: getSubscribeContent(state),
    selectedLocation: getSelectedLocation(state),
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
)(SubscribeTemplate)

