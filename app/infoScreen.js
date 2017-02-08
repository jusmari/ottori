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
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

let radio_props = [
  {label: 'male', value: "false" },
  {label: 'female', value: "true" }
];

export default class ButtonScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {weight: "not set",
                  sex: "not set"};
  }

  componentWillMount() {
    AsyncStorage.multiGet(["weight", "sex"]).then((values) => {
      let weight = values[0][1];
      let sex = values[1][1];

      this.setState({ weight: weight, sex: sex })
    });
  }

  setWeight(value) {
    this.setState({weight: value}, this.update())
    AsyncStorage.setItem("weight", value);
  }

  setSex(value) {
    this.setState({sex: value}, this.update())
    AsyncStorage.setItem("sex", value);
  }

  update() {
    this.props.update(this.state.weight, this.state.sex);
  }

  render () {
    return (
      <View style={styles.container}>
        <View>
          <RadioForm
            style={{height: 100, width: 100}}
            radio_props={radio_props}
            formHorizontal={true}
            labelHorizontal={false}
            buttonColor={'#2196f3'}
            animation={true}
            initial={"false"}
            onPress={(value) => {this.setSex(value)}}
          />
        </View>

        <Text style={{height: 40 , width: 80}}>
          Paino: {this.state.weight}
        </Text>

        <Text style={{height: 40 , width: 80}}>
          seksi: {this.state.sex}
        </Text>

        <TextInput
          style={{height: 40, width: 80}}
          keyboardType="numeric"
          placeholder="paino tähän"
          onChangeText={(text) => this.setWeight(text)}
          //value={this.state.weight}
        />

        <Button onPress={() => Actions.button()}
          title="doned"
          color="#bbbbbb"
        />
      </View>
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
