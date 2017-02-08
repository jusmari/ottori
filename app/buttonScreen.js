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

class ButtonScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {count: 0,
                  proms: null,
                  weight: "Not set yet",
                  sex: "Not set yet",
                  isSet: false,
                  proms: "0"};
  }

  componentWillMount() {
    AsyncStorage.multiGet(["weight", "sex"]).then((values) => {
      let weight = values[0][1];
      let sex = values[1][1];

      this.setState({ weight: weight, sex: sex })

      if (weight !== null && sex !== null) this.setState({ isSet: true});
    });
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange() {
    this.countProms();
  }

  takeADrink() {
    if (this.state.count == 0) this.setStartingTime();
    this.setState({ count: this.state.count + 1 })
    this.countProms();
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

  updateHoursSinceStart() {
    let d = new Date();
    let difference = Math.abs(this.state.startTime - d.getTime()) / 3600000;
    difference = Math.round(difference * 100) / 100;
    this.setState({ hours: difference });
  }

  resetDrinksAndHours() {
    this.setState({ hours: 0, count: 0, startTime: null, proms: null });
  }

  updateInfos(w, s) {
    this.setState({
      sex: s,
      weight: w,
      isSet: true
    });
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          "Log a drink whenever you consume a standard portition of alcohol, eg. 4cl of 40% or a beer"
        </Text>

        <Button onPress={() => Actions.infoSivu({ weight: this.state.weight, sex: this.state.sex, update: this.updateInfos.bind(this) })}
          title = { this.state.isSet ? "Change infos" : "Set infos" }
          color= { this.state.isSet ? "green" : "red" }
          accessibilityLabel="Learn more about this purple button"
        />

        <Text style={styles.welcome}>
          { this.getHumanifiedTime() }
        </Text>

        <Text style={styles.welcome}>
          Total portitions of alcohol taken: {this.state.count}
        </Text>

        <Text style={styles.welcome}>
          { this.showAlcohol() }
        </Text>

        <Timer />

        <Button onPress={() => this.takeADrink()}
          title="Take a drink"
          color="#bbbbbb"
        />

        <Button onPress={() => this.resetDrinksAndHours()}
          title="reset hours and drinks"
          color="#bbbbbb"
        />
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

export default ButtonScreen;
