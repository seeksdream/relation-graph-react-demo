import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import SimpleGraph from './SimpleGraph';
ReactDOM.render(
  <Router>
    <SimpleGraph />
  </Router>,
  document.querySelector('#root')
);
