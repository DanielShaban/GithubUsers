import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import FollowersListScreen from '../screens/FollowersListScreen';
import HeaderBar from '../components/HeaderBar';
import Mutual from '../screens/MutualListScreens/Mutual';
import Followers from '../screens/MutualListScreens/Followers';
import Followings from '../screens/MutualListScreens/Followings';
import {
  BLUECOLOR, LIGHTBLUECOLOR, LIGHTGREENCOLOR, LIGHTYELLOWCOLOR, MAINCOLOR,
} from '../consts/theme';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

// { label: 'Only followings', value: '0', activeColor: BLUECOLOR },
// { label: 'Mutual', value: '1', activeColor: GREENCOLOR },
// { label: 'Only followers', value: '2', activeColor: YELLOWCOLOR },
// ];
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
        }}
        component={Followings}
        initialParams={params}
      />
      <Tab.Screen
        name="Mutual"
        options={{
          tabBarLabelStyle: { color: LIGHTGREENCOLOR },

          tabBarIndicatorStyle: {
            backgroundColor: LIGHTGREENCOLOR,
          },
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
        }}
        component={Followers}
        initialParams={params}
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
