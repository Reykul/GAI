import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HomeScreen from './HomeScreen';
import { fetchCars, registerCar, addProxy } from '../../../actions/cars';
import { sale } from '../../../actions/sale';

const mapStateToProps = state => ({
  cars: state.cars.data,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchCars, registerCar, addProxy, sale }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
