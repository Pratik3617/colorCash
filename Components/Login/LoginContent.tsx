import React, { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import FontSize from '../../constants/FontSize';
import Colors from '../../constants/Colors';
import FormButton from '../Register/FormButton';
import FloatingLabelTextInput from '../Register/Input';
import { useAuth } from '../../Context/AuthContext';
import ForgotPasswordModal from './ForgotPasswordModal';
import OTPmodal from './OTPmodal';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VerifyModal from './VerifyModal';
import CreatePassModal from './createPassModal';

function LoginContent(props: { navigation: { navigate: (arg0: string) => void; }; }) {
    const { login } = useAuth();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [childEmail, setChildEmail] = useState('');

    const [modalVisible, setModalVisible] = useState(false);
    const [verifyModal, setVerifyModal] = useState(false);
    const [otpModalVisible, setOtpModalVisible] = useState(false);   
    const [createPassModalVisible, setCreatePassModalVisible] = useState(false);    

    const [loading, setLoading] = useState(false);

    const handleChildStateChange = (newState: string) => {
        setChildEmail(newState);
    };

    const openVerifyModal = () => {
        setVerifyModal(true);
    }
    const closeVerifyModal = () => {
        setVerifyModal(false);
    }

    const openOTPModal = () => {
        setOtpModalVisible(true);
    }
    const closeOTPModal = () => {
        setOtpModalVisible(false);
    }

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const openCreatePassModal = () => {
        setCreatePassModalVisible(true);
    }

    const closeCreatePassModal = () => {
        setCreatePassModalVisible(false);
    };

    const handleResendOTP = async () => {
        try {
            const response = await axios.post("https://www.backend.colour-cash.com/api/v1/auth/resend-otp", {
                email: email
            });
            if (response.status === 200) {
                console.log("OTP send successfully!!!");
            }
        } catch (error) {
            Alert.alert("OTP resend failed", error as string);
        }
    }

    const handleLogin = async () => {
        if (validateInputs()) {
            try {
                setLoading(true); // Set loading to true before API call

                const response = await fetch("https://www.backend.colour-cash.com/api/v1/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                });

                const responseData = await response.json();

                setLoading(false); // Set loading to false after API call

                if (response.status === 200) {
                    login();
                    // console.log(responseData);
                    const parts = email.split("@");
                    const username = parts[0];
                    AsyncStorage.setItem("username", username);
                    AsyncStorage.setItem("keepLoggedIn", JSON.stringify(true));
                    const token = responseData.token;
                    AsyncStorage.setItem("token", JSON.stringify(token));
                    props.navigation.navigate('Home');
                } else if (response.status === 201) {
                    handleResendOTP();
                    openVerifyModal();
                } else if (response.status === 404) {
                    Alert.alert("User blocked!!! Please contact at - support@colour-cash.com.");

                }else if(response.status == 401){
                    Alert.alert("Incorrect email or password!!!")
                }
            } catch (error) {
                setLoading(false);
                Alert.alert(
                    'Login Failed!',
                    error as string || 'An error occurred while logging in.'
                );
            }
        } else {
            Alert.alert('Login failed. Please Check Your Inputs');
        }
    }

    const navigateToRegister = () => {
        props.navigation.navigate('Register');
    };

    const validateInputs = () => {
        return validateEmail(email) && validatePassword(password);
    };

    const validateEmail = (email: string) => {
        return email.includes('@');
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
            <FloatingLabelTextInput placeholder="Enter Password" iconName="lock" isSecure={true}
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            <Text style={styles.pwd} onPress={openModal}>Forgot Password?</Text>
            <FormButton title="Sign In" onPressFunction={handleLogin}/>

            {loading && <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />}

            <View style={styles.login}>
                <Text style={styles.text1}>Create an account?</Text>
                <Text style={styles.text2} onPress={navigateToRegister}>Sign Up</Text>
            </View>

            <ForgotPasswordModal modalvisible={modalVisible} closemodal={closeModal} openmodal={openOTPModal} onStateChange={handleChildStateChange}/> 
            <OTPmodal modalvisible={otpModalVisible} closemodal={closeOTPModal} openmodal={openCreatePassModal} email={childEmail}/>
            <CreatePassModal modalvisible={createPassModalVisible} closemodal={closeCreatePassModal}/>

            {verifyModal ? <VerifyModal modalvisible={verifyModal} closemodal={closeVerifyModal} email={email} /> : null}

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    text:{
        textAlign: 'right',
        fontWeight: '700',
        color: '#333',
        marginVertical: 10,
        fontSize: FontSize.medium
    },
    container:{
        width: "100%",
        height:"100%",
    },
    login:{
        marginTop: 20,
        alignItems: 'center',
    },
    pwd:{
        marginVertical: 10,
        textAlign: 'right',
        color: Colors.primary,
        fontFamily: 'Montserrat-Bold',
        letterSpacing: 1,
        fontSize: FontSize.medium
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

export default LoginContent;
