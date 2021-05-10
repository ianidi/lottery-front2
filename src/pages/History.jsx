import query from 'query-string';
import React from 'react';

import { History } from '../components/history/History';

export const HistoryPage = ({ location }) => {
  const parsed = query.parse(location.search);
  const page = parseInt(parsed.page, 10);
  const pageNumber = isNaN(page) || page <= 0 ? 1 : page;
  return <History page={pageNumber} />;
};
