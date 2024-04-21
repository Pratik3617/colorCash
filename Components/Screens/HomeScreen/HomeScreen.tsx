import React, { useState } from "react";
import { ImageBackground } from "react-native";
import { StyleSheet, View } from "react-native";
import HomeHeader from "./HomeHeader";
import HomeButton from "./HomeButton";
import Game from "./Game";
import Emerd from "./Emerd";


function HomeScreen(){
  const [isTextFocusedBcone, setIsTextFocusedBcone] = useState(true);
  const [isTextFocusedEmerd, setIsTextFocusedEmerd] = useState(false);



  const handleBconePress = () => {
    setIsTextFocusedBcone(true);
    setIsTextFocusedEmerd(false); 
  };
  
  const handleEmerdPress = () => {
    setIsTextFocusedEmerd(true);
    setIsTextFocusedBcone(false);
  };

  
    return(
        <ImageBackground source={require('../../../assets/Images/background.png')}>
            <View style={styles.container}>
                <HomeHeader/>
                <HomeButton onBconePress={handleBconePress} onEmerdPress={handleEmerdPress} isBconeFocused={isTextFocusedBcone}/>
                {isTextFocusedBcone ? <Game /> : <Emerd />}
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 10,
        paddingVertical: 10
    }
})

export default HomeScreen;