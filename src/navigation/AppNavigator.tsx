/*
 * Created by Asad on 11 Sep 2024
 */

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CreateJobScreen from '../screens/CreateJobScreen';
import labels from '../constants/labels';

export type StackParamList = {
  Home: undefined;
  CreateJob: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

const AppNavigator: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{title: labels.homeScreen.jobListTitle}}
    />
    <Stack.Screen
      name="CreateJob"
      component={CreateJobScreen}
      options={{title: labels.createJobScreen.title}}
    />
  </Stack.Navigator>
);

export default AppNavigator;
