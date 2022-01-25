import React from 'react';
import {Image, Platform, StatusBar} from 'react-native';
import styled from 'styled-components/native';
import Onboarding from 'react-native-onboarding-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Onboard({navigation}) {
  const ButtonIos = () => {
    return (
      <BtnIos
        onPress={() => {
          setStore();
          navigation.navigate('Home');
        }}>
        <Label> Let's Go</Label>
      </BtnIos>
    );
  };
  const ButtonAndroid = () => {
    return (
      <BtnAndroid
        onPress={() => {
          setStore();
          navigation.navigate('Home');
        }}>
        <Icon name="arrow-forward" size={30} color="#1A90F0" />
      </BtnAndroid>
    );
  };
  StatusBar.setHidden(true);
  const setStore = async () => {
    try {
      await AsyncStorage.setItem('Onboarding', 'true');
    } catch (e) {
      // save error
    }
  };

  return (
    <Onboarding
      showNext={false}
      showSkip={false}
      bottomBarHighlight={false}
      DoneButtonComponent={Platform.OS === 'ios' ? ButtonIos : ButtonAndroid}
      bottomBarHeight={180}
      pages={[
        {
          backgroundColor: '#1A90F0',
          image: (
            <Image
              source={require('../assets/onboarding-1.png')}
              resizeMode="contain"
              style={{width: 300, height: 300}}
            />
          ),
          title: 'Access our Extended Catalog',
          subtitle: '',
        },
        {
          backgroundColor: '#1A90F0',
          image: (
            <Image
              source={require('../assets/onboarding-2.png')}
              resizeMode="contain"
              style={{width: 300, height: 300}}
            />
          ),
          title: 'Filter Fighters',
          subtitle: '',
        },
        {
          backgroundColor: '#1A90F0',
          image: (
            <Image
              source={require('../assets/onboarding-3.png')}
              resizeMode="contain"
              style={{width: 300, height: 300}}
            />
          ),
          title: 'And More...',
          subtitle: '',
        },
      ]}
    />
  );
}

const BtnIos = styled.TouchableOpacity`
  background-color: #fff;
  align-items: center;
  justify-content: center;
  border-radius: 22px;
  left: -12%;
  width: 338px;
  height: 48px;
  top: 50px;
`;
const Label = styled.Text`
  color: #1a90f0;
  text-align: center;
  font-size: 24px;
`;
const BtnAndroid = styled.TouchableOpacity`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background: #fff;
  justify-content: center;
  align-items: center;
  margin-right: 25px;
`;
