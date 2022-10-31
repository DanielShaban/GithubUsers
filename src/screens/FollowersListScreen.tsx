import {
  View, StyleSheet, FlatList, ActivityIndicator,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getSearchFollowers } from '../api/apiReq';
import userListMatrix from '../helper/userListMatrix';
import MemorizedProfileMainInfo from '../components/ProfileMainInfo';

function FollowersListScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const [followersList, setFollowersList] = useState<{}[]>([]);
  const [page, setPage] = useState<number>(1);
  const {
    followersCount, login, isFollowingsList, alreadyLoadedData,
  } = route.params;

  const isMorePages = Number(followersCount) > page * 100;
  // use to specify whether the loading indicator should be displayed or not
  const FooterLoadingIndecator = useCallback(() => {
    if (isMorePages) {
      return <ActivityIndicator animating size="large" />;
    }
    return false;
  }, [isMorePages]);

  const pressHandle = (item) => navigation.push('ProfileScreen', {
    userLogin: item.login,
    isNavigationBackable: true,
  });

  function renderItem({ item }) {
    return (
      <MemorizedProfileMainInfo
        name=""
        avatarUrl={item.avatarUrl}
        login={item.login}
        index={item.index}
        pressHandle={() => pressHandle(item)}
      />
    );
  }

  // const memoizedValue = useMemo(() => renderItem, []);

  const getMoreFollowers = () => {
    if (isMorePages) {
      getSearchFollowers(login, page + 1, isFollowingsList)
        .then((res) => setFollowersList([...followersList, ...userListMatrix(res.data)]));
      return setPage(page + 1);
    }
    return false;
  };

  useEffect(() => {
    if (alreadyLoadedData.length) {
      // we have some data from profileScreen
      setPage(Math.ceil(alreadyLoadedData.length / 10));
      setFollowersList(alreadyLoadedData);
    } else if (page === 1) {
      getSearchFollowers(login, page, isFollowingsList)
        .then((res) => setFollowersList(userListMatrix(res.data)));
    }
  }, [login, isFollowingsList]);

  return (
    <View style={styles.container}>
      <FlatList
        removeClippedSubviews
        data={followersList}
        initialNumToRender={5}
        contentContainerStyle={styles.flatlistContainer}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={getMoreFollowers}
        ListFooterComponent={FooterLoadingIndecator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  flatlistContainer: {
    padding: 20,
  },
});

export default FollowersListScreen;
