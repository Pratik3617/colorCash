import React, { Component } from 'react'
import { Text, View, StyleSheet, SafeAreaView} from 'react-native'
import FontSize from '../../constants/FontSize';
import Colors from '../../constants/Colors';
import Spacing from '../../constants/Spacing';

export class LoginHeader extends Component {
  render() {
    return (
        <SafeAreaView>
            <View style={styles.header}>
                <Text style={styles.gameName}>Colour-Cash</Text>
                <Text style={styles.headerText}> Login Here </Text>
                <Text style={styles.subText}>Welcome back you've been Missed!</Text>
            </View>
        </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
    header:{
        marginTop: -20,
        alignItems:"center",
    },
    gameName:{
        fontFamily: "Montserrat-Bold",
        fontSize: 30,
        letterSpacing:1,
        marginBottom: 40,
        color: Colors.primary,
        textDecorationLine: "underline",
        textTransform: 'uppercase'
    },
    headerText:{
        fontSize: FontSize.xxLarge,
        color: Colors.primary,
        fontFamily: 'InriaSans-Bold',
    },
    subText:{
        fontSize:FontSize.large,
        textAlign: "center",
        width: "80%",
        color: 'black',
        fontFamily: 'Montserrat-Regular',
        marginTop: Spacing*1.5,
        marginBottom: Spacing*2
    }
});

export default LoginHeader
