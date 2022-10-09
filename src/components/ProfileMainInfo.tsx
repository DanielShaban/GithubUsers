import { View, StyleSheet } from 'react-native';
import React from 'react';
import ProfileNames from './ProfileNames';
import { ProfileMainInfoT } from '../../types';
import UserAvatar from './UserAvatar';

function ProfileMainInfo({
  name, login, avatarUrl,
}: ProfileMainInfoT) {
  return (
    <View style={styles.profileInfo}>
      <UserAvatar size={77} src={avatarUrl} />
      <ProfileNames name={name || login} userName={name && login} />
    </View>
  );
}
const styles = StyleSheet.create({
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
  },
});

export default ProfileMainInfo;
