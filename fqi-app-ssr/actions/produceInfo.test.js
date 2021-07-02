
import * as produceInfo from './produceInfo';
import dataFetcher from '../lib/dataFetcher'

jest.mock('../lib/dataFetcher', () => ({
  __esModule: true,
  default: jest.fn()
}));

describe('Produce info Actions ', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const dispatch = jest.fn(); 
  const state = {
    labels: [ 
      { label: 'Water', id: 'water' },
      { label: 'Glucose', id: 'glucose' },
      { label: 'Sucrose', id: 'sucrose' },
      { label: 'Fructose', id: 'fructose' },
      { label: 'Citric Acid', id: 'citric' },
      { label: 'Vitamin C', id: 'vitaminc' },
      { label: 'Anthocyanin Acid', id: 'anthocyanin' },
      { label: 'Anthocyanins', id: 'anthocyanins' },
      { label: 'Antioxidants', id: 'antioxidants' },
      { label: 'Citric Acid', id: 'citricacid' },
      { label: 'Malic Acid', id: 'malicacid' },
      { label: 'Oxalic Acid', id: 'oxalicacid' },
      { label: 'Tartaric', id: 'tartaric' },
      { label: 'Oil Total', id: 'oiltotal' },
      { label: 'Oleic', id: 'oleic' },
      { label: 'Linoleic', id: 'linoleic' },
      { label: 'Palmitic', id: 'palmitic' },
      { label: 'Palmitoleic', id: 'palmitoleic' },
      { label: 'Lycopene', id: 'lycopene' },
      { label: 'Carotenoids', id: 'carotenoids' },
      { label: 'Lutein', id: 'lutein' } 
    ],
    info: { 
      analytes: [ 
        { 
          score: 99.75,
          recentScan: 113,
          usda: 79,
          status: 'Green',
          id: 'sucrose',
          label: 'Sucrose' },
        { 
          score: 98,
          recentScan: 123,
          usda: 96,
          status: 'Green',
          id: 'fructose',
          label: 'Fructose' },
        { 
          score: 92.5,
          recentScan: 119,
          usda: 65,
          status: 'Green',
          id: 'glucose',
          label: 'Glucose' },
        { 
          score: 65.25,
          recentScan: 46,
          usda: 63,
          status: 'Red',
          id: 'vitaminc',
          label: 'Vitamin C' },
      ],
      produceCode: 'avocado',
      quality: 92,
      qualAvg: 0,
      value: 3,
      perceptionScore: 213,
      countriesOfOrigin:
        [ { countryName: 'Argentina', isOrganic: false },
          { countryName: 'Mexico', isOrganic: false },
          { countryName: 'Peru', isOrganic: true },
          { countryName: 'USA', isOrganic: true } ],
      scanDateTime: '2019-12-11T05:12:00',
      scanDate: '12/11/2019',
      scanTime: '05:12:00' 
    }
  }

  it(`should call generateProduceInfoAndFetch and then call dispatch`, async () => {
    const location = 'boston';
    const retailerCode= 'aldi';
    const produce = 'avocado';
    produceInfo.generateProduceInfoAndFetch(dispatch, state, location, retailerCode, produce)
    expect(dispatch).toHaveBeenCalledTimes(1)
  });

  it(`should call fetchProduceInfoData then call dataFetcher`, async () => {
    const resolve = (e) => e;
    const url = 'http://www.exmaple.com'
    produceInfo.fetchProduceInfoData(resolve, url)();
    expect(dataFetcher).toHaveBeenCalledTimes(1)
  });

});
