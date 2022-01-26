import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Onboarding from '../src/screens/Onboarding';

import HomeStack from './HomeStack';

const {Navigator, Screen} = createNativeStackNavigator();

function OnboardingStack() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{headerShown: false}}>
        <Screen name="Onboarding" component={Onboarding} />
        <Screen
          name="Home"
          component={HomeStack}
          options={{headerShown: false}}
        />
      </Navigator>
    </NavigationContainer>
  );
}

export default OnboardingStack;
