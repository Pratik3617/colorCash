import React from "react";
import { TouchableOpacity, Text, View, StyleSheet, SafeAreaView,Platform } from 'react-native';
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";

interface ButtonProps{
    title : string;
    onPressFunction: () => void;
}

const FormButton: React.FC<ButtonProps> = ({title,onPressFunction}) => {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={onPressFunction}
          activeOpacity={1} 
        >
          <View style={styles.basicButton}>
            <Text style={styles.buttonText}>{title}</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container:{
      marginTop: 30,
    },
    basicButton: {
      backgroundColor: Colors.primary,
      borderRadius: 5,
    },
    buttonText: {
      fontFamily: "Montserrat-Bold",
      color: '#fff',
      textAlign:'center',
      fontSize: FontSize.large,
      letterSpacing: 1.5
    },
    button: {
      backgroundColor: Colors.primary,
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 5, 
      
    },
  });

export default FormButton;


