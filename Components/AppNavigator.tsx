import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Login/LoginScreen';
import RegisterScreen from './Register/RegisterScreen';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import LoadingScreen from './Screens/LoadingScreen';


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Loading" component={LoadingScreen}/>
        <Stack.Screen name="Home" component={HomeScreen}/>        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
