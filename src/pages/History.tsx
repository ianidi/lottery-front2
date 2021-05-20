import query from "query-string";
import React from "react";
import { History } from "../components/history/History";

interface Props {
  location: any;
}

export const HistoryPage: React.FC<Props> = ({ location }) => {
  const parsed = query.parse(location.search);
  //@ts-ignore
  const page = parseInt(parsed.page, 10);
  const pageNumber = isNaN(page) || page <= 0 ? 1 : page;
  return <History page={pageNumber} />;
};
