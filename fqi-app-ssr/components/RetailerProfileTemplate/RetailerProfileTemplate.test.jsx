/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux';

import layout from '../../hocs/Layout';
import { initialRetailerRanksState, initialRetailersState, producesOfRetailer, initialProducesState, initialContentState } from '../../reducers/initialState'
import RetailerProfileTemplate from './RetailerProfileTemplate';

jest.mock('../../hocs/Layout', () => ({
  __esModule: true,
  default: (e) => e,
}));

const fakeStore = {
  dispatch: jest.fn(),
  getState: () => ({
    content: initialContentState,
    produces: initialProducesState,
    retailers: initialRetailersState,
    retailerRanks: initialRetailerRanksState,
    retailerProduces: producesOfRetailer,
    content: {
      viewport: 'mobile'
    },
    locations:{
      selectedLocation: {
        id: 'boston',
        label: 'Boston, MA'
      }
    },
  }),
  subscribe: jest.fn()
};

describe('RetailerProfileTemplate', () => {

  const props = {
    content: {
      retailer_highlights_title: 'Retailer Highlights'
    },
    retailersLabels:{
      single_produce_average_title: 'Single produce',
      quality: 'quality',
      value: 'value',
      perception: 'perception',
    },
    query: {
      location: 'boston',
      retailer: 'aldi'
    },
    selectedLocation: { label: 'Boston', id: 'boston'},
    selectedRetailer: 'aldi',
    retailerProduces: producesOfRetailer,
    retailersData: initialRetailersState,
    producesData: {
      allItemsSelected: true,
      items: {
        '1': {
          id: "apple-braeburn",
          isChild: true,
          isParent: false,
          parentCode: "apple",
          produceCode: "apple-braeburn",
          produceName: "Apple Braeburn",
          selected: true,
        },
        '2': {
          id: "apple-fuji",
          isChild: true,
          isParent: false,
          parentCode: "apple",
          produceCode: "apple-fuji",
          produceName: "Apple Fuji",
          selected: true,
        }
      },
      itemsImages: {
        'apple-braeburn': "https://cdn.buttercms.com/ZIjnt41SVemFWkksYchT", 
        'apple-fuji': "https://cdn.buttercms.com/DP5q6Yb5Q8SQbYsWdDeJ"
      },
      itemsLabels: {
        'apple-braeburn': "Braeburn Apples", 
        'apple-fuji': "Fuji Apples", 
      },
      name: "Produces",
    },
    cardLabels: {
      countries_of_origin: "Countries of origin",
      last_scan: "Last scan",
      organic: "Organic",
      perception: "Perception",
      product_of: "Product of",
      profile: "Profile",
      quality: "Quality",
      trends: "Trends",
      value: "Value",
    },
    retailerRanksData: initialRetailerRanksState,
    retailerRanks: [],
    notFoundScreens: {
      retailer_profile: {
        title: 'test',
        text: 'text'
      }
    }
  };

  it('RetailerProfileTemplate snapshot"', () => {

    const component = renderer.create(
    <Provider store={fakeStore}>
      <RetailerProfileTemplate {...props} />
    </Provider>);
    const componentJSON = component.toJSON()
    expect(componentJSON).toMatchSnapshot()
  });

})