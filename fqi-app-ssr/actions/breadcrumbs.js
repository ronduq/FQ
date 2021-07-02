import { 
  SET_BREADCRUMBS,
} from '../constants/'

import { setContentError } from './content';
import dataFetcher from '../lib/dataFetcher';

import {
  getSelectedProduce
} from '../selectors/index';


export const setBreadcrumbs = (page, parentPage, grandparentPage) => ({
  type: SET_BREADCRUMBS,
  payload: { page, parentPage, grandparentPage }
});
