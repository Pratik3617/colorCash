import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FontSize from '../../../constants/FontSize';
import Colors from '../../../constants/Colors';

interface HomeButtonProps{
    onBconePress: ()=> void;
    onEmerdPress: () => void;
    isBconeFocused: boolean;
}

const HomeButton: React.FC<HomeButtonProps> = ({onBconePress,onEmerdPress,isBconeFocused}) =>{
    const isEmerdFocused = !isBconeFocused;

    return (
        <View style={styles.block}>
            <Text style={[styles.game1B, isBconeFocused && styles.focusedText1]} onPress={onBconePress}>Bcone</Text>
            <Text style={[styles.game1B, isEmerdFocused && styles.focusedText1]} onPress={onEmerdPress}>Emerd</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    block:{
        display:"flex",
        flexDirection: "row",
        textAlign: "center",
        justifyContent: 'space-between',
        padding:10,
        marginTop: 10
    },
    game1B:{
        flex: 1,
        textAlign: "center",
        paddingBottom: 5,
        color:"#333",
        fontFamily: "Montserrat-Bold",
        fontSize: FontSize.medium,
        letterSpacing:1
    },
    focusedText1:{
        borderBottomWidth : 3,
        borderBottomColor: Colors.primary,
    },
    // game2B:{
    //     flex: 1,
    //     textAlign: "center",
    //     paddingBottom: 5,
    //     color:"#333",
    //     fontWeight:'bold',
    //     fontSize: FontSize.medium,
    //     letterSpacing:1
    // },
    // focusedText2:{
    //     borderBottomWidth : 3,
    //     borderBottomColor: Colors.primary
    // },
})

export default HomeButton;