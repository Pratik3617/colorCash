import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import Colors from "../../../constants/Colors";
import FontSize from "../../../constants/FontSize";
import ResultBlock from "./ResultBlock";
import Layout from "../../../constants/Layout";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useAuth } from "../../../Context/AuthContext";


function ResultScreen(){
    const navigation = useNavigation();
    const [betHistory,setBetHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const {token} = useAuth();


    useEffect(()=>{
        const fetchUserWin = async()=>{
            try{
                const response = await axios.get("https://www.backend.colour-cash.com/api/v1/betting?fields=amount,winning,color,number,status,period,type,createdAt",{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                });
                // console.log(response.data)
                setBetHistory(response.data['data']);
                setLoading(false);
            }catch(error){
                Alert.alert("Error fetching user history!!!",error as string);
                setLoading(false);
            }
        }

        const unsubscribe = navigation.addListener('focus',()=>{
            fetchUserWin();
        })
        return unsubscribe;
    },[navigation]);

    return(
        <ImageBackground style={styles.container} source={require('../../../assets/Images/background.png')}>
            <Text style={styles.header}>History</Text>
            <View style={{height:Layout.height*0.82, paddingBottom:10}}>
                <ScrollView style={[styles.scrollContainer]} showsVerticalScrollIndicator={false}>
                    {
                        loading ? (
                            <ActivityIndicator size="large" color="#0000ff"/>
                        ):(
                            betHistory.length > 0 ? betHistory.map((data,index)=>(
                                <ResultBlock key={index} amountInvested={data['amount']} optedColor={data['color']?data['color']:""} 
                                    optedNumber={data['number']? data['number']: -1} winningAmount={data['winning']} 
                                    date={data['createdAt']} gamename={data['type']} status={data['status']} period={data['period']}
                                />
                            )) : (
                                <Text style={styles.text}>
                                    No data to show!!!
                                </Text>
                            )
                        )
                    }
                    
                </ScrollView>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 10
    },
    header:{
        fontFamily: 'Montserrat-Bold',
        color: Colors.primary,
        fontSize: FontSize.xxLarge,
        letterSpacing: 1,
        textAlign: 'center',
        marginBottom: 10,
    },
    scrollContainer: {
        flex: 1,
    },
    text:{
        marginTop: 100,
        textAlign: 'center',
        alignItems: 'center',
        fontFamily: 'Montserrat-Bold',
        fontSize: FontSize.large
    }

})

export default ResultScreen;