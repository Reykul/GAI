import React, { Component } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
require('./styles.css');

export default class HomeScreen extends Component {
  state = {
    isModalVisible: false,
    isProxyModalVisible: false,
    isSaleContractModalVisible: false,
  };
  componentDidMount() {
    const { fetchCars } = this.props;

    fetchCars();
  }

  handleButtonPress = () => {
    this.setState({ isModalVisible: true });
  };

  handleProxyButtonPress = () => {
    this.setState({ isProxyModalVisible: true });
  };

  handleSaleContractButtonPress = () => {
    this.setState({ isSaleContractModalVisible: true });
  };

  handleModalClose = () => {
    this.setState({ isModalVisible: false });
  };

  handleProxyModalClose = () => {
    this.setState({ isProxyModalVisible: false });
  };

  handleSaleContractModalClose = () => {
    this.setState({ isSaleContractModalVisible: false });
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

  handleProxySubmit(event) {
    const { addProxy } = this.props;
    event.preventDefault();

    const form = event.currentTarget;
    const allowTo = form.formProxyAllowTo.value;
    const carId = form.formProxyAuto.value;

    if (allowTo && carId) {
      addProxy(
        { allowTo: parseInt(allowTo, 10), carId: parseInt(carId, 10) },
        () => this.handleProxyModalClose(),
      );
    }
  }

  handleSaleContractSubmit(event) {
    const { sale } = this.props;

    event.preventDefault();

    const form = event.currentTarget;
    const sellerId = form.formSaleContractSellerId.value;
    const buyerId = form.formSaleContractBuyerId.value;
    const carId = form.formSaleContractCarId.value;

    if (sellerId && buyerId && carId) {
      sale(
        {
          sellerId: parseInt(sellerId, 10),
          buyerId: parseInt(buyerId, 10),
          carId: parseInt(carId, 10),
        },
        () => this.handleSaleContractModalClose(),
      );
    }
  }

  render() {
    const { cars } = this.props;
    const {
      isModalVisible,
      isProxyModalVisible,
      isSaleContractModalVisible,
    } = this.state;

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
          <Button
            onClick={this.handleSaleContractButtonPress}
            variant="outline-primary"
          >
            Sale contract
          </Button>
          <Button onClick={this.handleProxyButtonPress} variant="outline-info">
            Add proxy
          </Button>
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

        <Modal
          size="lg"
          show={isProxyModalVisible}
          onHide={this.handleProxyModalClose}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Add proxy
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={e => this.handleProxySubmit(e)}>
              <Form.Group controlId="formProxyAllowTo">
                <Form.Label>Allow to #</Form.Label>
                <Form.Control placeholder="Allow to #" />
              </Form.Group>
              <Form.Group controlId="formProxyAuto">
                <Form.Label>Auto #</Form.Label>
                <Form.Control placeholder="Auto #" />
              </Form.Group>
              <Button type="submit">Add proxy</Button>
            </Form>
          </Modal.Body>
        </Modal>

        <Modal
          size="lg"
          show={isSaleContractModalVisible}
          onHide={this.handleSaleContractModalClose}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Sale contract
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={e => this.handleSaleContractSubmit(e)}>
              <Form.Group controlId="formSaleContractSellerId">
                <Form.Label>Seller #</Form.Label>
                <Form.Control placeholder="Seller #" />
              </Form.Group>
              <Form.Group controlId="formSaleContractBuyerId">
                <Form.Label>Buyer #</Form.Label>
                <Form.Control placeholder="Buyer #" />
              </Form.Group>
              <Form.Group controlId="formSaleContractCarId">
                <Form.Label>Car #</Form.Label>
                <Form.Control placeholder="Car #" />
              </Form.Group>
              <Button type="submit">Sale</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
