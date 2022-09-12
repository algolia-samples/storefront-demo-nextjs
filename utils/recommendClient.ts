import recommend from '@algolia/recommend';

const appId = 'XX85YRZZMV';
const apiKey = '098f71f9e2267178bdfc08cc986d2999';

export const recommendClient = recommend(appId, apiKey);
