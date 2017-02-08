import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Moment from 'moment';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {startTime: null,
                  duration: null};
  }

  componentWillMount() {
    AsyncStorage.multiGet(["startTime", "duration"]).th
  }

  getHumanifiedTime() {
    return (this.state.duration == null) ? "not yet?" : Moment(this.state.duration, "d hh:mm a").fromNow();
  }

  updateHoursSinceStart() {
    let d = new Date();
    if (this.state.startTime == null) {
      this.setState({ hours: 0 })
    } else {
      let difference = Math.abs(this.state.startTime - d.getTime()) / 3600000;
      difference = Math.round(difference * 100) / 100;
      this.setState({ hours: difference });
    }
  }

  render () {
    return (
        <Text style={styles.welcome}>
          { this.showTime() }
        </Text>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#00cc66',
  },
  radioContainer: {
    margin: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

export default Timer;
