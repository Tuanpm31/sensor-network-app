import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Layout, Text, Icon, IconProps } from '@ui-kitten/components';
import { HomeScreen } from '../screens/HomeScreen';
import { ChartScreen } from '../screens/ChartScreen';
import { TemperatureDetails } from '../screens/TemperatureDetails';
import { HumidityDetails } from '../screens/HumidityDetails';
import { DustDetails } from '../screens/DustDetails';

const { Navigator, Screen } = createBottomTabNavigator();


const HomeIcon = (props: IconProps) => (
  <Icon {...props} name='home-outline' />
);

const ChartsIcon = (props: IconProps) => (
  <Icon {...props} name='activity-outline' />
);

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title='HOME' icon={HomeIcon} />
    <BottomNavigationTab title='CHARTS' icon={ChartsIcon} />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='Home' component={HomeNavigation} />
    <Screen name='Chart' component={ChartScreen} />
  </Navigator>
);

const StackHomeNavigation = createStackNavigator();

const HomeNavigation = (): React.ReactElement => (
  <StackHomeNavigation.Navigator>
    <StackHomeNavigation.Screen name='Home' component={HomeScreen} options={{ title: "Thông số  môi trường" }} />
    <StackHomeNavigation.Screen name="TemperatureDetails" component={TemperatureDetails} options={{ title: "Nhiệt độ chi tiết" }} />
    <StackHomeNavigation.Screen name="HumidityDetails" component={HumidityDetails} options={{ title: "Độ ẩm chi tiết" }} />
    <StackHomeNavigation.Screen name="DustDetails" component={DustDetails} options={{ title: "Nồng độ bụi chi tiết" }} />
  </StackHomeNavigation.Navigator>
)

export const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);
