import React from "react";
import { ImageBackground,StyleSheet,View} from 'react-native';
import SignupHeader from "./SignupHeader";
import SignupContent from "./SignupContent";

function RegisterScreen(props: { navigation: { navigate: (arg0: string) => void; }; }): JSX.Element{
    return (
        <ImageBackground source={require('../../assets/Images/background.png')}>
            <View style={styles.container}>
                <SignupHeader/>
                <SignupContent navigation={props.navigation}/>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container:{
        marginTop: 20,
        paddingHorizontal: 15,
        paddingVertical: 30,
        alignItems: 'center',
    },
});
  

export default RegisterScreen;