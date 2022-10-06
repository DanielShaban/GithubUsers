/* eslint-disable @typescript-eslint/no-use-before-define */
import { Image, StyleSheet } from 'react-native';
import React from 'react';

function HeaderImg() {
  return (
    <Image
      resizeMode="contain"
      style={styles.LogoStyle}
      source={require('../../../assets/images/LogoWhite.png')} // eslint-disable-line global-require
    />
  );
}

const styles = StyleSheet.create({
  LogoStyle: {
    width: 70,
    flex: 1,
  },
});

export default HeaderImg;
