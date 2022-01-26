import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../src/screens/Home';
import Filters from '../src/screens/Filters';
import Details from '../src/screens/Details';

const {Navigator, Screen} = createNativeStackNavigator();

function HomeStack() {
  return (
    <NavigationContainer independent={true}>
      <Navigator screenOptions={{headerShown: false}}>
        <Screen name="Home" component={Home} />
        <Screen name="Filters" component={Filters} />
        <Screen name="Details" component={Details} />
      </Navigator>
    </NavigationContainer>
  );
}

export default HomeStack;
