import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Onboarding from '../src/screens/Onboarding';
import Home from '../src/screens/Home';
import Filters from '../src/screens/Filters';
import Details from '../src/screens/Details';

const {Navigator, Screen} = createNativeStackNavigator();

function AppStack() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={'Onboarding'}>
        <Screen name="Home" component={Home} />
        <Screen name="Onboarding" component={Onboarding} />
        <Screen name="Filters" component={Filters} />
        <Screen name="Details" component={Details} />
      </Navigator>
    </NavigationContainer>
  );
}

export default AppStack;
