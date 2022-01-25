import React, {useState, useEffect} from 'react';
import {ScrollView, StatusBar, Platform} from 'react-native';
import styled, {css} from 'styled-components';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';

// ## SERVICES ##
import api from '../services/api';

export default function Home({route, navigation}) {
  const [universesList, setUniversesList] = useState([]);
  const [universeSelected, setUniverseSelected] = useState('All');
  const [resultList, setResultList] = useState([]);
  const sort = route.params?.sort || null;
  const filter = route.params?.rate || null;
  const filterUniverse = route.params?.universe || null;

  useFocusEffect(
    React.useCallback(() => {
      if (filterUniverse) {
        handleUniverse(filterUniverse);
      }
    }, [filterUniverse, filter]),
  );

  const getAllFighters = async () => {
    await api
      .get('fighters')
      .then(response => {
        setResultList(response.data);
      })
      .catch(err => {
        console.log(err);
        return false;
      });
  };
  useEffect(() => {
    const getUniverses = async () => {
      await api
        .get('universes')
        .then(response => {
          setUniversesList(response.data);
        })
        .catch(err => {
          console.log(err);
          return false;
        });
    };
    getUniverses();
    getAllFighters();
  }, []);

  const handleUniverse = async universe => {
    setUniverseSelected(universe);
    if (universe === 'All') {
      getAllFighters();
      return;
    }

    await api
      .get('fighters?', {
        params: {
          universe: universe,
        },
      })
      .then(response => {
        if (filter) {
          let rateList = response.data.filter(
            fighter => fighter.rate === filter,
          );
          if (sort) {
            let sortedList = [];
            if (sort === 'name') {
              sortedList = rateList.sort(function (x, y) {
                let a = x.name.toUpperCase(),
                  b = y.name.toUpperCase();
                return a == b ? 0 : a > b ? 1 : -1;
              });
            } else {
              sortedList = rateList.sort(function (x, y) {
                return y[sort] - x[sort];
              });
            }
            setResultList(sortedList);
          } else {
            setResultList(rateList);
            return;
          }
        } else {
          setResultList(response.data);
        }
      })
      .catch(err => {
        console.log(err);
        return false;
      });
  };

  StatusBar.setHidden(false);
  return (
    <Main>
      <StatusBar
        translucent
        backgroundColor="rgba(0,0,0,.4)"
        barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}
      />
      <Header>
        <HeaderTitle>Fighters</HeaderTitle>
        <BtnFilter
          onPress={() => {
            navigation.navigate('Filters', {universe: universeSelected});
          }}>
          <Icon
            name="filter"
            size={30}
            color={Platform.OS === 'ios' ? '#000' : '#fff'}
          />
        </BtnFilter>
      </Header>
      <UniversesContainer>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <BtnUniverse
            onPress={() => handleUniverse('All')}
            style={
              universeSelected === 'All' ? {backgroundColor: '#003C7E'} : null
            }>
            <TxtUniverse>All</TxtUniverse>
          </BtnUniverse>
          {universesList.length > 0 &&
            universesList.map((item, index) => (
              <BtnUniverse
                onPress={() => handleUniverse(item.name)}
                key={index}
                style={
                  universeSelected === item.name
                    ? {backgroundColor: '#003C7E'}
                    : null
                }>
                <TxtUniverse>{item.name}</TxtUniverse>
              </BtnUniverse>
            ))}
        </ScrollView>
      </UniversesContainer>
      <FightersContainer>
        <ScrollView>
          {resultList.length > 0 &&
            resultList.map((fighter, index) => (
              <Card
                key={index}
                onPress={() => {
                  navigation.navigate('Details', {
                    fighter,
                  });
                }}>
                <AvatarContainer>
                  <FastImage
                    source={{
                      uri: fighter.imageURL,
                      headers: {Authorization: 'someAuthToken'},
                      priority: FastImage.priority.normal,
                    }}
                    style={{
                      backgroundColor: '#f2f2f2',
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </AvatarContainer>
                <Char>
                  <TxtName>{fighter.name}</TxtName>
                  <TxtInfo>{fighter.universe}</TxtInfo>
                </Char>
                <Info>
                  <TxtInfo>{`Price: $${fighter.price}`}</TxtInfo>
                  <TxtInfo>Rate: {fighter.rate}</TxtInfo>
                  <TxtInfo>Downloads: {fighter.downloads}</TxtInfo>
                </Info>
              </Card>
            ))}
        </ScrollView>
      </FightersContainer>
    </Main>
  );
}

const Main = styled.SafeAreaView`
  flex: 1;
  background: #fff;
`;
const UniversesContainer = styled.View`
  padding: 20px 0px;
  width: 100%;
  background: #fff;
`;
const BtnUniverse = styled.TouchableOpacity`
  min-width: 60px;
  height: 40px;
  border-radius: 2px;
  background: #007aff;
  justify-content: center;
  align-items: center;
  padding: 0 12px;
  margin: 0 7.5px;
`;
const TxtUniverse = styled.Text`
  font-size: 14px;
  color: #fff;
`;
const FightersContainer = styled.View`
  padding: 5px 0px;
  width: 100%;
  height: 100%;
  background: #f2f2f7;
`;

const Card = styled.TouchableOpacity`
  align-self: center;
  flex-direction: row;
  padding: 15px;
  margin-top: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #e5e5e5;
`;
const AvatarContainer = styled.View`
  width: 77px;
  height: 77px;
  overflow: hidden;
`;
const Info = styled.View`
  justify-content: center;
  align-items: flex-end;
`;
const Char = styled.View`
  justify-content: center;
  padding-left: 13px;
  padding-right: 10px;
  flex: 1;
`;
const TxtName = styled.Text`
  font-size: 16px;
  color: #000;
  font-weight: 700;
`;
const TxtInfo = styled.Text`
  font-size: 14px;
  color: #000;
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
  flex: 1;
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
const BtnFilter = styled.TouchableOpacity``;
