import React, { Component } from 'react';
import Spinner from 'react-spinner-material';

import './../styles/Loading.css';

export default class Loading extends Component {
  render() {
    return (
      <div className={'loading'}>
        <Spinner size={120} spinnerColor={"#333"} spinnerWidth={2} visible={true} />
      </div>
    );
  }
}