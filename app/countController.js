import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  AppState,
  AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Timer from './Timer';
import Moment from 'moment';

class CountController extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getSexMultiplier() {
    return (this.state.sex === "true") ? 0.49 : 0.58;
  }

  /*
  countProms() {
    this.updateHoursSinceStart();

    let MR = 0.016;
    let water = 0.806;
    let BW = this.getSexMultiplier();
    let SD = parseInt(this.state.count);
    let WT = parseInt(this.state.weight);
    let DP = Math.round(this.state.hours * 100) / 100;

    let amount = (((water * SD * 1.2) / (BW * WT)) - (MR * DP)) * 10;
    let roundedAmount = (amount > 0) ? Math.round(amount * 100) / 100 : 0;

    if (this.state.isSet == true) {
      this.setState({proms: amount})
    }
  }
  */

  render () {
    return (
      <View style={styles.container}>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  buttonContainer: {
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

export default CountController;
