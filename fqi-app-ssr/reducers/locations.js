import { initialLocationState } from './initialState';
import { 
  SET_LOCATIONS,
  SET_SELECTED_LOCATION,
  SET_CURRENT_PAGE,
} from '../constants/'

const locationsReducer = (state = initialLocationState, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_LOCATIONS: {
      const { locations } = payload;
      return {
        ...state,
        locations
      }
    }
    case SET_SELECTED_LOCATION: {
      const { selectedLocation } = payload;
      return {
        ...state,
        selectedLocation: state.locations.find(({id}) => id === selectedLocation)
      }
    }
    case SET_CURRENT_PAGE: {
      const{ currentPage, metaExtra } = payload;
      return {
        ...state,
        currentPage,
        metaExtra,
      }
    }
    default:
      return state;
  }
};

export default locationsReducer;
