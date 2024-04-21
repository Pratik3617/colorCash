import React, { useEffect } from 'react';
import { View, ImageBackground, Image, ActivityIndicator, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { useAuth } from '../../Context/AuthContext';

const LoadingScreen = () => {
  
  const {getBalance, getUserToken} = useAuth();
  useEffect(() => {
    
    getUserToken();
    getBalance();
  }, [])

  return (
    <ImageBackground
      source={require('../../assets/Images/background.png')} // Replace 'background.jpg' with your background image path
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Image
          source={require('../../assets/Images/icon.png')} // Replace 'icon.png' with your icon image path
          style={styles.icon}
        />
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 350,
    height: 350,
    marginBottom: 20,
  },
});

export default LoadingScreen;
