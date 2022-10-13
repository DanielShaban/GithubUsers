import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function NoticeText({ text }) {
  return (
    <View>
      <Text style={styles.PSStyle}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  PSStyle: {
    padding: 20,
  },
});
