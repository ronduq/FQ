/* eslint-env jest */

import React from 'react'
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer'

import ProduceDetails from './ProduceDetails'

const fakeStore = {
  dispatch: jest.fn(),
  getState: () => ({
    locations:{
      selectedLocation: {
        id: 'boston',
        label: 'Boston, MA'
      }
    },
    produceInfo: {
      info: {
        produceCode: 'test',
        id: "apple-gala",
        countriesOfOrigin: {
          '0': {countryName: "Algeria", isOrganic: true},
          '1': {countryName: "France"}
        },
        perception: "2",
        quality: "98",
        scanDate: "00/01",
        value: "2"
      }
    },
    produce: {
      id: "apple-gala",
      countriesOfOrigin: {
        '0': {countryName: "Algeria", isOrganic: true},
        '1': {countryName: "France"}
      },
      perception: "2",
      quality: "98",
      scanDate: "00/01",
      value: "2"
    },
    logo: 'https://cdn.buttercms.com/Bi087WwSQGi55NK09dsA',
    name: 'Gala Apples',
    image: "https://cdn.buttercms.com/mlIKiElrQdeZ8m7syIMx",
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
    producesData: {
      itemsVideos: {
        test: 'test'
      },
      itemsVideosText: {
        test: 'test'
      },
      itemsLabels: {
        test: 'test'
      },
      itemsImages: {
        test: 'test'
      },
    },
    retailersData: {
      itemsLogos: {
        test: 'test'
      }
    },
    content: {
      productCardLabels: {
        test: 'test'
      }
    }
  }),
  subscribe: jest.fn()
};

describe('With Snapshot Testing', () => {

  const props = {
    productCardLabels: {
      test: 'test'
    },
    produceInfo: {
      info: {
        produceCode: 'test',
        id: "apple-gala",
        countriesOfOrigin: {
          '0': {countryName: "Algeria", isOrganic: true},
          '1': {countryName: "France"}
        },
        perception: "2",
        quality: "98",
        scanDate: "00/01",
        value: "2"
      }
    },
    produce: {
      id: "apple-gala",
      countriesOfOrigin: {
        '0': {countryName: "Algeria", isOrganic: true},
        '1': {countryName: "France"}
      },
      perception: "2",
      quality: "98",
      scanDate: "00/01",
      value: "2"
    },
    logo: 'https://cdn.buttercms.com/Bi087WwSQGi55NK09dsA',
    name: 'Gala Apples',
    image: "https://cdn.buttercms.com/mlIKiElrQdeZ8m7syIMx",
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
    producesData: {
      itemsVideos: {
        test: 'test'
      },
      itemsVideosText: {
        test: 'test'
      },
      itemsLabels: {
        test: 'test'
      },
      itemsImages: {
        test: 'test'
      },
    },
    retailersData: {
      itemsLogos: {
        test: 'test'
      }
    }

  }
  it('Card snapshot"', () => {
    const component = renderer.create(
      <Provider store={fakeStore}>
        <ProduceDetails {...props} />
      </Provider>);
      const componentJSON = component.toJSON()
      expect(componentJSON).toMatchSnapshot()
  });

})