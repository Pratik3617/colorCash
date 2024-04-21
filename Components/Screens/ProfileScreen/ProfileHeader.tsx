import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from "../../../constants/Colors";
import FontSize from "../../../constants/FontSize";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ProfileHeader(){
    const [username,setUsername] = useState('');

    const getUsername = async() => {
        try {
            const data =  await AsyncStorage.getItem("username");
            setUsername(data?data:"")
        } catch (error) {
            console.log("Error fetching username!!!")
        }
    }
    useEffect(()=>{
        getUsername();
    },[username]);

    return(
        <View style={styles.container}>
            <Icon name="person" style={styles.icon}></Icon>
            <Text style={styles.name}>{username}</Text>
        </View>
    ); 
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    icon:{
        fontSize: 65,
        color: Colors.primary,
        borderRadius: 20,
        backgroundColor: "#dfe9ed",
        elevation: 5
    },
    name:{
        marginTop: 10,
        fontSize: FontSize.medium,
        color: "#333",
        fontFamily: 'Montserrat-Bold',
        letterSpacing: 1
    }
})

export default ProfileHeader;