import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Canvas, Group, Circle } from '@shopify/react-native-skia';
import {
  blueCollor,
  DIMENSION_WIDTH,
  greenCollor,
  lightBlueCollor,
  lightYellowCollor,
  yellowCollor,
} from '../consts/theme';
import loadAllList from '../api/loadAllList';
import LinkedBox from './LinkedBox';
import { FollowersStatT } from '../../types';
import findDistance from '../helper/findDistance';

function FollowersStat({ followersCount, followingsCount, login }: FollowersStatT) {
  const maxRadius = DIMENSION_WIDTH / 4;
  const height = 250;
  const [followingsList, setFollowingsList] = useState([]);
  const [followersList, setFollowersList] = useState([]);
  const [isMutualListLoading, setisMutualListLoading] = useState(true);

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
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 20 }}>
        <LinkedBox
          text="followings"
          number={followingsCount}
          color={blueCollor}
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
          color={greenCollor}
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
          color={yellowCollor}
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
        style={{
          width: DIMENSION_WIDTH,
          height,
        }}
      >
        <Canvas style={{ flex: 1 }}>
          <Group blendMode="multiply">
            <Circle
              cx={cx1}
              cy={maxRadius}
              r={followingsR}
              color={lightBlueCollor}
            />
            <Circle
              cx={cx2}
              cy={maxRadius}
              r={followersR}
              color={lightYellowCollor}
            />
          </Group>
        </Canvas>
      </View>
      <Text style={{ padding: 20 }}>* The app can analyze only first 500 followers and 500 followings</Text>
    </View>
  );
}

export default FollowersStat;
