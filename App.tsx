import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import AppNavigator from './Components/AppNavigator';
import 'react-native-gesture-handler';
import BottomTabs from './Components/BottomTab';
import { useAuth } from './Context/AuthContext';
import LoadingScreen from './Components/Screens/LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App(): React.JSX.Element {
  const { isLoggedIn, setLoggedIn, logout } = useAuth();
  const [timer, setTimer] = useState(true);
  const [loading, setLoading] = useState(false);

  

  const getUserInfo = async () => {
    try {
      const data = await AsyncStorage.getItem('keepLoggedIn');
      setLoggedIn(data ? Boolean(data) : false);
    } catch (error) {
      console.error('automatic login failed', error);
      logout();
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false); // Disable loading screen after 4 seconds
      }, 4000);
      return () => clearTimeout(timer);
    } else {
      setLoading(false); // Ensure loading is false when not logged in
      setTimer(true); // Reset timer when not logged in
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (!timer) {
      setLoading(false);
    }
  }, [timer]);

  return (
    <SafeAreaView style={styles.container}>
      {!isLoggedIn ? <AppNavigator /> : loading ? <LoadingScreen /> : <BottomTabs />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
