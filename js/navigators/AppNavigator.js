import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from 'react-navigation-stack';
import HomeContainer from "../containers/HomeContainer";
import EditorContainer from "../containers/EditorContainer";
import SettingContainer from "../containers/SettingContainer";
import ArticlePreviewContainer from "../containers/ArticlePreviewContainer";
import ArticleUpdateContainer from "../containers/ArticleUpdateContainer";

import TabBarIcon from '../components/TabBarIcon';


const AppNavigator = createStackNavigator(
    {
        Main: HomeContainer,
        ArticlePreview: ArticlePreviewContainer,
        ArticleUpdate: ArticleUpdateContainer,
    }
);
AppNavigator.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};



const CreateArticleStack = createStackNavigator({
  Editor: EditorContainer,
});
CreateArticleStack.navigationOptions = {
  tabBarLabel: 'Create',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-add-circle' : 'md-add-circle'}
    />
  ),
};


const SettingsStack = createStackNavigator({
  Settings: SettingContainer,
});
SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const AppBottomTabNavigator = createBottomTabNavigator({
    AppNavigator,
    CreateArticleStack,
    SettingsStack,
});


export default AppBottomTabNavigator;
