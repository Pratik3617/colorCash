import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FontSize from "../../constants/FontSize";

interface AccountBlockProps{
    date: string;
    amountWithdrawn: boolean;
    amount: string;
}

const AccountBlock: React.FC<AccountBlockProps> = ({date,amountWithdrawn,amount}) => {
    
    function formatDate(inputDate: string) {
        const dateObject = new Date(inputDate);
      
        const year = dateObject.getFullYear();
        const month = ("0" + (dateObject.getMonth() + 1)).slice(-2); // Adding 1 because getMonth() returns zero-based index, and ensuring leading zero
        const date = ("0" + dateObject.getDate()).slice(-2); // Ensuring leading zero
      
        return `${date}/${month}/${year}`;
      }

    const formattedDate = formatDate(date);

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.date}>{formattedDate}</Text>
                <Text style={styles.text}>{amountWithdrawn ? "Withdrawn" : "Recharge"}</Text>
                <Text style={[styles.text,{color:amountWithdrawn? "green" : "red"}]}> {amount}</Text>
            </View>
        </View>
    );styles.text
}

const styles = StyleSheet.create({
    container:{
        padding: 10,
        backgroundColor: "#dfe9ed",
        borderRadius : 10,
        marginBottom: 10,
    },
    box:{
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    date:{
        fontSize: FontSize.medium,
        color: "#333",
        fontFamily: "Montserrat-Bold",
    },
    text:{
        fontSize: FontSize.medium,
        color: "#333",
        fontFamily: "Montserrat-Regular",
    }
})

export default AccountBlock;