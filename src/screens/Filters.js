import React, {useState} from 'react';
import {Platform, StatusBar} from 'react-native';
import styled, {css} from 'styled-components';
import {AirbnbRating} from 'react-native-ratings';
import {CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

Icon.loadFont();

export default function Filters({route, navigation}) {
  const universe = route.params?.universe || null;
  const [sort, setSort] = useState('name');
  const [rate, setRate] = useState(1);
  const sortItems = ['name', 'price', 'rate', 'downloads'];

  const submit = () => {
    navigation.navigate('Home', {
      rate,
      sort,
      universe,
    });
  };

  const reset = () => {
    navigation.navigate('Home', {
      rate: null,
      sort: null,
      universe,
    });
  };

  return (
    <Main>
      <StatusBar
        translucent
        backgroundColor="rgba(0,0,0,.4)"
        barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}
      />
      <Header>
        <BtnBack
          onPress={() => {
            navigation.pop();
          }}>
          <Icon
            name="arrow-back"
            size={30}
            color={Platform.OS === 'ios' ? '#000' : '#fff'}
          />
        </BtnBack>
        <HeaderTitle>Filters</HeaderTitle>
      </Header>
      <SortContainer>
        <Label>SORT BY</Label>
        {sortItems.map((item, index) => (
          <CheckBox
            key={index}
            title={item}
            iconLeft
            iconType="Ionicons"
            checkedIcon="radio-button-on"
            uncheckedIcon="radio-button-off"
            checked={sort === item || false}
            onPress={() => setSort(item)}
            containerStyle={{
              borderBottomColor: '#dadada',
              borderBottomWidth: 1,
              borderWidth: 0,
              marginTop: 10,
              backgroundColor: '#fff',
            }}
          />
        ))}
      </SortContainer>

      <RateContainer>
        <Label>FILTER BY</Label>
        <AirbnbRating
          count={5}
          defaultRating={1}
          size={28}
          showRating={false}
          starContainerStyle={{alignSelf: 'center'}}
          onFinishRating={value => {
            setRate(value);
          }}
        />
      </RateContainer>
      <BtnsContainer>
        <BtnReset onPress={reset}>
          <BtnTxt>Reset</BtnTxt>
        </BtnReset>
        <BtnApply onPress={submit}>
          <BtnApplyTxt>Apply</BtnApplyTxt>
        </BtnApply>
      </BtnsContainer>
    </Main>
  );
}

const Main = styled.SafeAreaView`
  flex: 1;
  background: #f2f2f7;
`;
const Header = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #c6c6c8;
  padding: 35px 20px 10px;
  align-items: center;
  flex-direction: row;
  ${Platform.select({
    ios: css`
      background-color: #fff;
    `,
    android: css`
      background-color: #007aff;
    `,
  })};
`;
const HeaderTitle = styled.Text`
  margin-left: 25px;
  ${Platform.select({
    ios: css`
      color: #000;
      font-size: 34px;
      font-weight: 700;
    `,
    android: css`
      color: #fff;
      font-size: 20px;
    `,
  })};
`;
const SortContainer = styled.View`
  padding: 25px 23px 10px;
  background: #fff;
`;

const Label = styled.Text`
  font-size: 13px;
  color: #3c3c43;
`;
const RateContainer = styled.View`
  margin-bottom: 5px;
  margin-top: 16px;
  background: #fff;
  padding: 25px 23px 10px;
`;
const BtnBack = styled.TouchableOpacity`
  align-self: flex-start;
`;
const BtnsContainer = styled.View`
  padding: 35px 20px;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
  align-items: flex-end;
`;
const BtnReset = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  height: 50px;
  flex: 1;
  margin-right: 10px
    ${Platform.select({
      ios: css`
        border-radius: 22px;
        background-color: #dadada;
      `,
      android: css`
        border-radius: 2px;
        background-color: #fff;
        border: 1px solid #dadada;
        elevation: 1;
      `,
    })};
`;
const BtnApply = styled.TouchableOpacity`
  height: 50px;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #296df1;
  margin-left: 10px;
  ${Platform.select({
    ios: css`
      border-radius: 22px;
    `,
    android: css`
      border-radius: 2px;
    `,
  })};
`;

const BtnApplyTxt = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: 500;
`;
const BtnTxt = styled.Text`
  font-size: 20px;
  color: #595959;
  font-weight: 500;
`;
