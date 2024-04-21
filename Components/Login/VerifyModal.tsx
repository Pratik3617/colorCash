import React, { useState, useEffect, useRef } from "react";
import { Alert, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Layout from "../../constants/Layout";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import axios from "axios";

interface OTPmodalProps {
  modalvisible: boolean;
  closemodal: () => void;
  email: string;
}

const VerifyModal: React.FC<OTPmodalProps> = ({ modalvisible, closemodal, email }) => {
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(''));
  
  const [timer, setTimer] = useState({ minutes: 2, seconds: 0 }); // Timer starts at 2 minutes
  const [resendEnabled, setResendEnabled] = useState(false);
  let interval: NodeJS.Timeout | undefined;

  let maskedEmail = "";
  const atIndex = email.indexOf('@');
  if (atIndex >= 0) {
    const domain = email.substring(atIndex); 
    const username = email.substring(0, atIndex); 
    const maskedUsername = username.substring(0, Math.min(5, username.length)) + '*'.repeat(Math.max(0, username.length - 5));
    maskedEmail = maskedUsername + domain;
  } else {
    maskedEmail = email.substring(0, 1) + '*'.repeat(Math.max(0, email.length - 1));
  }

  useEffect(() => {
    if (modalvisible) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer.seconds === 0) {
            if (prevTimer.minutes === 0) {
              clearInterval(interval);
              setResendEnabled(true);
              return { minutes: 0, seconds: 0 };
            } else {
              return { minutes: prevTimer.minutes - 1, seconds: 59 };
            }
          } else {
            return { minutes: prevTimer.minutes, seconds: prevTimer.seconds - 1 };
          }
        });
      }, 1000);
    } else {
      clearInterval(interval);
      setTimer({ minutes: 2, seconds: 0 });
      setResendEnabled(false);
    }

    return () => clearInterval(interval);
  }, [modalvisible]);

  const handleOTP = async() => {
    // console.log(Number(otpValues.join('')))
    if (otpValues.length===6) {
      try{
        const response = await axios.post("https://www.backend.colour-cash.com/api/v1/auth/verify-otp",{
          email: email,
          otp: Number(otpValues.join(''))
        },
        
        );
        if(response.status==200){
            closemodal();
            Alert.alert("Email Verified!!!")
        }
      }catch(error){
        Alert.alert("Wrong OTP!!!",error as string);
      }
      setOtpValues(Array(6).fill(''));
      closemodal();
    } else {
      Alert.alert("Please enter valid inputs!!!")
    }
  }

  const handleResendOTP = async() => {
    try{
      const response = await axios.post("https://www.backend.colour-cash.com/api/v1/auth/resend-otp",{
        email: email
      });
      if(response.status == 200){
        setTimer({ minutes: 2, seconds: 0 });
        setResendEnabled(false);
      
        clearInterval(interval); 
        interval = setInterval(() => {
          setTimer((prevTimer) => {
            if (prevTimer.seconds === 0) {
              if (prevTimer.minutes === 0) {
                clearInterval(interval);
                setResendEnabled(true);
                return { minutes: 0, seconds: 0 };
              } else {
                return { minutes: prevTimer.minutes - 1, seconds: 59 };
              }
            } else {
              return { minutes: prevTimer.minutes, seconds: prevTimer.seconds - 1 };
            }
          });
        }, 1000);
      }
    }catch(error){
      Alert.alert("OTP resend failed",error as string);
    }    
  }

  const handleChangeText = (text: string, index: number) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = text;
    setOtpValues(newOtpValues);

    if (text.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        onRequestClose={closemodal}
      >
        <TouchableWithoutFeedback onPress={closemodal}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalContent}>
              <Text style={styles.header}>An OTP has been send to your email id {maskedEmail} for verification!</Text>
                <Text style={styles.header}>Enter OTP</Text>
                <View style={styles.otpBox}>
                  <View style={styles.container}>
                      {otpValues.map((value, index) => (
                        <TextInput
                          key={index}
                          style={styles.input}
                          keyboardType="numeric"
                          maxLength={1}
                          onChangeText={(text) => handleChangeText(text, index)}
                          value={value}
                          ref={(ref) => {
                            inputRefs.current[index] = ref;
                          }}
                          returnKeyType={index === 5 ? 'done' : 'next'}
                          onSubmitEditing={() => {
                            if (index === 5) {
                              inputRefs.current[index]?.blur();
                            } else {
                              inputRefs.current[index + 1]?.focus();
                            }
                          }}
                        />
                      ))}
                  </View>
                </View>

                <TouchableOpacity onPress={handleResendOTP} disabled={!resendEnabled}>
                  <Text style={styles.resend}>{resendEnabled ? "Resend OTP" : `Resend OTP in ${timer.minutes}:${timer.seconds < 10 ? '0' : ''}${timer.seconds}`}</Text>
                </TouchableOpacity>

                <Text style={styles.otp} onPress={handleOTP}>Submit</Text>
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
    width: Layout.width*0.9,
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
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    
  },
  input: {
    width: 40,
    height: 40,
    borderRadius: 5,
    textAlign: 'center',
    marginHorizontal: 5,
    borderWidth: 2,
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
  },
  otpBox:{
    flexDirection: 'row',
    textAlign: 'center'
  },

  resend:{
    fontFamily: "Montserrat-Bold",
    color: Colors.primary
  }
});

export default VerifyModal;
