import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { textGrey } from '../consts/theme';
import { ProfileNamesT } from '../../types';

function ProfileNames({ name, userName }: ProfileNamesT) {
  return (
    <View style={styles.container}>
      <Text style={styles.textNAme}>{name}</Text>
      <Text style={styles.textUsername}>{userName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textUsername: {
    fontSize: 20,
    color: textGrey,
    fontWeight: '400',
  },
  textNAme: {
    fontSize: 24,
    color: 'black',
  },
  container: {
    paddingHorizontal: 20,
  },
});

export default ProfileNames;
