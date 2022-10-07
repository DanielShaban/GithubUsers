import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Canvas, Group, Circle } from '@shopify/react-native-skia';
import {
  blueColor,
  DIMENSION_WIDTH,
  greenColor,
  lightBlueColor,
  lightYellowColor,
  yellowColor,
} from '../consts/theme';
import loadAllList from '../api/loadAllList';
import LinkedBox from './LinkedBox';
import { FollowersStatT } from '../../types';
import findDistance from '../helper/findDistance';

function FollowersStat({ followersCount, followingsCount, login }: FollowersStatT) {
  const maxRadius = DIMENSION_WIDTH / 4;
  const [followingsList, setFollowingsList] = useState([]);
  const [followersList, setFollowersList] = useState([]);
  const [isMutualListLoading, setisMutualListLoading] = useState(true);
  // TODO: Types UseState
  const followingsRFunc = () => {
    if (followingsCount > followersCount) {
      return maxRadius;
    }

    const adaptiveR = (followingsCount * maxRadius) / followersCount;
    if (adaptiveR < 10) {
      return 10;
    }
    return adaptiveR;
  };
  const followersRFunc = () => {
    if (followersCount > followingsCount) {
      return maxRadius;
    }

    const adaptiveR = (followersCount * maxRadius) / followingsCount;
    if (adaptiveR < 10) {
      return 10;
    }
    return adaptiveR;
  };

  const mutualSubscribes = followingsList.filter((item) => followersList.find((el) => el.id === item.id));
  const followingsR = followingsRFunc();
  const followersR = followersRFunc();
  // TODO: Is it Right ???
  const findNeededIntersectionSFunc = () => (mutualSubscribes.length * Math.PI * followingsR ** 2) / followingsCount;
  const findNeededIntersectionS = findNeededIntersectionSFunc();

  const distance = findDistance(followingsR, followersR, findNeededIntersectionS) / 2;

  const cx1 = (DIMENSION_WIDTH / 2) - distance;
  const cx2 = (DIMENSION_WIDTH / 2) + distance;

  useEffect(() => {
    loadAllList(login, followersCount, followingsCount).then((res) => {
      setFollowingsList(res.followingsList);
      setFollowersList(res.followersList);
      setisMutualListLoading(false);
    });
  }, []);

  return (
    <View>
      <View style={styles.container}>
        <LinkedBox
          text="followings"
          number={followingsCount}
          color={blueColor}
          screenToNavigate="FollowersListScreen"
          usersData={{
            followingsCount,
            login,
            isFollowingsList: true,
            isNavigationBackable: true,
            alreadyLoadedData: followingsList,
          }}
        />
        <LinkedBox
          text="*You follow each other"
          number={mutualSubscribes.length}
          color={greenColor}
          isMutualListLoading={isMutualListLoading}
          screenToNavigate="MutualListScreen"
          usersData={{
            login,
            isNavigationBackable: true,
            followersList,
            followingsList,
            mutualSubscribes,
          }}
        />
        <LinkedBox
          text="followers"
          number={followersCount}
          color={yellowColor}
          screenToNavigate="FollowersListScreen"
          usersData={{
            followersCount,
            login,
            isFollowingsList: false,
            isNavigationBackable: true,
            alreadyLoadedData: followersList,
          }}
        />
      </View>
      <View
        style={styles.canvasContainer}
      >
        <Canvas style={styles.canvasStyle}>
          <Group blendMode="multiply">
            <Circle
              cx={cx1}
              cy={maxRadius}
              r={followingsR}
              color={lightBlueColor}
            />
            <Circle
              cx={cx2}
              cy={maxRadius}
              r={followersR}
              color={lightYellowColor}
            />
          </Group>
        </Canvas>
      </View>
      <Text style={styles.noticeStyle}>* The app can analyze only first 500 followers and 500 followings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  noticeStyle: {
    padding: 20,
  },
  canvasStyle: {
    flex: 1,
  },
  canvasContainer: {
    width: DIMENSION_WIDTH,
    height: 250,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
});

export default FollowersStat;
