import update from 'react-addons-update';
import { initialRetailersState } from './initialState';

import { 
  UPDATE_RETAILER, 
  SELECT_ALL_RETAILERS_CHECKBOX, 
  SELECT_ALL_RETAILERS,
  SET_SELECTED_RETAILER,
  SET_INITIAL_RETAILERS,
  SET_RETAILERS_CONTENT,
  SET_RETAILERS_DATA
} from '../constants';

const retailersReducer = (state = initialRetailersState, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_INITIAL_RETAILERS: {
      const { retailers } = payload;
      return {
        ...state,
        initialRetailers: retailers.split(',')
      }
    }
    case SET_RETAILERS_DATA: {
      const { data } = payload;
      const items = data;
      const { initialRetailers } = state;

      items.forEach(item => {
        let selected = true;
        if (initialRetailers) selected = initialRetailers.includes(item.id);
        item.selected = selected;
      });

      const allItemsSelected = data.filter(item => item.selected).length === data.length;

      return {
        ...state,
        items,
        initialRetailers: null,
        allItemsSelected,
      }
    }
    case UPDATE_RETAILER: {
      const { retailerId, check } = payload;
      return update(state, {
        items: {
          [retailerId]: {
            selected: {$set: check}
          }
        }
      })
    }
    case SELECT_ALL_RETAILERS_CHECKBOX: {
      let allRetailersAreSelected = true;
      Object.keys(state.items).map((retailer) => {
        if (!state.items[retailer].selected) {
          allRetailersAreSelected = false;
        }
      })
      return update(state, {
        allItemsSelected: {$set: allRetailersAreSelected}
      })
    }
    case SELECT_ALL_RETAILERS: {
      const { status, currentSelection } = payload;
      let allItemsSelected = !state.allItemsSelected;
      if (status) allItemsSelected = status;

      const updatedItems = state.items.map((retailer) => {
        retailer.selected = allItemsSelected;
        if (currentSelection == retailer.retailerCode) retailer.selected = true;
        return retailer;
      })

      return {
        ...state,
        items: updatedItems,
        allItemsSelected
      }
    }
    case SET_RETAILERS_CONTENT: {
      const { retailers } = payload;
      let itemsLabels = {};
      let itemsLogos ={};
      retailers.map((retailer) => {
        itemsLabels[retailer.id] = retailer.label;
        itemsLogos[retailer.id] = retailer.logo;
      });
      return update(state, {
        itemsLabels: {$set: itemsLabels},
        itemsLogos: {$set: itemsLogos},
      })
    }
    case SET_SELECTED_RETAILER: {
      const { selectedRetailer } = payload;
      return {
        ...state,
        selectedRetailer
      }
    }
    default:
      return state;
  }
};

export default retailersReducer;
