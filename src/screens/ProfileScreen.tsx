import {
  View, Text, StyleSheet, ScrollView, ActivityIndicator,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import LinkedText from '../components/LinkedText';
import ProfileMainInfo from '../components/ProfileMainInfo';
import StyledSearchBar from '../components/HeaderBar/StyledSearchBar';
import { mainColor } from '../consts/theme';
import { getSearchUsers } from '../api/apiReq';
import { debounce } from '../helper/debounce';
import FollowersStat from '../components/FollowersStat';

function ProfileScreen() {
  const route = useRoute();
  const [userData, setUserData] = useState<{}>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const userLogin: string = route.params?.userLogin;

  const handleChange = (enteredText: string) => {
    setText(enteredText);
    debouncedSave(enteredText);
  };

  const debouncedSave = useCallback(
    debounce((entertext: string) => {
      if (entertext.length >= 3) {
        setIsLoading(true);
        return getSearchUsers(entertext).then((res) => {
          setUserData(res.data);
          setIsLoading(false);
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
      getSearchUsers(userLogin).then((res) => setUserData(res.data));
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
        {!isLoading && userData
          && Object.keys(userData).length !== 0
          && Object.getPrototypeOf(userData) === Object.prototype && (
            <View>
              <View style={styles.profileContainer}>
                <ProfileMainInfo
                  name={userData.name}
                  login={userData.login}
                  avatarUrl={userData.avatar_url}
                />
                {userData.bio && (
                  <View style={styles.paddingBottom}>
                    <Text style={styles.textDescription}>{userData.bio}</Text>
                  </View>
                )}

                <View style={styles.paddingBottom}>
                  {userData.blog && (
                    <LinkedText
                      href={userData.blog}
                      iconName="link"
                      text={userData.blog}
                    />
                  )}
                </View>
              </View>
              <FollowersStat
                followersCount={userData.followers}
                followingsCount={userData.following}
                login={userData.login}
              />
            </View>
          )}
        {text.length < 3 && !userLogin && (
          <Text style={styles.PSStyle}>
            Minimum 3 characters to search
          </Text>
        )}
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
    backgroundColor: mainColor,
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
