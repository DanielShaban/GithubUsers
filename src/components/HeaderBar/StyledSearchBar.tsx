import { TextInput, StyleSheet, View } from 'react-native';
import React from 'react';
import { DIMENSION_WIDTH } from '../../consts/theme';
import { StyledSearchBarT } from '../../../types';

function StyledSearchBar({ text, handleChange }: StyledSearchBarT) {
  return (
    <View style={styles.container}>
      <TextInput
        selectionColor="white"
        textAlignVertical="center"
        placeholder="Find Github User"
        placeholderTextColor="white"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyle}
        value={text}
        onChangeText={handleChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },
  TextInputStyle: {
    paddingVertical: 0,
    paddingHorizontal: 15,
    color: 'white',
    width: DIMENSION_WIDTH - 40,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#57606A',
    textAlignVertical: 'center',
  },
});

export default StyledSearchBar;
