import {
  View, Pressable, StyleSheet, FlatList, ActivityIndicator,
} from 'react-native';
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getSearchFollowers } from '../api/apiReq';
import ProfileMainInfo from '../components/ProfileMainInfo';

function FollowersListScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const [followersList, setFollowersList] = useState<{}[]>([]);
  const [page, setPage] = useState<number>(1);
  const {
    followersCount, login, isFollowingsList, alreadyLoadedData,
  } = route.params;

  const isMorePages = Number(followersCount) > page * 30;
  const FooterLoadingIndecator = useCallback(() => {
    if (isMorePages) {
      return <ActivityIndicator animating size="large" />;
    }
    return false;
  }, [isMorePages]);

  const pressHandler = () => navigation.push('ProfileScreen', {
    userLogin: login,
    isNavigationBackable: true,
  });

  const renderitem = ({ item }) => (
    <Pressable onPress={pressHandler}>
      <ProfileMainInfo name="" avatarUrl={item.avatar_url} login={item.login} />
    </Pressable>
  );

  const memoizedValue = useMemo(() => renderitem, []);
  const getMoreFollowers = () => {
    if (isMorePages) {
      getSearchFollowers(login, page + 1, isFollowingsList).then((res) => setFollowersList(
        [...followersList, ...res.data],
      ));
      return setPage(page + 1);
    }
    return false;
  };

  useEffect(() => {
    if (alreadyLoadedData) {
      setPage(Math.ceil(alreadyLoadedData.length / 10));
      setFollowersList(alreadyLoadedData);
    } else if (page === 1) {
      getSearchFollowers(login, page, isFollowingsList).then((res) => setFollowersList(res.data));
    }
  }, [login, isFollowingsList]);

  return (
    <View style={styles.container}>
      <FlatList
        removeClippedSubviews
        data={followersList}
        initialNumToRender={5}
        contentContainerStyle={styles.flatlistContainer}
        renderItem={memoizedValue}
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
