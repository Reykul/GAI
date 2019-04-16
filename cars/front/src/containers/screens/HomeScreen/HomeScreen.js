import React, { Component } from 'react';

export default class HomeScreen extends Component {
  componentDidMount() {
    const { fetchCars } = this.props;

    fetchCars();
  }

  render() {
    return <div>aqaqaa</div>;
  }
}
