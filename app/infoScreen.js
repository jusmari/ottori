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
  {label: 'male', value: 0 },
  {label: 'female', value: 1 }
];

class buttonScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {weight: "not set",
                  sex: "not set"};
  }

  componentWillMount() {
    AsyncStorage.multiGet(["weight", "sex"]).then((values) => {
      let weight = values[0][1];
      let sex = values[1][1];

      this.setState({ weight: weight, sex: sex });
    });
  }

  setWeight(value) {
    this.setState({weight: value}, this.update());
    AsyncStorage.setItem("weight", value);
  }

  setSex(value) {
    this.setState({sex: value}, this.update());
    AsyncStorage.setItem("sex", JSON.stringify(value));
  }

  update() {
    this.props.update(this.state.weight, this.state.sex);
  }

  render () {
    return (
      <View style={ styles.container }>
          <RadioForm
            style={{height: 100}}
            radio_props={radio_props}
            formHorizontal={true}
            labelHorizontal={false}
            buttonColor={'#2196f3'}
            animation={true}
            initial={this.state.sex || 0}
            onPress={(value) => {this.setSex(value)}}
          />

        <Text style={{height: 40 , width: 140, textAlign: 'center'}}>
          Weight: {this.state.weight} kg.
        </Text>

        <TextInput
          style={{height: 40, width: 140}}
          keyboardType="numeric"
          placeholder="Weight here"
          onChangeText={(text) => this.setWeight(text)}
          //value={this.state.weight}
        />

        <Button onPress={() => Actions.pop()}
          style={styles.button}
          title="doned"
          color="#bbbbbb"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#00cc66',
  },
  button: {
    border-style: solid
  },
  radioContainer: {
    margin: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',

    color: '#ffffff',
  },
});

export default buttonScreen;
