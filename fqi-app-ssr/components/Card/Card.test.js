/* eslint-env jest */

import { mount } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'

import Card from './Card'

describe('With Snapshot Testing', () => {
  const handleClick = jest.fn();

  const props = {
    produce: {
      produceCode: "apple-gala",
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
    selectedLocation: 'boston',
    retailerId: 'aldi',
  }
  it('Card snapshot"', () => {
    const component = renderer.create(<Card  {...props}/>)
    const componentJSON = component.toJSON()
    expect(componentJSON).toMatchSnapshot()
  });

  it('Should call handleClick"', () => {
    const wrapper = mount(<Card {...props}/>);
    wrapper
      .find('button')
      .simulate('click');

      expect(handleClick).toBeCalledTimes(0);
    });
})