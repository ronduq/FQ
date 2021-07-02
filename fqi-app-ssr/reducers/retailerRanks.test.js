import * as actions from '../actions/retailerRanks';
import retailerRanks from './retailerRanks';
import retailerRanksSingle from './retailerRanks';
import { initialRetailerRanksState } from './initialState';

describe('Sort Ranks', () => {
  it(`should sort ranks top to bottom when sortRanks is called`, () => {
    const criteria = 'quality';
    const direction = 'topToBottom'
    const updatedState = retailerRanks(undefined, actions.sortRanks(criteria,direction));
    expect(updatedState.selected).toEqual(criteria);
  });

  it(`should sort ranks bottom to top when sortRanks is called`, () => {
    const criteria = 'quality';
    const direction = 'bottomToTop'
    const updatedState = retailerRanks(undefined, actions.sortRanks(criteria,direction));
    expect(updatedState.selected).toEqual(criteria);
  });

  it(`should sort ranks bottom to top when sortRanks is called`, () => {
    const criteria = 'quality';
    const direction = 'bottomToTop'
    const type = 'single'
    const updatedState = retailerRanksSingle(undefined, actions.sortRanks(criteria,direction));
    expect(updatedState.selected).toEqual(criteria);
  });


  it(`should add labels when setRetailersTable is called`, () => {
    const content = [ {button_label: 'Store details'} ]
    const label = {button_label: 'Store details'}
    const updatedState = retailerRanks(undefined, actions.setRetailersTable(content));
    expect(updatedState.labels).toEqual(label);
  });

  it(`should call setRankedRetailer and set data`, () => {
    const rankData = { data: [{
      retailerCode:"wegmans",
      quality:90,
      value:5,
      perception:318,
    },{
      retailerCode:"aldi",
      quality:91,
      value:5,
      perception:200,
    }]};

    const updatedState = retailerRanks(undefined, actions.setRankedRetailer(rankData));
    expect(updatedState.ranks).toEqual(rankData.data);
  });

  it(`should return default state when type no found`, () => {
    const updatedState = retailerRanks(undefined, { type: 'NOT_FOUND', action: '' });
    expect(updatedState).toEqual(initialRetailerRanksState);
  });
  
});
