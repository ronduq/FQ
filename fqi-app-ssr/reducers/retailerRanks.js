import update from 'react-addons-update';
import { initialRetailerRanksState } from './initialState';

import { 
  SET_SORT_RANKS,
  SET_RETAILERS_TABLE,
  SET_RANKED_RETAILER,
  SET_RANKED_RETAILER_SINGLE,
  SET_INITIAL_RANKED_COMPARE_BY
} from '../constants';

const retailerRanksReducer = (state = initialRetailerRanksState, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_INITIAL_RANKED_COMPARE_BY: {
      const { compareBy } = payload;
      return {
        ...state,
        selected: compareBy
      };
    }
    case SET_SORT_RANKS: {
      const { criteria, direction } = payload;
      return {
        ...state,
        selected: criteria,
        direction: direction,
      }
    }
    case SET_RETAILERS_TABLE: {
      const { content } = payload;
      return update(state, {
        labels: {$set: content[0]},
      })
    }
    case SET_RANKED_RETAILER : {
      const { data } = payload;
      return {
        ...state,
        ranks: data
      };
    }
    case SET_RANKED_RETAILER_SINGLE : {
      const { data } = payload;
      return {
        ...state,
        ranksSingle: data
      };
    }
    default:
      return state;
  }
};

export default retailerRanksReducer;
