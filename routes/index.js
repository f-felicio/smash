import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OnboardingStack from './OnboardingStack';
import HomeStack from './HomeStack';

function AppStack() {
  const [isOnboarding, setIsOnboarding] = useState(null);

  useEffect(() => {
    async function _retrieveData() {
      try {
        const value = await AsyncStorage.getItem('Onboarding');
        if (!value) {
          setIsOnboarding(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
    _retrieveData();
  }, []);

  return (
    <>
      {isOnboarding && <OnboardingStack />}
      {!isOnboarding && <HomeStack />}
    </>
  );
}

export default AppStack;
