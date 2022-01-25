import React from 'react';
import {ScrollView, Platform, StatusBar} from 'react-native';
import styled, {css} from 'styled-components';
import {AirbnbRating} from 'react-native-ratings';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Details({route, navigation}) {
  const fighter = route.params?.fighter;

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
        <HeaderTitle>{fighter.name}</HeaderTitle>
      </Header>
      <Info>
        <Char>
          <TxtName>{fighter.name}</TxtName>
          <TxtInfo>{fighter.universe}</TxtInfo>
          <RateContainer>
            <AirbnbRating
              count={5}
              defaultRating={fighter.rate}
              size={22}
              isDisabled
              showRating={false}
              starContainerStyle={{alignSelf: 'flex-start'}}
            />
          </RateContainer>
          <DownloadsContainer>
            <TxtInfo>Downloads: {fighter.downloads}</TxtInfo>
          </DownloadsContainer>
          <PriceContainer>
            <TxtPrice>$ {fighter.price}</TxtPrice>
          </PriceContainer>
        </Char>
        <Cover>
          <CoverPhoto
            source={{
              uri: fighter.imageURL || null,
            }}
            resizeMode="contain"
          />
        </Cover>
      </Info>

      <DescriptionContainer>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingVertical: 10}}>
          <TxtInfo>{fighter.description}</TxtInfo>
        </ScrollView>
      </DescriptionContainer>
    </Main>
  );
}

const Main = styled.SafeAreaView`
  flex: 1;
  background: #fff;
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
const Info = styled.View`
  flex-direction: row;
  padding: 40px 10px 20px;
  background: #f2f2f7;
`;
const Char = styled.View`
  justify-content: center;
  padding-left: 13px;
  padding-right: 10px;
  flex: 1;
`;

const TxtName = styled.Text`
  font-size: 24px;
  color: #000;
  font-weight: 700;
`;
const TxtInfo = styled.Text`
  font-size: 14px;
  color: #000;
  line-height: 27px;
`;

const TxtPrice = styled.Text`
  font-size: 22px;
  color: #fff;
  text-align: center;
  font-weight: bold;
`;
const Cover = styled.View`
  width: 182px;
  height: 182px;
  overflow: hidden;
  align-self: center;
`;

const CoverPhoto = styled.Image`
  width: 100%;
  height: 100%;
`;

const DescriptionContainer = styled.View`
  padding: 4px 16px;
  align-items: center;
  background: #f2f2f7;
  height: 100%;
`;

const RateContainer = styled.View`
  margin-bottom: 5px;
  margin-top: 16px;
`;

const DownloadsContainer = styled.View`
  margin-bottom: 5px;
`;

const PriceContainer = styled.TouchableOpacity`
  width: 100px;
  height: 40px;
  border-radius: 7px;
  background: #007aff;
  justify-content: center;
  align-items: center;
`;
const BtnBack = styled.TouchableOpacity`
  align-self: flex-start;
`;
const BtnTxt = styled.Text`
  font-size: 24px;
  color: blue;
  font-weight: 700;
`;
