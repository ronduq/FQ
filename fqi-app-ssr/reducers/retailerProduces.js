import { producesOfRetailer } from './initialState';
import { 
  SET_RETAILER_PRODUCES,
  UPDATE_RETAILER_PRODUCES,
  SET_RETAILER_PRODUCES_SORT,
  SET_PRODUCE_INFO_TABLE,
  SET_RETAILER_PRODUCES_COMPAREBY
} from '../constants/'

const retailerProducesReducer = (state = producesOfRetailer, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_RETAILER_PRODUCES: {
      const { produces } = payload;
      return {
        ...state,
        items: produces.data
      }
    }
    case UPDATE_RETAILER_PRODUCES: {
      const { produceId, check, parentCode, isParent } = payload;
      return update(state, {
        items: {
          [produceId]: {
            selected: {$set: check}
          }
        }
      })
    }
    case SET_RETAILER_PRODUCES_SORT: {
      const { sortDirection } = payload;
      return {
        ...state,
        sortDirection
      }
    }
    case SET_PRODUCE_INFO_TABLE: {
      const { produce, title } = payload;
      return {
        ...state,
        infoTable: {
          produce,
          title
        }
      };
    }
    case SET_RETAILER_PRODUCES_COMPAREBY: {
      const { compareBy, direction } = payload;
      return {
        ...state,
        compareBy,
        ...(direction && {sortDirection: direction})
      }
    }
    default:
      return state;
  }
};

export default retailerProducesReducer;
