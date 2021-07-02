import * as actions from '../actions/producesActions';
import produces from './produces';
import { initialProducesState } from './initialState';

describe('Sort Ranks', () => {

  const retailerItems = [{
    produceCode:"avocado",
    produceName:"Avocado",
    isParent:false,
    isChild:false,
    id:"avocado",
    selected:true,
    }];

  it(`should call setProduceData and set produce data`, () => {
    const items = {data: [...retailerItems]};
    const updatedState = produces(undefined, actions.setProduceData(items));
    expect(updatedState.items).toEqual(items.data);
  });

  it(`should update retailer select status`, () => {
    const initState = {
      ...initialProducesState,
      items: [...retailerItems]
    }
    const updatedState = produces(initState, actions.updateProduce(0,false));
    expect(updatedState.items[0].selected).toEqual(false);
  });

  it(`should select all checkboxes`, () => {
    const allProducesAreSelected = true;
    const updatedState = produces(undefined, actions.selectAllProducesCheckbox());
    expect(updatedState.allItemsSelected).toEqual(true);
  });

  it(`should select all produces`, () => {
    const initState = {
      ...initialProducesState,
      items: [...retailerItems]
    }
    const updatedState = produces(initState, actions.selectAllProduces(false));
    expect(updatedState.allItemsSelected).toEqual(false);
  });

  it(`should set content`, () => {
    const producesList =  [
      { 
        label: 'apples',
        id: 'apples' },
      { 
        label: 'pears',
        id: 'pears' }
    ];
    const itemsLabels={pears: "pears", apples: "apples"}
    const updatedState = produces(undefined, actions.setProducesContent(producesList));
    expect(updatedState.itemsLabels).toEqual(itemsLabels);
  });

  it(`should return default state when type no found`, () => {
    const updatedState = produces(undefined, { type: 'NOT_FOUND', action: '' });
    expect(updatedState).toEqual(initialProducesState);
  });
  
});
