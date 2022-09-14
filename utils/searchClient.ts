import algoliasearch from 'algoliasearch';

import { APP_ID, SEARCH_API_KEY } from '../constants';

export const searchClient = algoliasearch(APP_ID, SEARCH_API_KEY);
