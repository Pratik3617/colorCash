import React from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import FontSize from "../../../constants/FontSize";
import Layout from "../../../constants/Layout";

interface ResultProps {
    amountInvested: number;
    optedColor: string;
    optedNumber: number;
    winningAmount: string;
    date: string;
    gamename: string;
    status: string;
    period: string;
}

const ResultBlock: React.FC<ResultProps> = ({amountInvested,optedColor,optedNumber,winningAmount,date,gamename,status, period}) =>{
    
    function formatDate(dateString:string) {
        const dateObject = new Date(dateString);
        return dateObject.toISOString().split('T')[0];
    }

    return (
        <SafeAreaView style={styles.container} >
            <View style={styles.header}>
                <Text style={styles.date}>Date : {formatDate(date)}</Text>
                <Text style={styles.gameName}>{gamename}: {period}</Text>
            </View>

            <View style={styles.blockHead}>
                <Text style={styles.text}>Invested</Text>
                <Text style={styles.text}>Prediction</Text>
                <Text style={styles.text}>Winning</Text>
            </View>

            <View style={styles.blockHead}>
                <Text style={styles.num}>{amountInvested}</Text>
                {optedNumber !== -1 && <Text style={styles.num}>{optedNumber}</Text>}

                {optedColor && (
                    <View style={[styles.circle, { backgroundColor: optedColor }]} />
                )}
                <Text style={status==="profit" ? styles.win : styles.loss}>{ status=="live" ? "pending" : winningAmount}</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#dfe9ed",
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    gameName:{
        fontFamily: 'Montserrat-Regular',
        color: "#333",
        marginRight: 20
    },
    date:{
        marginLeft: Layout.width*0.05,
        color: "#333",
        fontFamily: 'Montserrat-Regular',
        fontSize: FontSize.medium,
    },
    blockHead:{
        marginTop: 10,
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    text:{
        flex: 1,
        color: "#333",
        fontFamily: 'Montserrat-Bold',
        fontSize: FontSize.small,
        textAlign: 'center'
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginLeft: 10,
    },
    win:{
        color: "green",
        fontWeight: 'bold',
        fontSize: FontSize.medium,
    },
    loss:{
        color: "red",
        fontWeight: 'bold',
        fontSize: FontSize.medium,
    },
    num:{
        fontWeight: 'bold',
        color: "#333",
        fontSize: FontSize.medium,
    },
    period:{
        fontWeight: 'bold',
        color:"#333",
        fontSize: FontSize.medium
    }
});

export default ResultBlock;