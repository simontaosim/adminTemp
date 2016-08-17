import { Meteor } from 'meteor/meteor';
import {render} from 'react-dom';
import React from 'react';
import Routes from '../routes/index';

Meteor.startup(() => {
  render(<Routes />, document.getElementById('root'));
});
