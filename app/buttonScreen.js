import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  AppState
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
//import MomentTZ from 'moment-timezone';
//import moment from 'moment-duration-format';

class buttonScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {count: 0,
                  hours: 0,
                  proms: 0,
                  interval: null,
                  weight: "Not set yet",
                  sex: "Not set yet",
                  isSet: false,
                  proms: "Need information",
                  startTime: null,
                  startTimeForInfo: null};
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
    this.setState({ count: this.state.count + 1 })
    this.countProms();
  }

  getSexMultiplier() {
    return (this.state.sex == 1) ? 0.49 : 0.58;
  }

  setStartingPoint() {
    this.setState({ startTime: new Date().getTime(), startTimeForInfo: moment().format("d hh:mm a") });
  }

  countProms() {
    if (this.state.startTime == null) {
      this.setStartingPoint();
    }

    this.updateHoursSinceStart();

    var MR = 0.016;
    var water = 0.806;
    var BW = this.getSexMultiplier();
    var SD = parseInt(this.state.count);
    var WT = parseInt(this.state.weight);
    var DP = parseInt(this.state.hours);

    var amount = (((water * SD * 1.2) / (BW * WT)) - (MR * DP)) * 10;
    var roundedAmount = (amount > 0) ? Math.round(amount * 100) / 100 : 0;

    if (this.state.isSet == true) {
      this.setState({proms: roundedAmount})
    }
  }

  resetDrinksAndHours() {
    this.setState({ hours: 0, count: 0, startTime: null });
  }

  setWeightAndSex(w, s) {
    this.setState({
      sex: s,
      weight: w,
      isSet: true
    });
  }

  // one hour is 3600000ms
  updateHoursSinceStart() {
    var d = new Date();
    if (this.state.startTime == null) {
      this.setState({ hours: 0 })
    } else {
      var difference = Math.abs(this.state.startTime - d.getTime()) / 3600000;
      difference = Math.round(difference * 100) / 100;
      this.setState({ hours: difference })
    }
  }

  getHumanifiedTime() {
    return (this.state.startTimeForInfo == null) ? "not yet?" : moment(this.state.startTimeForInfo, "d hh:mm a").fromNow();
  }

  showAlcohol() {
    return (this.state.isSet) ? "About " + this.state.proms + "‰ of alcohol on your blood" : "Set info";
  }

  showTime() {
    return (this.state.count == 0) ? "No drinks yet" : "First drink logged " + this.getHumanifiedTime();
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          "Log a drink whenever you consume a standard portition of alcohol, eg. 4cl of 40% or a beer"
        </Text>

        <Button onPress={() => Actions.infoSivu({ weight: this.state.weight, sex: this.state.sex, setter: this.setWeightAndSex.bind(this) })}
          title = { this.state.isSet ? "Change infos" : "Set infos" }
          color= { this.state.isSet ? "green" : "red" }
          accessibilityLabel="Learn more about this purple button"
        />

        <Text style={styles.welcome}>
          { this.showTime() }
        </Text>

        <Text style={styles.welcome}>
          Total portitions of alcohol taken: {this.state.count}
        </Text>

        <Text style={styles.welcome}>
          { this.showAlcohol() }
        </Text>

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

export default buttonScreen;
