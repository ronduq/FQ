import * as producesActions from '../actions/producesActions';
import * as retailerProduces from '../actions/retailerProduces';
import { UPDATE_PRODUCE } from '../constants'

const producesMiddleware = store => next => action => {
  next(action);
  if (action.type === UPDATE_PRODUCE) {
    let state = store.getState();
    const { 
      parentCode, 
      check, 
      isParent, 
      produceId 
    } = action.payload;
    const items = state.produces.items;
    const producesData = state.produces;

    // Check if unselected checkbox is a highlighted produce in the table
    if (
      !items[produceId].selected &&
      items[produceId].produceCode === state.retailerProduces.infoTable.produce 
    ) {
      const firstSelected = items.find(item => item.selected == true && item.isParent == false);
      if (firstSelected) {
        store.dispatch(retailerProduces.setProduceInfoTable(firstSelected.produceCode, producesData.itemsLabels[firstSelected.produceCode]));
        store.dispatch(producesActions.updateProduceThunk(0, true, 'parentCode', false, firstSelected.produceCode));
      } 
    }
      

    // Check or uncheck all cultivars when Parent is checked
    if (isParent) {
      const parentName = items[produceId].id;
      Object.keys(items).map((item) => {
        if (items[item].parentCode === parentName) {
          store.dispatch(producesActions.updateProduce(item, check));
        }
      })
    }

    // Uncheck Parent when cultivar is unchecked
    if (parentCode !== (undefined && null) && !check ) {
      Object.keys(items).map((item) => {
        if (items[item].id === parentCode) {
          store.dispatch(producesActions.updateProduce(item, check));
        }
      })
    } 

    // Check Parent when all cultivars are checked
    else if (parentCode !== (undefined && null) && check ) {
      let checkAll = true;
      Object.keys(items).map((item) => {
        if (items[item].parentCode === parentCode && items[item] !== produceId && !items[item].selected) {
          checkAll = false
        }
      });
      if (checkAll){
        Object.keys(items).map((item) => {
          if (items[item].id === parentCode) {
            store.dispatch(producesActions.updateProduce(item, checkAll));
          }
        });
      }
    }
  }
  
}

export default producesMiddleware;