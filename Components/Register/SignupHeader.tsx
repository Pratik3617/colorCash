import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import FontSize from '../../constants/FontSize';
import Colors from '../../constants/Colors';
import Spacing from '../../constants/Spacing';


export class SignupHeader extends Component {
  render() {
    return (
      <SafeAreaView>
        <View style={styles.header}>
            <Text style={styles.gameName}>Colour-Cash</Text>
            <Text style={styles.headerText}> Create Account </Text>
            <Text style={styles.subText}>Create your account to explore!</Text>
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
      textAlign: "left",
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
        marginTop: Spacing*1.5,
        color: 'black',
        fontWeight: '600',
        fontFamily: 'Montserrat-Bold',
        marginBottom: Spacing*2
    }
});

export default SignupHeader
