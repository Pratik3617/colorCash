import React, { useState } from "react";
import { Alert, Modal, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View, ActivityIndicator } from "react-native";
import FontSize from "../../../constants/FontSize";
import Layout from "../../../constants/Layout";
import Input from "./Input";
import Colors from "../../../constants/Colors";
import { useAuth } from "../../../Context/AuthContext";

interface ChangePassProps{
    modalvisible: boolean;
    closemodal: ()=> void;
    token: string;
}

const ChangePassModal: React.FC<ChangePassProps> = ({ modalvisible, closemodal, token }) => {
    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [loading, setLoading] = useState(false);
    const {logout} = useAuth();

    const validateInputs = () => {
        return validatePassword(currentPass) && validatePassword(newPass) && validatePassword(confirmPass);
    };

    const validatePassword = (password: string) => {
        return password.length >= 6;
    };

    const handleChangePassword = async () => {
        if (validateInputs()) {
            setLoading(true);
            try {
                const response = await fetch("https://www.backend.colour-cash.com/api/v1/auth/update-password", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        passwordCurrent: currentPass,
                        password: newPass,
                        passwordConfirm: confirmPass
                    })
                });
    
                if (response.status === 200) {
                    Alert.alert("Password changed successfully!!!");
                    logout();
                } else {
                    Alert.alert("Please enter correct details");
                }
            } catch (error) {
                console.error('Password Change Failed. Please enter correct details', error);
            } finally {
                setLoading(false);
                setCurrentPass('');
                setNewPass('');
                setConfirmPass('');
                closemodal();
            }
        } else {
            setCurrentPass('');
            setNewPass('');
            setConfirmPass('');
            Alert.alert("Password Change Failed! Please Check Inputs")
        }
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
                                <Text style={styles.modalheader}>Change Password</Text>
                                <Input placeholder="Current Password" onChangeText={(text) => setCurrentPass(text)} value={currentPass} />
                                <Input placeholder="New Password" onChangeText={(text) => setNewPass(text)} value={newPass} />
                                <Input placeholder="Confirm Password" onChangeText={(text) => setConfirmPass(text)} value={confirmPass} />
                                {loading && (
                                    <ActivityIndicator size="large" color={Colors.primary} />) }
                                <Text style={styles.changePassButton} onPress={handleChangePassword}>Change Password</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </SafeAreaView>
    );
};

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
        fontSize: FontSize.xLarge,
        textAlign: 'center'
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
    changePassButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: Colors.primary,
        color: "white",
        fontFamily: "Montserrat-Bold",
        letterSpacing: 1,
        borderRadius: 10,
        fontSize: FontSize.large
    }
});

export default ChangePassModal;
