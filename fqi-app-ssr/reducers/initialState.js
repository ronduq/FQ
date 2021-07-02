export const initialRetailersState =  {
  name: 'Retailers',
  items: [],
  allItemsSelected: true,
  itemsLabels: {},
  itemsLogos: {},
  selectedRetailer: '',
}

export const initialProducesState =  {
  name: 'Produces',
  allItemsSelected: true,
  initialSelection: true,
  items: {},
  itemsImages: {},
  itemsLabels: {},
}

export const initialContentState = {
  contentFetched: false,
  footer: [],
  viewport: 'mobile',
  retailerTrends: {
    show_view_by_dropdown: false,
  },
  homepage: {},
}

export const initialLocationState = {
  locations: [],
  selectedLocation: {}
}

export const initialRetailerRanksState = {
  ranks: [],
  labels: {
    retailer: 'Retailer',
    quality: 'Quality Score',
    value: 'Value Rank',
    perception: 'Perception Rank',
    single_produce_average_title: 'Selected Produce Averagedddd'
  },
  ranksSingle: [],
  selected: 'quality',
  direction: 'topToBottom',
}

export const producesOfRetailer = {
  items: [],
  sortDirection: 'DSC',
  compareBy: 'quality',
  infoTable: {}
}

export const produceInfo = {
  info: {},
  labels: {},
}

export const initialRetailerTrendsState = {
  trends: [],
  viewBy: 'weekly',
  compareBy: 'quality',
  isLoading: false,
}

export const initialProduceTrendsState = {
  trends: [],
  viewBy: 'weekly',
  compareBy: 'quality',
  isLoading: false,
}

export const bestPicksState = {
  criteria: 'quality',
  topPicks: [],
  retailerTopPicks: []
}

export const breadcrumbs = {
  
}
