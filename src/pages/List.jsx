import query from 'query-string';
import React from 'react';

import { LotteryList } from '../components/lottery/LotteryList';

export const List = ({ location }) => {
  const parsed = query.parse(location.search);
  const page = parseInt(parsed.page, 10);
  const pageNumber = isNaN(page) || page <= 0 ? 1 : page;
  return <LotteryList page={pageNumber} />;
};
