import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import ResultScreen from "./Screens/WinScreen/ResultScreen";
import ProfileScreen from "./Screens/ProfileScreen/ProfileScreen";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from "../constants/Colors";
import AccountHistory from "./AccountHistory/AccountHistory";


const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({focused}) => {
            let iconName = "";
            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Win") {
              iconName = "emoji-events";
            } else if (route.name === "Profile") {
              iconName = "manage-accounts";
            }else if(route.name == "Account"){
              iconName = "account-box"
            }
            return <Icon name={iconName} size={36} color={focused ? Colors.primary : "#333"} />;
          },

          tabBarStyle: {
            position: "absolute",
            bottom: 5,
            left: 10,
            right: 10,
            backgroundColor: "#ffffff",
            borderRadius: 15,
            height: 70,
            ...styles.shadow,
          },
          tabBarLabelStyle:{
            fontSize: 13,
            fontFamily: 'Montserrat-Bold',
            marginTop: -15,
            marginBottom: 10
          },
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: "#333",
        })}
        
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Win" component={ResultScreen} />
        <Tab.Screen name="Account" component={AccountHistory} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  shadow:{
    shadowColor: "#333",
    shadowOffset:{
      width:0,
      height: 10
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  }
})

export default BottomTabs;
