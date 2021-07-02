import { 
  SET_BEST_PICKS,
  SORT_BEST_PICKS,
  SET_INITIAL_BEST_PICKS_CRITERIA
} from '../constants/'

import { setContentError } from './content';
import dataFetcher from '../lib/dataFetcher';

import {
  getSelectedLocation,
  getSelectedProduce,
  getSelectedRetailers,
  getBestPicksSortBy
} from '../selectors/index';

export const generateBestPicksAndFetch = (dispatch, state, location, criteria) => {
  const url = `${process.env.BASE_URL}/api/v1/${location}/produce/picks`;
  const produceCodes = getSelectedProduce(state);
  const retailerCodes = getSelectedRetailers(state);
  const sortBy = criteria || getBestPicksSortBy(state);;

  const produceQuery = { 
    produceCodes, 
    retailerCodes, 
    sortBy,
  };    
 
  return new Promise(resolve => {
      dispatch(fetchBestPicksData(resolve, url, produceQuery));
  });
}

export const fetchBestPicksData = (resolve, url, data) => (dispatch) => {
  dataFetcher(dispatch, {
    url: url,
    method: 'GET',
    onSuccess: setBestPicks,
    data,
    onFailure: () => setContentError(true),
  }, resolve);
}

export const setBestPicks = ({data}) => ({
  type: SET_BEST_PICKS,
  payload: {data}
});

export const sortBestPicksThunk = (criteria, direction) => (dispatch, getState) => {
  dispatch(sortBestPicks(criteria, direction));
  const selectedLocation = getSelectedLocation(getState());
  generateBestPicksAndFetch(dispatch, getState(), selectedLocation.id, criteria)
}

export const sortBestPicks = (criteria, direction) => ({
  type: SORT_BEST_PICKS,
  payload: {criteria, direction}
});

export const setInitalBestPicksCriteria = (criteria) => ({
  type: SET_INITIAL_BEST_PICKS_CRITERIA,
  payload: {criteria}
});
