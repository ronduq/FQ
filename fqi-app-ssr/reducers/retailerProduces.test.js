import * as actions from '../actions/retailerProduces';
import retailerProduces from './retailerProduces';
import { producesOfRetailer } from './initialState';

describe('Sort Ranks', () => {

  it(`should call setRetailerProduces and set data`, () => {
    const produces = { items: [{
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

    const updatedState = retailerProduces(undefined, actions.setRetailerProduces(produces));
    expect(updatedState.items).toEqual(produces.data);
  });

  it(`should call updateSortDirection and set sort direction`, () => {
    const newDirection = 'ASC'
    const updatedState = retailerProduces(producesOfRetailer, actions.updateSortDirection(newDirection));
    expect(updatedState.sortDirection).toEqual(newDirection);
  });

  it(`should return default state when type no found`, () => {
    const updatedState = retailerProduces(undefined, { type: 'NOT_FOUND', action: '' });
    expect(updatedState).toEqual(producesOfRetailer);
  });
  
});
