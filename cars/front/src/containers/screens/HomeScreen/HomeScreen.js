import React, { Component } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
require('./styles.css');

export default class HomeScreen extends Component {
  componentDidMount() {
    const { fetchCars } = this.props;

    fetchCars();
  }

  render() {
    const { cars } = this.props;

    return (
      <div className="HomeScreen">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Brand</th>
              <th>model</th>
              <th>Owner #</th>
              <th>Condition</th>
              <th>Carjacking</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr key={JSON.stringify(car)}>
                <td>{car.id}</td>
                <td>{car.brand}</td>
                <td>{car.model}</td>
                <td>{car.ownerId}</td>
                <td>{car.condition}</td>
                <td>{car.isInCarjacking || 'false'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="buttons">
          <Button onClick={() => {}} variant="outline-dark">
            Register car
          </Button>
        </div>
      </div>
    );
  }
}
