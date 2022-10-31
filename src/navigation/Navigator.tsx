import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import FollowersListScreen from '../screens/FollowersListScreen';
import HeaderBar from '../components/HeaderBar';
import Mutual from '../screens/MutualListScreens/Mutual';
import Followers from '../screens/MutualListScreens/Followers';
import {
  LIGHTBLUECOLOR, LIGHTGREENCOLOR, LIGHTYELLOWCOLOR, MAINCOLOR,
} from '../consts/theme';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function Tabs(props) {
  const { params } = props.route;
  return (
    <Tab.Navigator
      backBehavior="none"
      overScrollMode="never"
      screenOptions={{
        tabBarStyle: { backgroundColor: MAINCOLOR },
      }}
      style={{ elevation: 0 }}
      initialRouteName="Mutual"
    >
      <Tab.Screen
        name="followings"
        options={{
          tabBarLabelStyle: { color: LIGHTBLUECOLOR },
          tabBarIndicatorStyle: {
            backgroundColor: LIGHTBLUECOLOR,
          },
          tabBarLabel: 'Only following',
        }}
        component={Followers}
        initialParams={{
          followersList: params.followersList,
          followingsList: params.followingsList,
          mutualSubscribes: params.mutualSubscribes,
          isFollowingsList: true,
        }}
      />
      <Tab.Screen
        name="Mutual"
        options={{
          tabBarLabelStyle: { color: LIGHTGREENCOLOR },

          tabBarIndicatorStyle: {
            backgroundColor: LIGHTGREENCOLOR,
          },
          tabBarLabel: 'Mutual',
        }}
        component={Mutual}
        initialParams={params}
      />
      <Tab.Screen
        name="followers"
        options={{
          tabBarLabelStyle: { color: LIGHTYELLOWCOLOR },

          tabBarIndicatorStyle: {
            backgroundColor: LIGHTYELLOWCOLOR,
          },
          tabBarLabel: 'Only followers',
        }}
        component={Followers}
        initialParams={{
          followersList: params.followersList,
          followingsList: params.followingsList,
          mutualSubscribes: params.mutualSubscribes,
          isFollowingsList: false,
        }}
      />
    </Tab.Navigator>
  );
}

function Navigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: HeaderBar,
      }}
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="FollowersListScreen" component={FollowersListScreen} />
      <Stack.Screen name="MutualListScreen" component={Tabs} />

      {/* <Stack.Screen name="MutualListScreen" component={MutualListScreen} /> */}
    </Stack.Navigator>
  );
}
export default Navigation;
