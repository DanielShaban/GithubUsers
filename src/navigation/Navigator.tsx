import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import FollowersListScreen from '../screens/FollowersListScreen';
import HeaderBar from '../components/HeaderBar';
import MutualListScreen from '../screens/MutualListScreen';

const Stack = createStackNavigator();

function Navigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: HeaderBar,
      }}
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="FollowersListScreen" component={FollowersListScreen} />
      <Stack.Screen name="MutualListScreen" component={MutualListScreen} />
    </Stack.Navigator>
  );
}
export default Navigation;
