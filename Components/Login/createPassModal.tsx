import React, { useState, useEffect } from "react";
import { Alert, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Layout from "../../constants/Layout";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";

interface createPassmodalProps {
  modalvisible: boolean;
  closemodal: () => void;
}

const CreatePassModal: React.FC<createPassmodalProps> = ({ modalvisible, closemodal}) => {
  const [newpass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const {forgotPassToken} = useAuth();
  
    const handleCreateNewPass = async() => {
        if(newpass.length > 6 || confirmPass.length > 6){
            try{
                const response = await axios.post("https://www.backend.colour-cash.com/api/v1/auth/change-password",{
                    password: newpass,
                    passwordConfirm: confirmPass
                },
                {
                    headers:{
                        Authorization: `Bearer ${forgotPassToken}`
                    }
                });
                if(response.status==200){
                    closemodal();
                    Alert.alert("Password changed Successfully!!!");
                }
            }catch(error){
                // console.log("forgot password",error)
                Alert.alert("Password changed Failed!!!",error as string);
            }
            setNewPass('');
            setConfirmPass('');
        }else{
            Alert.alert("Please Enter Password of length greater than 6");
            setNewPass('');
            setConfirmPass('');
        }
    }

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
                <Text style={styles.header}>Create New Password</Text>
                <View style={styles.inputBox}>
                  <TextInput style={styles.input} placeholder="New Password" secureTextEntry onChangeText={(text)=>setNewPass(text)} value={newpass}/>
                  <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry onChangeText={(text)=>setConfirmPass(text)} value={confirmPass}/>
                </View>

                <Text style={styles.otp} onPress={handleCreateNewPass}>Submit</Text>
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

  input: {
    fontFamily: "Montserrat-Regular",
    fontSize: 14,
    color: '#333',
    width: Layout.width*0.7,
    marginLeft: 8,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 10,
    backgroundColor: "white",
    paddingHorizontal: 10,
    marginBottom: 10
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
  inputBox:{
    flexDirection: 'column',
    textAlign: 'center',
    marginTop: 10
  },

});

export default CreatePassModal;
