/* eslint-env jest */

import { mount } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'

import AnalyteReading from './AnalyteReading'

describe('With Snapshot Testing', () => {
  const handleClick = jest.fn();

  const props = {
    produceInfo: {
      info: {
        analytes: [ 
        {score: 99.75, recentScan: 113, usda: 73, status: "Green", id: "sucrose"},
        {score: 98, recentScan: 123, usda: 70, status: "Green", id: "fructose"},
        {score: 92.5, recentScan: 119, usda: 77, status: "Green", id: "glucose"},
        {score: 65.25, recentScan: 46, usda: 69, status: "Red", id: "vitaminc"},
        {score: 94, recentScan: 117, usda: 70, status: "Green", id: "water"},
        ]
      },
      labels: [
        {label: "Water", id: "water"},
        {label: "Glucose", id: "glucose"},
        {label: "Sucrose", id: "sucrose"},
        {label: "Fructose", id: "fructose"},
        {label: "Citric Acid", id: "citric"},
      ]
    }, 
  }
  it('AnalyteReading snapshot"', () => {
    const component = renderer.create(<AnalyteReading  {...props}/>)
    const componentJSON = component.toJSON()
    expect(componentJSON).toMatchSnapshot()
  });
})