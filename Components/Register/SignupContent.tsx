import React, { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import FloatingLabelTextInput from './Input';
import FormButton from './FormButton';
import FontSize from '../../constants/FontSize';
import Colors from '../../constants/Colors';
import OTPmodal from './OTPmodalRegister';

function SignupContent(props: { navigation: { navigate: (arg0: string) => void } }) {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [otpModalVisible, setOtpModalVisible] = useState(false);   
  const [loading, setLoading] = useState(false);

  const openOTPModal = () => {
      setOtpModalVisible(true);
  }

  const closeOTPModal =()=>{
      setOtpModalVisible(false);
  }

  const navigateToLogin = () => {
    props.navigation.navigate('Login');
  };

  const handleSignUp = async () => {
    if (validateInputs()) {
        setLoading(true); // Set loading to true before API call
        try {
            const response = await fetch("https://www.backend.colour-cash.com/api/v1/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    phone: phoneNumber
                })
            });

            if (response.status === 201) {
                const responseData = await response.json();
                // console.log(responseData);
                openOTPModal();
            } else if (response.status === 400) {
                Alert.alert("User with this email or phone number has already been registered!!!");
            }
        } catch (error) {
            Alert.alert("Error: Failed to Sign up", error as string || 'An error occurred while signing up.');
        } finally {
            setLoading(false);
        }
    } else {
        Alert.alert('Sign up failed. Please check your inputs.');
    }
  };

  const validateInputs = () => {
    return validateEmail(email) && validatePhoneNumber(phoneNumber) && validatePassword(password);
  };

  const validateEmail = (email: string) => {
    return email.includes('@');
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    return phoneNumber.length === 10 && /^\d+$/.test(phoneNumber);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FloatingLabelTextInput placeholder="Enter Email Address" iconName="email" isSecure={false} 
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <FloatingLabelTextInput placeholder="Enter Phone Number" iconName="phone" isSecure={false}
        onChangeText={(text) => setPhoneNumber(text)}
        value={phoneNumber}
      />
      <FloatingLabelTextInput placeholder="Enter Password" iconName="lock" isSecure={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />                
      <FormButton title="Sign Up" onPressFunction={handleSignUp}/>

      {loading && <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />}

      <View style={styles.login}>
          <Text style={styles.text1}>Already have an account?</Text>
          <Text style={styles.text2} onPress={navigateToLogin}>Sign In</Text>
      </View>

      <OTPmodal modalvisible={otpModalVisible} closemodal={closeOTPModal} onpress={navigateToLogin} email={email}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container:{
        width: "100%",
        height:"100%",
    },
    login:{
        marginTop: 20,
        alignItems: 'center',
    },
    text1:{
        fontSize: FontSize.medium,
        color: "#333",
        fontFamily: 'Montserrat-Regular',
    },
    text2:{
        marginTop: 10,
        fontSize: FontSize.large,
        color: Colors.primary,
        fontFamily: 'Montserrat-Bold',
    },
    loader: {
        marginTop: 20,
    }
});

export default SignupContent;
