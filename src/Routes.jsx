import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Home } from './pages/Home';
// import { List } from './pages/List';
// import { History } from './pages/History';

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    {/* <Route exact path="/list" component={List} /> */}
    {/* <Route exact path="/history" component={History} /> */}
    <Redirect to="/" />
  </Switch>
);
