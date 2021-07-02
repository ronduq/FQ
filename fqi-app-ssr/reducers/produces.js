import update from 'react-addons-update';
import { initialProducesState } from './initialState';
import { 
  UPDATE_PRODUCE, 
  SELECT_ALL_PRODUCES_CHECKBOX, 
  SELECT_ALL_PRODUCES,
  SET_PRODUCES_CONTENT,
  SET_PRODUCE_DATA,
  SET_SELECTED_PRODUCE,
  SET_INITIAL_PRODUCES,
} from '../constants';

const producesReducer = (state = initialProducesState, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_INITIAL_PRODUCES: {
      const { produces } = payload;
      return {
        ...state,
        initialProduces: produces.split(',')
      }
    }
    case SET_PRODUCE_DATA: {
      const { data } = payload;
      const { initialProduces } = state;
      let count = 0;
      
      data.forEach(item => {
        let selected = true;
        if (initialProduces) selected = initialProduces.includes(item.id);
        item.selected = selected;
        if (!item.isParent) count++;
      });

      // Check the parent selection
      data.forEach(item => {
      if (item.isParent) {
          const parentName = item.id;
          item.selected = 
            data.filter(child => child.parentCode === parentName)
            .every(child => child.selected)
        }
      })

      const allItemsSelected = data.filter(item => item.selected).length === data.length;

      return {
        ...state,
        items: data,
        initialSelection: true,
        count,
        initialProduces: null,
        allItemsSelected,
       }
    }
    case UPDATE_PRODUCE: {
      const { produceId, check, parentCode, isParent } = payload;
      return update(state, {
        items: {
          [produceId]: {
            selected: {$set: check}
          }
        },
        initialSelection: {$set: false}
      })
    }
    case SELECT_ALL_PRODUCES_CHECKBOX: {
      let allProducesAreSelected = true;
      Object.keys(state.items).map((produce) => {
        if (!state.items[produce].selected) {
          allProducesAreSelected = false;
        }
      })
      return update(state, {
        allItemsSelected: {$set: allProducesAreSelected}
      })
    }
    case SELECT_ALL_PRODUCES: {
      const { status } = payload;
      let allProducesState = !state.allItemsSelected;
      if (typeof status !== 'undefined' && status !== null) allProducesState = status;

      const updatedItems = state.items.map(produce => ({
        ...produce,
        selected: allProducesState
      }));

      return update(state, {
        items: {$set: updatedItems},
        allItemsSelected: {$set: allProducesState}
      })
    }
    case SET_PRODUCES_CONTENT: {
      const { produce } = payload;
      let itemsLabels = {};
      let itemsImages = {};
      let itemsVideos = {};
      let itemsVideosText = {};
      let itemsInfo = []
      produce.map((prod,index) => {
        itemsLabels[prod.id] = prod.label;
        itemsImages[prod.id] = prod.image;
        itemsVideos[prod.id] = prod.youtube_id;
        itemsVideosText[prod.id] = prod.video_text;
        itemsInfo[index] = prod;
      });
      return update(state, {
        itemsLabels: {$set: itemsLabels},
        itemsImages: {$set: itemsImages},
        itemsVideos: {$set: itemsVideos},
        itemsVideosText: {$set: itemsVideosText},
        itemsInfo: {$set: itemsInfo}
      })
    }
    case SET_SELECTED_PRODUCE: {
      const { selectedProduce } = payload;
      return {
        ...state,
        selectedProduce
      }
    }
    default:
      return state;
  }
};

export default producesReducer;
