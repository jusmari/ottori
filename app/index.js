import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { Text } from 'react-native';

import statsScreen from './statisticsScreen';
import buttonScreen from './buttonScreen';
import infoScreen from './infoScreen';

const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{color: selected ? 'red' : 'black'}}>{title}</Text>
  );
}

const App = () => {
  return (
    <Router>
      <Scene key="root">

        <Scene
          key="tabbar"
          tabs={true}
          tabBarStyle={{ backgroundColor: '#FFFFFF' }}
        >
          <Scene key="etusivu" title="etusivu" icon={TabIcon} initial>
            <Scene key="button"
              component={buttonScreen}
              title="Ottori"
              initial
            />

            <Scene key="infoSivu"
              component={infoScreen}
            />
          </Scene>

          <Scene key="dokaus" title="stats" icon={TabIcon}>
            <Scene
              key="Stats"
              component={statsScreen}
            />
          </Scene>
        </Scene>
      </Scene>
    </Router>
  );
}

export default App;
