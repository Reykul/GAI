import React, { Component } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
require('./styles.css');

export default class HomeScreen extends Component {
  state = {
    isModalVisible: false,
  };
  componentDidMount() {
    const { fetchCars } = this.props;

    fetchCars();
  }

  handleButtonPress = () => {
    this.setState({ isModalVisible: true });
  };

  handleModalClose = () => {
    this.setState({ isModalVisible: false });
  };

  handleSubmit(event) {
    const { registerCar } = this.props;

    event.preventDefault();
    const form = event.currentTarget;
    const brand = form.formAutoBrand.value;
    const model = form.formAutoModel.value;
    const owner = form.formAutoOwner.value;
    const condition = form.formAutoCondition.value;
    const carjacking = form.formAutoCarjacking.checked;

    if (brand && model && owner && condition && carjacking) {
      registerCar(
        {
          brand,
          model,
          condition,
          ownerId: parseInt(owner, 10),
          isInCarjacking: carjacking,
        },
        () => this.handleModalClose(),
      );
    }
  }

  render() {
    const { cars } = this.props;
    const { isModalVisible } = this.state;

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
                <td>
                  {car.isInCarjacking ? `${car.isInCarjacking}` : 'false'}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="buttons">
          <Button onClick={this.handleButtonPress} variant="outline-dark">
            Register car
          </Button>
        </div>
        <Modal
          size="lg"
          show={isModalVisible}
          onHide={this.handleModalClose}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Register auto
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={e => this.handleSubmit(e)}>
              <Form.Group controlId="formAutoBrand">
                <Form.Label>Brand</Form.Label>
                <Form.Control placeholder="Brand" />
              </Form.Group>

              <Form.Group controlId="formAutoModel">
                <Form.Label>Model</Form.Label>
                <Form.Control placeholder="Model" />
              </Form.Group>

              <Form.Group controlId="formAutoOwner">
                <Form.Label>Owner #</Form.Label>
                <Form.Control placeholder="Owner #" />
              </Form.Group>

              <Form.Group controlId="formAutoCondition">
                <Form.Label>Condition</Form.Label>
                <Form.Control as="select">
                  <option>new</option>
                  <option>good</option>
                  <option>bad</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formAutoCarjacking">
                <Form.Check type="checkbox" label="Carjacking" />
              </Form.Group>
              <Button type="submit">Register auto</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}