import React, {useState, useEffect} from 'react';
import {ScrollView, StatusBar, Platform, FlatList} from 'react-native';
import styled, {css} from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';

// ## COMPONENTS ##
import Fighter from '../components/Fighter';
// ## SERVICES ##
import api from '../services/api';

Icon.loadFont();

export default function Home({route, navigation}) {
  const [universesList, setUniversesList] = useState([]);
  const [universeSelected, setUniverseSelected] = useState('All');
  const [resultList, setResultList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleUniverse = async (universe, isRefreshing) => {
    setIsLoading(true);
    setUniverseSelected(universe);
    if (universe === 'All') {
      getAllFighters();
      setIsLoading(false);
      return;
    }

    await api
      .get('fighters?', {
        params: {
          universe: universe,
        },
      })
      .then(response => {
        if (isRefreshing) {
          setResultList(response.data);
          setIsLoading(false);
          return;
        }
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
            setIsLoading(false);
          } else {
            setResultList(rateList);
            setIsLoading(false);
            return;
          }
        } else {
          setResultList(response.data);
          setIsLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
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
        {resultList.length > 0 && (
          <FlatList
            data={resultList}
            renderItem={({item}) => (
              <Fighter fighter={item} navigation={navigation} />
            )}
            keyExtractor={item => item.name}
            onRefresh={() => handleUniverse(universeSelected, true)}
            refreshing={isLoading}
          />
        )}
      </FightersContainer>
    </Main>
  );
}

const Main = styled.SafeAreaView`
  background: #fff;
  flex: 1;
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
  height: 500px;
  background: #f2f2f7;
  flex: 1;
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
