import React, { useState } from "react";
import { Alert, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import FontSize from "../../../constants/FontSize";
import Layout from "../../../constants/Layout";
import Colors from "../../../constants/Colors";
import axios from "axios";


interface ChangePassProps{
    modalvisible: boolean;
    closemodal: ()=> void;
    token: string
}

const AccountDetails: React.FC<ChangePassProps> = ({modalvisible,closemodal,token}) => {
    const [upi,setUpi] = useState('');
    const [account,setAccount] = useState('');
    const [holderName,setHolderName] = useState('');
    const [ifsc,setIfsc] = useState('');

    const handleAccountDetails  = async() => {
        // console.log(token)
        if(upi.length > 6 && account.length > 10 && holderName.length>6 && ifsc.length > 6){
            try{
                const response = await axios.post("https://www.backend.colour-cash.com/api/v1/account/create",{
                    upiId: upi,
                    account: account,
                    holderName: holderName,
                    ifsc: ifsc,
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })

                if(response.status == 200){
                    Alert.alert("Account Details Added succesfully!!!");
                }
            }catch(error){
                Alert.alert('Failed to add Account Details!!!',error as string);
            }
            setUpi('');
            setAccount('');
            setHolderName('');
            setIfsc('')
            closemodal();
        }else{
            setUpi('');
            setAccount('');
            setHolderName('');
            setIfsc('')
            Alert.alert("Failed to add Account details! Please Check Inputs")
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
                            <Text style={styles.modalheader}>Add Account Details For Withdraw Request</Text>
                            <TextInput style={styles.textInput} placeholder="Enter UPI Id" onChangeText={(text)=>setUpi(text)} value={upi}/>
                            <TextInput style={styles.textInput} placeholder="Enter account number" onChangeText={(text)=>setAccount(text)} value={account}/>
                            <TextInput style={styles.textInput} placeholder="Enter account holder name" onChangeText={(text)=>setHolderName(text)} value={holderName}/>
                            <TextInput style={styles.textInput} placeholder="Enter IFSC code" onChangeText={(text)=>setIfsc(text)} value={ifsc}/>
                            <Text style={styles.changePassButton} onPress={handleAccountDetails}>Add Details</Text>
                            
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
        fontSize: FontSize.large,
        textAlign: 'center',
        marginBottom: 20
      },
      textInput: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginTop: 10,
        paddingHorizontal: 10,
        width: "100%",
        borderRadius: 10,
        fontFamily: "Montserrat-Regular",
      },
      changePassButton:{
        marginTop: 10,
        padding: 10,
        backgroundColor: Colors.primary,
        color: "white",
        fontFamily: "Montserrat-Bold",
        letterSpacing: 1,
        borderRadius: 10,
        fontSize: FontSize.large
      }
})

export default AccountDetails;