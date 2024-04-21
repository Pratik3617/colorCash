import React, { useEffect } from "react";
import { ImageBackground, StyleSheet, Text } from "react-native";
import FontSize from "../../constants/FontSize";
import AccountContent from "./AccountContent";
import Colors from "../../constants/Colors";

function AccountHistory(){
    
    return (
        <ImageBackground style={styles.container} source={require('../../assets/Images/background.png')}>
            <Text style={styles.header}>
                Account History
            </Text>
            <AccountContent/>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 10,
    },
    header:{
        fontFamily: "Montserrat-Bold",
        textAlign:'center',
        fontSize: FontSize.xxLarge,
        marginBottom: 20,
        color: Colors.primary
    }
})

export default AccountHistory;