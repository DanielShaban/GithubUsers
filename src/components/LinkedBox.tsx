import React from 'react';
import {
  View, Text, Pressable, StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DIMENSION_WIDTH } from '../consts/theme';
import { LinkedBoxT } from '../../types';

function LinkedBox({
  text, number, color, screenToNavigate, usersData, isMutualListLoading,
}: LinkedBoxT) {
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
        style={[styles.container, { backgroundColor: color }]}
      >
        <Text>{text}</Text>
        <Text>{isMutualListLoading ? 'loading...' : number}</Text>
      </View>
    </Pressable>
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
