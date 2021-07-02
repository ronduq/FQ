import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import HomeTemplate from '../components/HomeTemplate/HomeTemplate';
import { getHomepageBackground, getHomepageContent, getLocations, getHomepageSlidesContent } from '../selectors/index';
import { setCurrentPage } from '../actions/locations';

const mapStateToProps = state => {
  return {
    content: getHomepageContent(state),
    locations: getLocations(state),
    homepage: true,
    background: getHomepageBackground(state),
    slidesContent: getHomepageSlidesContent(state),
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
    },
    dispatch
  );

  HomeTemplate.getInitialProps = async ({ store }) => {
    const { dispatch } = store;
    dispatch(setCurrentPage('Home'));
    return {
      pageId: 'Home'
    };
  }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null
)(HomeTemplate);
