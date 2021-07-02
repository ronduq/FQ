import update from 'react-addons-update';
import { bestPicksState } from './initialState';
import { 
  SET_BEST_PICKS,
  SORT_BEST_PICKS,
  SET_INITIAL_BEST_PICKS_CRITERIA
} from '../constants/'

const  bestPicksReducer = (state = bestPicksState, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_BEST_PICKS: {
      const { data } = payload;
      return update(state, {
        topPicks: {$set: data.topPicks},
        retailerTopPicks: {$set: data.retailerTopPicks},
      })
    }
    case SORT_BEST_PICKS: {
      const {criteria, direction} = payload;
      return update(state, {
        criteria: {$set: criteria},
      })
    }
    case SET_INITIAL_BEST_PICKS_CRITERIA: {
      const { criteria } = payload;
      return {
        ...state,
        criteria
      }
    }
    default:
      return state;
  }
};

export default  bestPicksReducer;
