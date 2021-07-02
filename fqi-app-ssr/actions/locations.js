import { 
  SET_LOCATIONS,
  SET_SELECTED_LOCATION,
  SET_CURRENT_PAGE,
} from '../constants/'

export const setLocations = locations => ({
  type: SET_LOCATIONS,
  payload: { locations }
});
      
export const setSelectedLocation = selectedLocation => ({
  type: SET_SELECTED_LOCATION,
  payload: { selectedLocation }
});
      
export const setCurrentPage = (currentPage, metaExtra) => ({
  type: SET_CURRENT_PAGE,
  payload: { currentPage, metaExtra }
});