import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '~/pages/SignIn';
import Student from '~/pages/Student';
import Plan from '~/pages/Plan';
import Registration from '~/pages/Registration';
import HelpOrder from '~/pages/HelpOrder';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/student" component={Student} />
      <Route path="/plan" component={Plan} />
      <Route path="/registration" component={Registration} />
      <Route path="/help" component={HelpOrder} />
    </Switch>
  );
}
