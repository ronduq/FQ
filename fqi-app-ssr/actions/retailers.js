import { 
  UPDATE_RETAILER, 
  SELECT_ALL_RETAILERS_CHECKBOX, 
  SELECT_ALL_RETAILERS,
  SET_SELECTED_RETAILER,
  SET_INITIAL_RETAILERS,
  SET_RETAILERS_CONTENT,
  SET_RETAILERS_DATA
} from '../constants';

import { getSelectedLocation, getProduceInfoTable } from '../selectors';
import { setContentError } from './content';
import dataFetcher from '../lib/dataFetcher';
import { generateRetailersRankQueryAndFetch, setRetailerRanks } from './retailerRanks';
import { generateBestPicksAndFetch } from './bestPicks';

export const updateRetailerThunk = (retailerId, check, parentCode, isParent, produce, retailer) => (dispatch, getState) => {
  dispatch(updateRetailer(retailerId, check));
  dispatch(selectAllRetailersCheckbox());
  const selectedLocation = getSelectedLocation(getState());
  generateRetailersRankQueryAndFetch(dispatch, getState(), selectedLocation.id, '', retailer)
}

export const updateRetailerProfileThunk = (retailerId, check) => (dispatch) => {
  dispatch(updateRetailer(retailerId, check));
  dispatch(selectAllRetailersCheckbox());
  dispatch(fetchRetailerProfileDataThunk());
}

export const selectAllRetailerProfileThunk = currentSelection => (dispatch) => {
  dispatch(selectAllRetailers(null, currentSelection));
  dispatch(fetchRetailerProfileDataThunk());
}

export const sortDirectionRetailerProfileThunk = (criteria, direction) => (dispatch) => {
  dispatch(setRetailerRanks(criteria, direction));
  dispatch(fetchRetailerProfileDataThunk());
}

export const fetchRetailerProfileDataThunk = () => (dispatch, getState) => {
  const state = getState();
  const selectedLocation = getSelectedLocation(state)
  const selectedProduce = getProduceInfoTable(state).produce;
  generateRetailersRankQueryAndFetch(dispatch, getState(), selectedLocation.id, selectedProduce)
}

export const updateRetailerTrendsThunk = (retailerId, check) => (dispatch) => {
  dispatch(updateRetailer(retailerId, check));
  dispatch(selectAllRetailersCheckbox());
}

export const updateBestPicksRetailerThunk = (retailerId, check, parentCode, isParent, criteria) => (dispatch, getState) => {
  dispatch(updateRetailer(retailerId, check));
  dispatch(selectAllRetailersCheckbox());
  const selectedLocation = getSelectedLocation(getState());
  generateBestPicksAndFetch(dispatch, getState(), selectedLocation.id, criteria)
}

export const updateRetailer = (retailerId, check) => ({
  type: UPDATE_RETAILER,
  payload: { retailerId, check }
})

export const selectAllRetailersCheckbox = () => ({
  type: SELECT_ALL_RETAILERS_CHECKBOX,
})

export const selectAllRetailersThunk = (status, changeLocation, currentSelection = null, retailer) => (dispatch, getState) => {
  dispatch(selectAllRetailers(status, currentSelection));
  if (!changeLocation) {
    const selectedLocation = getSelectedLocation(getState());
    generateRetailersRankQueryAndFetch(dispatch, getState(), selectedLocation.id, '' , retailer)
  }
}

export const selectAllBestPicksRetailersThunk = (status, changeLocation, currentSelection = null, criteria) => (dispatch, getState) => {
  dispatch(selectAllRetailers(status, currentSelection));

  if (!changeLocation) {
    const selectedLocation = getSelectedLocation(getState());
    generateBestPicksAndFetch(dispatch, getState(), selectedLocation.id, criteria)
  }
}

export const selectAllRetailers = (status, currentSelection) => ({
  type: SELECT_ALL_RETAILERS,
  payload: { status, currentSelection }
})

export const setRetailersContent = (retailers) => ({
  type: SET_RETAILERS_CONTENT,
  payload: { retailers }
});

      
export const setSelectedRetailer = selectedRetailer => ({
  type: SET_SELECTED_RETAILER,
  payload: { selectedRetailer }
});

export const fetchRetailersData = (resolve, location) => (dispatch) => {
  dataFetcher(dispatch, {
    url: `${process.env.BASE_URL}/api/v1/${location}/retailers`,
    method: 'GET',
    onSuccess: setRetailersData,
    onFailure: () => setContentError(true),
  }, resolve);
}

export const setRetailersData = ({data}) => ({
  type: SET_RETAILERS_DATA,
  payload: { data }
})

export const setInitialRetailers = retailers => ({
  type: SET_INITIAL_RETAILERS,
  payload: { retailers }
});
