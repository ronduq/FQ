import * as actions from '../actions/retailers';
import retailers from './retailers';
import { initialRetailersState } from './initialState';

describe('Sort Ranks', () => {
  it(`should call setRetailersData and set retailers data`, () => {
    const items = {data: [{
        retailerCode:"aldi",
        retailerName:"Aldi",
        id:"aldi",
        selected:true
      }]};
    const updatedState = retailers(undefined, actions.setRetailersData(items));
    expect(updatedState.items).toEqual(items.data);
  });

  it(`should update retailer select status`, () => {
    const initState = {
      ...initialRetailersState,
      items: [{
        retailerCode:"aldi",
        retailerName:"Aldi",
        id:"aldi",
        selected:true
      }]
    }
    const updatedState = retailers(initState, actions.updateRetailer(0,false));
    expect(updatedState.items[0].selected).toEqual(false);
  });

  it(`should select all checkboxes`, () => {
    const allRetailersAreSelected = true;
    const updatedState = retailers(undefined, actions.selectAllRetailersCheckbox());
    expect(updatedState.allItemsSelected).toEqual(true);
  });

  it(`should select all retailers`, () => {
    const updatedState = retailers(undefined, actions.selectAllRetailers(false));
    expect(updatedState.allItemsSelected).toEqual(false);
  });

  it(`should select all retailers - when passing checked true into the action`, () => {
    const initState = {
      items: [{selected: true, retailerCode: 'aldi'}, {selected: true, retailerCode: 'costco'}],
      allItemsSelected: false
    }
    const updatedState = retailers(undefined, actions.selectAllRetailers(true));
    expect(updatedState.allItemsSelected).toEqual(true);
  });

  it(`should unselect all retailers with the expception of the current selection`, () => {
    const initState = {
      items: [{selected: true, retailerCode: 'aldi'}, {selected: true, retailerCode: 'costco'}],
      allItemsSelected: true
    }
    const currentSelection = 'aldi';
    const updatedState = retailers(initState, actions.selectAllRetailers(false, currentSelection));
    expect(updatedState.items[0].selected).toEqual(true);
  });

  it(`should set content`, () => {
    const retailersList =  [
      { logo: 'https://cdn.buttercms.com/I5AVml6IT6opW09cfej1',
        label: 'Walmart',
        id: 'walmart' },
      { logo: 'https://cdn.buttercms.com/jKVEz1aES3WVOzG1F4MZ',
        label: 'Costco',
        id: 'costco' }
    ];
    const itemsLabels={costco: "Costco", walmart: "Walmart"}
    const updatedState = retailers(undefined, actions.setRetailersContent(retailersList));
    expect(updatedState.itemsLabels).toEqual(itemsLabels);
  });
  
  it(`should call setSelectedRetailer and set the selected retailer`, () => {
    const retailer = 'aldi';
    const updatedState = retailers(undefined, actions.setSelectedRetailer(retailer));
    expect(updatedState.selectedRetailer).toEqual(retailer);
  });

  it(`should return default state when type no found`, () => {
    const updatedState = retailers(undefined, { type: 'NOT_FOUND', action: '' });
    expect(updatedState).toEqual(initialRetailersState);
  });

});
