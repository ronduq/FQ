import { breadcrumbs } from './initialState';
import { 
  SET_BREADCRUMBS,
} from '../constants/'

const breadcrumbsReducer = (state = breadcrumbs, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_BREADCRUMBS: {
      const { page, parentPage, grandparentPage } = payload;
      return {
        ...state,
        currentPage: page,
        parentPage,
        grandparentPage
      }
    }
    default:
      return state;
  }
};

export default breadcrumbsReducer;
