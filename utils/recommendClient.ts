import recommend from '@algolia/recommend';

import { APP_ID, SEARCH_API_KEY } from './constants';

export const recommendClient = recommend(APP_ID, SEARCH_API_KEY);
