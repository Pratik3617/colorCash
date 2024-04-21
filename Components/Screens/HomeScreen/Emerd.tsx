import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import EmerdHeader from "./EmerdHeader";
import EmerdBox from "./EmerdBox";
import EmerdResult from "./EmerdResult";

const Emerd=()=>{

    return(
        <View style={styles.container}>
            <EmerdHeader />    
            <EmerdBox />
            <EmerdResult />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding:10,
    },
})

export default Emerd;