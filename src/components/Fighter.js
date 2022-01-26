import React from 'react';
import styled from 'styled-components';
import FastImage from 'react-native-fast-image';

export default function Fighter({fighter, navigation}) {
  return (
    <Card
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
  );
}

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
