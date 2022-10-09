import { View, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import ProfileNames from './ProfileNames';
import { ProfileMainInfoT } from '../../types';
import UserAvatar from './UserAvatar';

function ProfileMainInfo({
  name, login, avatarUrl, pressHandle,
}: ProfileMainInfoT) {
  return (
    <Pressable onPress={pressHandle}>
      <View style={styles.profileInfo}>
        <UserAvatar size={77} src={avatarUrl} />
        <ProfileNames name={name || login} userName={name && login} />
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
  },
});
const MemorizedProfileMainInfo = React.memo(ProfileMainInfo);

export default MemorizedProfileMainInfo;
