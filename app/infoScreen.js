import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

var radio_props = [
  {label: 'male', value: 0 },
  {label: 'female', value: 1 }
];

class buttonScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {weight: props.weight,
                  sex: props.sex};
  }

  setWeight(value) {
    this.setState({weight: value})
    this.props.setter(value, this.state.sex)
  }

  setSex(value) {
    this.setState({sex: value})
    this.props.setter(this.state.weight, value)
  }

  render () {
    return (
      <View style={styles.container}>
        <View>
          <RadioForm
            style={{height: 100, width: 100}}
            radio_props={radio_props}
            initial={0}
            formHorizontal={true}
            labelHorizontal={false}
            buttonColor={'#2196f3'}
            animation={true}
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

export default buttonScreen;
