import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

const backdrop = props =>
  ReactDOM.createPortal(
    <div
      className={['backdrop', props.open ? 'open' : ''].join(' ')}
      onClick={props.onClick}
    />,
    // 'backdrop-root' is the id which is defined in the index.html file and the application renders on that element to create the backdrop feature while building the application. 
    document.getElementById('backdrop-root')
  );

export default backdrop;
