import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import MemorizedProfileMainInfo from '../../components/ProfileMainInfo';

import { MAINCOLOR } from '../../consts/theme';

function Followers() {
  const route = useRoute();

  const navigation = useNavigation();
  const { followersList, mutualSubscribes } = route.params;

  // Followers - mutual = onlyFollowers
  const onlyFollowers: {}[] = followersList.filter((item) => !mutualSubscribes.find((el) => el.id === item.id));

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
  // TODO:REMOVE SwitchSelector

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          style={styles.listStyle}
          contentContainerStyle={styles.contentContainerStyle}
          data={onlyFollowers}
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

  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listContainer: {},
});

export default Followers;
