import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import Layout from "../../constants/Layout";
import AccountBlock from "./AccountBlock";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../Context/AuthContext";
import FontSize from "../../constants/FontSize";

function AccountContent(){
    const navigation = useNavigation();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const {token} = useAuth();

    useEffect(()=>{
        const fetchUserWin = async()=>{
            try{
                const response = await axios.get("https://www.backend.colour-cash.com/api/v1/transaction?fields=amount,type,createdAt",{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                });
                // console.log(token)
                // console.log("account",response.data['data'])
                setTransactions(response.data['data']);
                setLoading(false);
            }catch(error){
                Alert.alert("Error fetching user Account history!!!",error as string);
                setLoading(false);
            }
        }

        const unsubscribe = navigation.addListener('focus',()=>{
            fetchUserWin();
        })
        return unsubscribe;
    },[navigation]);

    return (
        <View style={{height: Layout.height*0.78}}>
            <ScrollView style={[styles.scrollContainer]} showsVerticalScrollIndicator={false}>
            {
                loading? (
                <ActivityIndicator size="large" color="#0000ff"/>
                ): (
                    transactions.length > 0 ? transactions.map((details,index)=>(
                        <AccountBlock key={index} date={details['createdAt']} amountWithdrawn={details['type']=="debit"? false : true} amount={details['amount']}/>
                    )) : (<Text style={styles.text}>
                        No data to show!!!
                    </Text>)
                )
            }        
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },
    text:{
        textAlign: 'center',
        alignItems: 'center',
        fontFamily: 'Montserrat-Bold',
        fontSize: FontSize.large,
        marginTop: 100,
    }
})

export default AccountContent;