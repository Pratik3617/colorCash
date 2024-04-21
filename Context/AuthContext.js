// File: AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addEventListener } from "@react-native-community/netinfo";
import { Alert } from 'react-native';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [betPalyed,setBetPlayed] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [Available_Balance,setAvailableBalance] = useState(0);
  const [forgotPassToken,setforgotPassToken] = useState('');
  const [token,setToken] = useState('');
  const [userStatus,setUserstatus] = useState('');
  const [gamestatus, setGameStatus] = useState(true);
    
  const getUserToken = async() =>{
    try{
      const data = await AsyncStorage.getItem('token');
      setToken(data?JSON.parse(data):"");
    }catch(error){
        console.log("retreive token failed!!!",error)
    }
  } 

  const gameStatus = async() => {
    try {
        const response = await axios.get("https://www.backend.colour-cash.com/api/v1/game/get");
        if(response.status==200){
          setGameStatus(response.data['game']);
        }
    } catch (error) {
      console.log("error fetching game running status!!!",error)
    }
  }

  const getUserStatus = async () => {
    try {
        const response = await axios.get("https://www.backend.colour-cash.com/api/v1/user/status");
        if(response.status==200){
          if(response.data['data']==='blocked'){
            AsyncStorage.setItem('keepLoggedIn','');
          }
          setUserstatus(response.data['data']);
          // console.log("userstatus:",response.data['data'])
        }
    } catch (error) {
      console.log("Error fetching user status!!!",error);
    }
  }

  const showInternetError = () => {
    Alert.alert("Please switch on your internet connection!!!")
  }

  useEffect(() => {
    // Subscribe
    const unsubscribe = addEventListener(state => {
      if(state.isConnected == false){
        showInternetError();
      }
    });
    return (unsubscribe);
  }, []);
  

  useEffect(() => {
    // Fetch results initially and then every 5 seconds
    gameStatus();
    const intervalId = setInterval(gameStatus, 3000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Fetch results initially and then every 5 seconds
    getUserToken();
    getUserStatus();
    const intervalId1 = setInterval(getUserToken, 3000);
    const intervalId2 = setInterval(getUserStatus, 3000);
    return () => clearInterval(intervalId1,intervalId2);
  }, []);

  useEffect(()=>{
      getUserToken();
  },[])

  const getBalance = async() => {
    try{
      const response = await axios.get("https://www.backend.colour-cash.com/api/v1/wallet/balance",{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      if(response.status==200){
        setAvailableBalance(response.data['data']);
      }else{
        console.log("Error fetching wallet balance");
      }
    }catch(error){
      console.log("Failed to get balance",error);
    } 
  }

  useEffect(() => {
    getBalance();
    setBetPlayed(false);
  }, [betPalyed])
  
  
  const login = async() => {
    getBalance();
    setLoggedIn(true);
  };

  useEffect(() => {
    if(userStatus==="blocked")
      logout();
  }, [userStatus])
  
  const logout = () => {
    AsyncStorage.setItem("keepLoggedIn","");
    setToken('');
    AsyncStorage.setItem("username",'');
    AsyncStorage.setItem("token",'');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ setLoggedIn, isLoggedIn, login, logout, Available_Balance,getBalance,token,forgotPassToken,setforgotPassToken, gamestatus, userStatus, getUserStatus,getUserToken, setBetPlayed}}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
