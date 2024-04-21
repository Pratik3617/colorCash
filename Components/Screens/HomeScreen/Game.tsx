import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import GameHeader from "./GameHeader";
import GameBox from "./GameBox";
import GameResult from "./GameResult";




const Game=()=>{
    
    return(
        <View style={styles.container}>
            <GameHeader/>    
            <GameBox />
            <GameResult />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding:10,
    },
})

export default Game;