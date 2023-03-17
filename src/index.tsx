import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import RGClock from './RGClock';
ReactDOM.render(
  <Router>
    <RGClock />
  </Router>,
  document.querySelector('#root')
);
