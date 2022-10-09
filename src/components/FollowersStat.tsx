import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Canvas, Group, Circle } from '@shopify/react-native-skia';
import {
  BLUECOLOR,
  DIMENSION_WIDTH,
  GREENCOLOR,
  LIGHTBLUECOLOR,
  LIGHTYELLOWCOLOR,
  YELLOWCOLOR,
} from '../consts/theme';
import loadAllList from '../api/loadAllList';
import LinkedBox from './LinkedBox';
import { FollowersStatT } from '../../types';
import findDistance from '../helper/findDistance';

function FollowersStat({ followersCount, followingsCount, login }: FollowersStatT) {
  const maxRadius = DIMENSION_WIDTH / 4;
  const [followingsList, setFollowingsList] = useState<{}[]>([]);
  const [followersList, setFollowersList] = useState<{}[]>([]);
  const [isMutualListLoading, setisMutualListLoading] = useState<boolean>(true);
  const mutualSubscribes = followingsList.filter((item) => followersList.find((el) => el.id === item.id));

  const followersRFunc = (isFollowings: boolean) => {
    if (isFollowings) {
      if (followingsCount > followersCount) {
        return maxRadius;
      }

      const adaptiveR = (followingsCount * maxRadius) / followersCount;
      if (adaptiveR < 10) {
        return 10;
      }
      return adaptiveR;
    }

    if (followersCount > followingsCount) {
      return maxRadius;
    }

    const adaptiveR = (followersCount * maxRadius) / followingsCount;
    if (adaptiveR < 10) {
      return 10;
    }
    return adaptiveR;
  };

  const followingsR = followersRFunc(true);
  const followersR = followersRFunc(false);
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
          color={BLUECOLOR}
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
          color={GREENCOLOR}
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
          color={YELLOWCOLOR}
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
              color={LIGHTBLUECOLOR}
            />
            <Circle
              cx={cx2}
              cy={maxRadius}
              r={followersR}
              color={LIGHTYELLOWCOLOR}
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
