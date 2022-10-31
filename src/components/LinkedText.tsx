/* eslint-disable react-hooks/exhaustive-deps */
import {
  View, Text, StyleSheet, Pressable, Linking, Alert,
} from 'react-native';
import React, { useCallback } from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import { useNavigation } from '@react-navigation/native';
import { LINKCOLOR } from '../consts/theme';
import { LinkedTextT } from '../../types';
import { SafeTouch } from './SafeTouchable';

function LinkedText({
  screenName, iconName, text, href, navigationProps,
}: LinkedTextT) {
  const navigation = useNavigation();
  const handlePress = useCallback(async () => {
    if (href) {
      const supported = await Linking.canOpenURL(href);
      if (supported) {
        await Linking.openURL(href);
      } else {
        Alert.alert(`Don't know how to open this URL: ${href}`);
      }
    } else {
      navigation.push(screenName, navigationProps);
    }
  }, [href, navigationProps]);

  return (
    <View style={styles.container}>
      <Octicons name={iconName} size={25} style={styles.iconPadding} />
      <SafeTouch onPress={handlePress}>
        <Text style={styles.textStyle}>{text}</Text>
      </SafeTouch>
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    color: LINKCOLOR,
    paddingLeft: 7,
  },
  iconPadding: {
    paddingTop: 2,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default LinkedText;
