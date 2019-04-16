import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HomeScreen from './HomeScreen';
import { fetchCars, registerCar, addProxy } from '../../../actions/cars';

const mapStateToProps = state => ({
  cars: state.cars.data,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchCars, registerCar, addProxy }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
