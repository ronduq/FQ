import * as actions from '../actions/locations';
import locationsReducer from './locations';
import { initialLocationState } from './initialState';

describe('Locations Reducer', () => {
  it(`should set locations when setLocations is called`, () => {
    const locations = [{id: 'boston', label: 'Boston'}, {id: 'los-angeles', label: 'Los Angeles'}]
    const updatedState = locationsReducer(undefined, actions.setLocations(locations));
    expect(updatedState.locations).toEqual(locations);
  });
  
  it(`should set selected location when setSelectedLocation is called`, () => {
    const locationId = 'london'
    const location = {id: 'london', label: 'london test'};
    const initState = { locations: [location]}
    const updatedState = locationsReducer(initState, actions.setSelectedLocation(locationId));
    expect(updatedState.selectedLocation).toBe(location);
  });

  it(`should return default state when type no found`, () => {
    const updatedState = locationsReducer(undefined, { type: 'NOT_FOUND', action: '' });
    expect(updatedState).toEqual(initialLocationState);
  });
});
