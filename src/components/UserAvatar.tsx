import { View, Image } from 'react-native';
import React from 'react';
import { UserAvatarT } from '../../types';

function UserAvatar({ size, src }: UserAvatarT) {
  return (
    <View>
      <Image source={{ uri: src }} style={{ width: size, height: size, borderRadius: size / 2 }} />
    </View>
  );
}

export default UserAvatar;
