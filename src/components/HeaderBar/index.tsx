/* eslint-disable @typescript-eslint/no-use-before-define */
import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
// import {HeaderT} from '../../types';
import HeaderImg from './HeaderImg';
import { MAINCOLOR } from '../../consts/theme';

function HeaderBar({ route }) {
  // TODO: typeScript
  const insets = useSafeAreaInsets();
  const minHeight = 60 + insets.top;
  const navigation = useNavigation();
  const isNavigationBackable = route.params?.isNavigationBackable ?? false;
  const goBack = () => navigation.goBack();
  return (
    <View style={[styles.container, { height: minHeight }]}>
      <View style={[styles.topHeaderContainer, { minHeight }]}>
        <View style={styles.sideElements}>
          {isNavigationBackable && (
            <Pressable onPress={goBack}>
              <Ionicons name="arrow-back" size={30} color="white" />
            </Pressable>
          )}
        </View>
        <View style={styles.logoContainer}>
          <HeaderImg />
        </View>
        <View style={styles.sideElements} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: MAINCOLOR,
    paddingHorizontal: 20,
  },
  logoContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  sideElements: {
    width: 50,
    justifyContent: 'center',
  },
  topHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default HeaderBar;
