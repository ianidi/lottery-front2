import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Home } from './pages/Home';
import { List } from './pages/List';
import { HistoryPage } from './pages/History';

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/list" component={List} />
    <Route exact path="/history" component={HistoryPage} />
    <Redirect to="/" />
  </Switch>
);
