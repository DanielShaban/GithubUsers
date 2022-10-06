import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import {
  View, Pressable, FlatList, StyleSheet,
} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import ProfileMainInfo from '../components/ProfileMainInfo';
import { options } from '../consts/switchOptions';
import { mainColor, textGrey } from '../consts/theme';

function MutualListScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { followersList, followingsList, mutualSubscribes } = route.params;
  const [data, setData] = useState<{}[]>(mutualSubscribes);
  const onlyFollowers: {}[] = followersList.filter(
    (item) => !mutualSubscribes.find((el) => el.id === item.id),
  );

  const onlyFollowings: {}[] = followingsList.filter(
    (item) => !mutualSubscribes.find((el) => el.id === item.id),
  );

  const changeList = (value: string) => {
    if (value === '0') {
      return setData(onlyFollowings);
    }
    if (value === '1') {
      return setData(mutualSubscribes);
    }
    return setData(onlyFollowers);
  };
  const renderitem = ({ item }: { login: string, avatar_url: string }) => (
    <Pressable
      onPress={() => navigation.push('ProfileScreen', { userLogin: item.login, isNavigationBackable: true })}
    >
      <ProfileMainInfo name={item.login} avatarUrl={item.avatar_url} />
    </Pressable>
  );
  const memoizedValue = useMemo(() => renderitem, []);

  return (
    <View style={styles.container}>
      <View style={styles.switherContainer}>
        <SwitchSelector
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
          style={{ paddingHorizontal: 20 }}
          contentContainerStyle={{ paddingTop: 10, paddingVertical: 60 }}
          data={data}
          renderItem={memoizedValue}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
}

export default MutualListScreen;

const styles = StyleSheet.create({
  switherContainer: {
    paddingVertical: 10,
    backgroundColor: mainColor,
  },
  container: {
    flex: 1,
    // paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  listContainer: {
    // paddingVertical: 0,
  },

});
