import React, { useState } from "react";
import { Alert, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, ActivityIndicator } from "react-native";
import FontSize from "../../../constants/FontSize";
import Layout from "../../../constants/Layout";
import Colors from "../../../constants/Colors";
import { useAuth } from "../../../Context/AuthContext";

interface ChangePassProps {
    modalvisible: boolean;
    closemodal: () => void;
    token: string;
}

const WithdrawModal: React.FC<ChangePassProps> = ({ modalvisible, closemodal, token }) => {
    const [amount, setAmount] = useState(''); // Changed to string for TextInput
    const [loading, setLoading] = useState(false);
    const {Available_Balance} = useAuth();

    const handleWithdrawRequest = async () => {
        if(amount!=''){
            const amountValue = parseFloat(amount);
            if(Number(Available_Balance) < amountValue){
                Alert.alert("Your wallet doesn't have enough amount!!!");
                setAmount('');
                return;
            }else{
                if (isNaN(amountValue) || amountValue < 100) {
                    Alert.alert("Please enter a valid amount (>= 100)");
                    setAmount('');
                    return;
                }
            
                setLoading(true); // Enable loading
                try {
                    const response = await fetch("https://www.backend.colour-cash.com/api/v1/transaction/create-request", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify({ amount: amountValue })
                    });
            
                    if (response.status === 200) {
                        Alert.alert("Withdraw Request Submitted!");
                    } else if (response.status === 201) {
                        Alert.alert("Please add account details to withdraw!");
                    } else {
                        throw new Error('Failed to submit withdraw request');
                    }
                } catch (error) {
                    console.error('Failed to Submit Withdraw Request!',error);
                } finally {
                    setLoading(false); // Disable loading
                    setAmount(''); // Reset amount input
                    closemodal();
                }
            }
        }else{
            Alert.alert("Please enter amount!!!")
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
                        <TouchableWithoutFeedback onPress={() => { }}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalheader}>Amount Withdraw</Text>
                                <TextInput style={styles.textInput} placeholder="Amount" onChangeText={setAmount} value={amount} keyboardType="numeric" />
                                {loading && <ActivityIndicator color={Colors.primary} size="large" />}
                                <TouchableWithoutFeedback onPress={handleWithdrawRequest}>
                                    <View style={[styles.changePassButton, { backgroundColor: Colors.primary }]}>
                                        <Text style={styles.buttonText}>Withdraw</Text>
                                    </View>
                                </TouchableWithoutFeedback>
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
        width: Layout.width * 0.8,
        backgroundColor: "#dfe9ed",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    modalheader: {
        color: "#333",
        fontFamily: "Montserrat-Bold",
        fontSize: FontSize.large,
        textAlign: 'center',
        marginBottom: 20,
    },
    textInput: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginTop: 10,
        paddingHorizontal: 10,
        width: "70%",
        borderRadius: 10,
        fontFamily: "Montserrat-Regular",
    },
    changePassButton: {
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontFamily: "Montserrat-Bold",
        letterSpacing: 1,
        fontSize: FontSize.large,
    }
});

export default WithdrawModal;
