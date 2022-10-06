import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { DIMENSION_WIDTH } from '../consts/theme';
import { LinkedBoxT } from '../../types';

function LinkedBox({
  text, number, color, screenToNavigate, usersData, isMutualListLoading,
}: LinkedBoxT) {
  const blockWdth = DIMENSION_WIDTH / 3 - 20 / 3;
  const navigation = useNavigation();
  const loadPage = () => {
    if (isMutualListLoading) {
      return null;
    }
    return navigation.push(screenToNavigate, usersData);
  };
  return (
    <Pressable onPress={loadPage}>
      <View
        style={{
          width: blockWdth,
          height: blockWdth,
          backgroundColor: color,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 15,
        }}
      >
        <Text>{text}</Text>
        <Text>{isMutualListLoading ? 'loading...' : number}</Text>
      </View>
    </Pressable>
  );
}

export default LinkedBox;
