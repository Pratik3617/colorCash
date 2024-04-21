import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from "../../../constants/Colors";
import FontSize from "../../../constants/FontSize";
import Layout from "../../../constants/Layout";

interface ProfileTabProps {
    name: string;
    title: string;
    onpress: () => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({name,title,onpress}) => {
    return (
        <TouchableOpacity onPress={onpress} activeOpacity={1}>
            <View style={styles.container} >
            <Icon style={styles.icon} name={name} ></Icon>
            <Text style={styles.text} >{title}</Text>
            <Icon style={styles.arrow} name="keyboard-double-arrow-right"></Icon>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container:{
        height: Layout.height*0.075,
        padding: 10,
        backgroundColor: '#dfe9ed',
        marginVertical: 5,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 5,
        borderWidth: 1,
        borderColor: '#333'
    },
    icon:{
        fontSize: 25,
        marginRight: 20,
        color: "#333",
        borderRadius: 30,
        backgroundColor :'red',
        padding: 7,
        textAlign: 'center',
        alignItems: 'center',
        borderWidth: 2,
    },
    text:{
        flex: 1,
        color: '#333',
        fontSize: FontSize.medium,
        fontFamily: 'Montserrat-Bold'
    },
    arrow:{
        fontSize: FontSize.large,
        fontWeight: 'bold',
        color: Colors.primary
    }
})

export default ProfileTab;