import { 
  SET_INITIAL_PRODUCES,
  UPDATE_PRODUCE, 
  SELECT_ALL_PRODUCES_CHECKBOX, 
  SELECT_ALL_PRODUCES,
  SET_PRODUCES_CONTENT,
  SET_PRODUCE_DATA,
  SET_SELECTED_PRODUCE,
} from '../constants'

import { getSelectedLocation, getSelectedRetailer, getProducesState, getRetailerProduces } from '../selectors';
import dataFetcher from '../lib/dataFetcher';
import { setContentError } from './content';
import { setProduceInfoTable } from './retailerProduces';
import { generateRetailersRankQueryAndFetch } from './retailerRanks';
import { generateRetailersProduceQueryAndFetch } from './retailerProduces';
import { generateBestPicksAndFetch } from './bestPicks';

export const updateProduceThunk = (produceId, check, parentCode, isParent, produce, retailer) => (dispatch, getState) => {
  const producesData = getProducesState(getState());
  const item = producesData.items[produceId].id;
  const itemLabel = producesData.itemsLabels[item];
  const selectedLocation = getSelectedLocation(getState());

  if (!produce) {
    dispatch(updateProduce(produceId, check, parentCode, isParent));
    dispatch(selectAllProducesCheckbox());
    if (retailer) {
      if (getRetailerProduces(getState()).items.length === 0) {
        const prodIndex = Object.keys(producesData.items).filter(prod => prod == produceId);
        if (!producesData.items[prodIndex].isParent) {
          dispatch(setProduceInfoTable(item, itemLabel));
          generateRetailersRankQueryAndFetch(dispatch, getState(), selectedLocation.id, item)
        } else {
          const prodInd = Object.keys(producesData.items).find(prod => prod > produceId && producesData.items[prod].isChild);
          const selectedProd = producesData.items[prodInd];
          const selectedProdLabel = producesData.itemsLabels[prodInd];
          dispatch(setProduceInfoTable(selectedProd.id, selectedProdLabel));
          generateRetailersRankQueryAndFetch(dispatch, getState(), selectedLocation.id, selectedProd.id)
        }
      }
     
    }
  }
  
  
  if (produce) {
    generateRetailersRankQueryAndFetch(dispatch, getState(), selectedLocation.id, produce)
  } else if (retailer) {
    generateRetailersProduceQueryAndFetch(dispatch, getState(), selectedLocation.id, retailer);
    generateRetailersRankQueryAndFetch(dispatch, getState(), selectedLocation.id, produce)
  } else {
    generateRetailersRankQueryAndFetch(dispatch, getState(), selectedLocation.id);
  }
}

export const updateBestPicksProduceThunk = (produceId, check, parentCode, isParent, criteria) => (dispatch, getState) => {
    dispatch(updateProduce(produceId, check, parentCode, isParent));
    dispatch(selectAllProducesCheckbox());
    const selectedLocation = getSelectedLocation(getState());
    generateBestPicksAndFetch(dispatch, getState(), selectedLocation.id, criteria)
}

export const updateProduceTrendsThunk = (produceId, check, parentCode, isParent) => (dispatch) => {
  dispatch(updateProduce(produceId, check, parentCode, isParent));
  dispatch(selectAllProducesCheckbox());
}

export const updateProduce = (produceId, check, parentCode, isParent, produce) => ({
  type: UPDATE_PRODUCE,
  payload: { produceId, check, parentCode, isParent, produce }
})

export const selectAllProducesCheckbox = () => ({
  type: SELECT_ALL_PRODUCES_CHECKBOX,
})

export const selectAllProducesThunk = (status, changeLocation, retailer) => (dispatch, getState) => {
  dispatch(selectAllProduces(status));

  const selectedRetailer = getSelectedRetailer(getState());
  

  if (!changeLocation) {
    const selectedLocation = getSelectedLocation(getState());
    if (retailer) {
      generateRetailersProduceQueryAndFetch(dispatch, getState(), selectedLocation.id, selectedRetailer);
    }
    generateRetailersRankQueryAndFetch(dispatch, getState(), selectedLocation.id, false)
  }
}

export const selectAllBestPicksProducesThunk = (status, changeLocation, criteria) => (dispatch, getState) => {
  dispatch(selectAllProduces(status));

  if (!changeLocation) {
    const selectedLocation = getSelectedLocation(getState());
    generateBestPicksAndFetch(dispatch, getState(), selectedLocation.id, criteria)
  }
}

export const selectAllProduces = (status) => ({
  type: SELECT_ALL_PRODUCES,
  payload: { status }
})

export const setProducesContent = (produce) => ({
  type: SET_PRODUCES_CONTENT,
  payload: { produce }
});

export const fetchProduceData = (resolve, location) => (dispatch) => {
  dataFetcher(dispatch, {
    url: `${process.env.BASE_URL}/api/v1/${location}/produce`,
    method: 'GET',
    onSuccess: setProduceData,
    onFailure: () => setContentError(true),
  }, resolve);
}

export const setProduceData = ({data}) => ({
  type: SET_PRODUCE_DATA,
  payload: { data }
})

export const setSelectedProduce = selectedProduce => ({
  type: SET_SELECTED_PRODUCE,
  payload: { selectedProduce }
});

export const setInitialProduces = (produces) => ({
  type: SET_INITIAL_PRODUCES,
  payload: { produces }
})
