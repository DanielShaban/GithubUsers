import { TextInput, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { DIMENSION_WIDTH } from '../../consts/theme';

function StyledSearchBar({ text, handleChange }) {
  return (
    <View style={{
      paddingBottom: 10,
    }}
    >
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
