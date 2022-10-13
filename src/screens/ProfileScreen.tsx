import {
  View, Text, StyleSheet, ScrollView, ActivityIndicator,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import LinkedText from '../components/LinkedText';
import StyledSearchBar from '../components/HeaderBar/StyledSearchBar';
import { MAINCOLOR } from '../consts/theme';
import { getSearchUsers } from '../api/apiReq';
import { debounce } from '../helper/debounce';
import FollowersStat from '../components/FollowersStat';
import MemorizedProfileMainInfo from '../components/ProfileMainInfo';
import NoticeText from '../components/NoticeText';

function ProfileScreen() {
  const route = useRoute();
  // eslint-disable-next-line camelcase
  const [userData, setUserData] = useState<{
    name?: string;
    login?: string;
    avatarUrl?: string;
    bio?: string;
    blog?: string;
    followers?: number;
    following?: number;
  }>({});
  const getDataAndPutInState = ({ data }) => {
    setIsSuchUser(false);
    setUserData({
      name: data?.name,
      login: data?.login,
      avatarUrl: data?.avatar_url,
      bio: data?.bio,
      blog: data?.blog,
      followers: data?.followers,
      following: data?.following,
      id: data?.id,
    });
    return setIsLoading(false);
  };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [isSuchUser, setIsSuchUser] = useState(false);

  const userLogin: string = route.params?.userLogin;

  const handleChange = (enteredText: string) => {
    setText(enteredText);
    debouncedSave(enteredText);
    if (enteredText.length <= 3) {
      setIsSuchUser(false);
    }
  };

  const debouncedSave = useCallback(
    debounce((entertext: string) => {
      if (entertext.length >= 3) {
        setIsLoading(true);
        return getSearchUsers(entertext)
          .then(getDataAndPutInState)
          .catch(() => {
            setIsLoading(false);
            setIsSuchUser(true);
            setUserData({});
          });
      }
      if (entertext.length < 3) {
        return setUserData({});
      }
    }, 1000),
    [],
  );

  useEffect(() => {
    if (userLogin) {
      getSearchUsers(userLogin).then(getDataAndPutInState);
    }
  }, [route]);

  return (
    <View style={styles.container}>
      {!userLogin && (
        <View style={styles.searchbarContainer}>
          <StyledSearchBar text={text} handleChange={handleChange} />
        </View>
      )}
      {/* Searchbar only in first profile screen */}
      <ScrollView style={styles.container}>
        {isLoading && <ActivityIndicator animating size="large" />}
        {!isLoading
          && userData
          && Object.keys(userData).length !== 0
          && Object.getPrototypeOf(userData) === Object.prototype && (
            <View>
              <View style={styles.profileContainer}>
                <MemorizedProfileMainInfo name={userData.name} login={userData.login} avatarUrl={userData.avatarUrl} />
                {userData.bio && (
                  <View style={styles.paddingBottom}>
                    <Text style={styles.textDescription}>{userData.bio}</Text>
                  </View>
                )}

                <View style={styles.paddingBottom}>
                  {userData.blog && <LinkedText href={userData.blog} iconName="link" text={userData.blog} />}
                </View>
              </View>
              <FollowersStat
                followersCount={userData.followers}
                followingsCount={userData.following}
                login={userData.login}
              />
            </View>
        )}
        {text.length < 3 && !userLogin && <NoticeText text="Minimum 3 characters to search" />}
        {isSuchUser && <NoticeText text="No such users" />}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  PSStyle: {
    padding: 20,
  },
  profileContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchbarContainer: {
    backgroundColor: MAINCOLOR,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paddingBottom: {
    paddingBottom: 20,
  },
  textDescription: {
    fontSize: 16,
    lineHeight: 25,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
});

export default ProfileScreen;
