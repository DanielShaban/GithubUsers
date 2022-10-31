import React from 'react';
import {
  View, Text, Pressable, StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DIMENSION_WIDTH } from '../consts/theme';
import { LinkedBoxT } from '../../types';
import { SafeTouch } from './SafeTouchable';

function LinkedBox({
  text, number, color, screenToNavigate, usersData, isMutualListLoading,
}: LinkedBoxT) {
  const navigation = useNavigation();
  const loadPage = () => {
    if (isMutualListLoading) {
      return null;
    }
    console.log('heeey');
    return navigation.push(screenToNavigate, usersData);
  };
  return (
    <SafeTouch
      onPress={loadPage}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
          borderRadius: 10,
        },
      ]}
    >
      <View style={[styles.container, { backgroundColor: color }]}>
        <Text>{text}</Text>
        <Text>{isMutualListLoading ? 'loading...' : number}</Text>
      </View>
    </SafeTouch>
  );
}

const styles = StyleSheet.create({
  container: {
    width: DIMENSION_WIDTH / 3 - 20 / 3,
    height: DIMENSION_WIDTH / 3 - 20 / 3,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
});

export default LinkedBox;
