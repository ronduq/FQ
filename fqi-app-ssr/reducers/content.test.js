import * as actions from '../actions/content';
import contentReducer from './content';
import { initialContentState } from './initialState';

describe('Content Reducer', () => {
  it(`should set content fetched to true`, () => {
    const updatedState = contentReducer(undefined, actions.setContentFetched());
    expect(updatedState.contentFetched).toEqual(true);
  });

  it(`should call setFooterContent and set footer content`, () => {
    const footerContent = [{title: 'test1', link: 'www.test1.com'}, {title: 'test2', link: 'www.test2.com'}]
    const updatedState = contentReducer(undefined, actions.setFooterContent(footerContent));
    expect(updatedState.footer).toEqual(footerContent);
  });

  it(`should call setViewport and set the viewport type`, () => {
    const updatedState = contentReducer(undefined, actions.setViewport(1024));
    expect(updatedState.viewport).toBe('large');
  });

  it(`should call setRetailerTrendsContent and set the retailer trends content`, () => {
    const retailerTrends = [{show_view_by_dropdown: true}]
    const updatedState = contentReducer(undefined, actions.setRetailerTrendsContent(retailerTrends));
    expect(updatedState.retailerTrends).toEqual(retailerTrends[0]);
  });

  it(`should return default state when type no found`, () => {
    const updatedState = contentReducer(undefined, { type: 'NOT_FOUND', action: '' });
    expect(updatedState).toEqual(initialContentState);
  });
});
