import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Header from './Header';
import { setBreadcrumbs } from '../../actions/breadcrumbs';

import { 
  getLocations, 
  getSelectedLocation, 
  getViewport,
  getBreadcrumbsContent,
  getBreadcrumbs,
  getHeaderContent,
} from '../../selectors/index';
import { setViewport, resetFiltersThunk } from '../../actions/content';

const mapStateToProps = state => {
  return {
    locations: getLocations(state),
    selectedLocation: getSelectedLocation(state),
    viewport: getViewport(state),
    content: getBreadcrumbsContent(state),
    headerContent: getHeaderContent(state),
    breadcrumbs: getBreadcrumbs(state)
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setViewport: (width) => setViewport(width),
      resetFilters: () => resetFiltersThunk(),
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);