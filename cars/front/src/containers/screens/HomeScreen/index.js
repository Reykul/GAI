import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HomeScreen from './HomeScreen';
import { fetchCars, registerCar, addProxy } from '../../../actions/cars';
import { sale } from '../../../actions/sale';
import { stateDuty } from '../../../actions/stateDuty';

const mapStateToProps = state => ({
  cars: state.cars.data,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { fetchCars, registerCar, addProxy, sale, stateDuty },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
