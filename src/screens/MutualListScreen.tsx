import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import {
  View, Pressable, FlatList, StyleSheet,
} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import MemorizedProfileMainInfo from '../components/ProfileMainInfo';
import ProfileMainInfo from '../components/ProfileMainInfo';
import options from '../consts/switchOptions';
import { MAINCOLOR } from '../consts/theme';

function MutualListScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { followersList, followingsList, mutualSubscribes } = route.params;
  const [data, setData] = useState<{}[]>(mutualSubscribes);
  const onlyFollowers: {}[] = followersList.filter(
    (item) => !mutualSubscribes.find((el) => el.id === item.id),
  );
  // Followers - Followings = onlyFollowers
  const onlyFollowings: {}[] = followingsList.filter(
    (item) => !mutualSubscribes.find((el) => el.id === item.id),
  );
  // Followings - Followers = onlyFollowings

  const changeList = (value: string) => {
    if (value === '0') {
      return setData(onlyFollowings);
    }
    if (value === '1') {
      return setData(mutualSubscribes);
    }
    return setData(onlyFollowers);
  };
  // TODO:Should i use react navigation here ?

  const pressHandle = (item) => navigation.push('ProfileScreen', {
    userLogin: item.login,
    isNavigationBackable: true,
  });

  function renderItem({ item }) {
    return (
      <MemorizedProfileMainInfo
        name={item.login}
        avatarUrl={item.avatarUrl}
        login=""
        pressHandle={() => pressHandle(item)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.switherContainer}>
        <SwitchSelector
          hasPadding
          initial={1}
          options={options}
          textColor="black"
          selectedColor="black"
          backgroundColor="white"
          onPress={(value): void => changeList(value)}
        />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          style={styles.listStyle}
          contentContainerStyle={styles.contentContainerStyle}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: 10,
    paddingVertical: 60,
  },
  listStyle: {
    paddingHorizontal: 20,
  },
  switherContainer: {
    paddingVertical: 10,
    backgroundColor: MAINCOLOR,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listContainer: {
  },

});

export default MutualListScreen;
