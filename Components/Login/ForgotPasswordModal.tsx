import React, { useState } from "react";
import { Alert, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Layout from "../../constants/Layout";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import ModalInput from "./ModalInput";
import axios from "axios";

interface ForgotPassProps{
    modalvisible: boolean;
    closemodal: ()=> void;
    openmodal: ()=> void;
    onStateChange: (text:string)=> void;
}

const ForgotPasswordModal: React.FC<ForgotPassProps> = ({modalvisible,closemodal,openmodal,onStateChange}) => {
    const [email,setEmail] = useState('');

    const validateEmail = (email: string) => {
        return email.includes('@');
    };

    const handleSendOTP = async() => {
        if(validateEmail(email)){
          try{
              const response = await axios.post("https://www.backend.colour-cash.com/api/v1/auth/forgot-password",{
                email: email
              });
              if(response.status == 200){
                setEmail('');
                closemodal();
                openmodal();
              }else if(response.status==404){
                Alert.alert("Email not registered!!!");
                setEmail("");
              }
          }catch(error){
            Alert.alert("Please enter valid email",error as string);
            setEmail('');
          }
        }else{
            console.error("Enter valid Email Id!!!",);
        }
    }

    const handleChange = (text:string) => {
      setEmail(text);
      // Call the callback function to pass the state to the parent
      onStateChange(text);
    };

    return (
        <SafeAreaView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalvisible}
                onRequestClose={closemodal}
            >
                <TouchableWithoutFeedback onPress={closemodal}>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback onPress={() => {}}>
                    <View style={styles.modalContent}>
                    <Text style={styles.header}>Forgot Password?</Text>
                    <ModalInput placeholder="Enter Registered Email" onChangeText={handleChange} iconName="email" value={email}/>

                    <Text style={styles.otp} onPress={handleSendOTP}>Send OTP</Text>
                        
                    </View>
                    </TouchableWithoutFeedback>
                </View>
                </TouchableWithoutFeedback>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", 
      },
      modalContent: {
        width: Layout.width*0.8,
        backgroundColor: "#dfe9ed",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
      },
      modalheader:{
        color: "#333",
        fontFamily: "Montserrat-Bold",
        fontSize: FontSize.xLarge
      },
      inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 2,
        borderRadius: 7,
        backgroundColor: "#f1f3ff",
      },
      inputContainerFocused: {
        borderWidth: 2,
        borderColor: Colors.primary,
      },
      input: {
        fontFamily: "Montserrat-Regular",
        fontSize: 14,
        color: '#333',
        width: "80%",
        marginLeft: 8,
      },
      icon: {
        marginRight: 10,
        color: Colors.primary
      },
      header:{
        color: "#333",
        fontFamily: "Montserrat-Bold",
        fontSize: FontSize.medium,
        marginBottom: 10
      },
      otp:{
        marginTop: 15,
        backgroundColor: Colors.primary,
        color: "white",
        letterSpacing: 1,
        padding: 10,
        borderRadius: 10,
        fontFamily: "Montserrat-Bold",
      }
})

export default ForgotPasswordModal;