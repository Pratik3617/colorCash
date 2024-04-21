import React, { useContext } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontSize from "../../../constants/FontSize";
import Colors from "../../../constants/Colors";
import TimerContext from "../../../Context/TimerContext";
import Layout from "../../../constants/Layout";

interface Transaction {
    period: string;
    number: number;
    color: string;
}

const EmerdResult=()=>{
    const {emerdResult} = useContext(TimerContext);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Icon name="emoji-events" style={styles.icon}></Icon>
            </View>

            <View style={styles.resultHeader}>
                <Text style={styles.columnText}>Period</Text>
                <Text style={styles.columnText}>Number</Text>
                <Text style={styles.columnText}>Result</Text>
            </View>
            <View>
                <ScrollView style={{ height: Layout.height*0.3 }} showsVerticalScrollIndicator={false}>
                    {
                        emerdResult.map((data:Transaction,index:number)=>(
                            <View key={index} style={styles.result}>
                                <Text style={styles.text}>{data['period']}</Text>
                                <Text style={[styles.text,{color:data['color']}]}>{data['number']}</Text>
                                <View style={styles.box}>
                                    <View style={[styles.color,{backgroundColor: data['color']}]}></View>
                                </View>
                            </View>
                        ))
                    }

                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        marginTop: 10,
    },
    header:{
        alignItems:'center',
        borderBottomWidth : 3,
        borderBottomColor: Colors.primary,
    },
    icon:{
        fontSize: 50,
        fontWeight: 'bold',
        color: '#ffc505',
    },
    resultHeader:{
        marginTop : 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        paddingBottom : 5,
        borderBottomColor: '#b8b5ab',
    },
    columnText:{
        flex:1,
        textAlign: 'center',
        color: "#333",
        fontSize: FontSize.medium,
        fontFamily: "Montserrat-Regular",
    },
    result:{
        marginTop : 10,
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        paddingBottom : 10,
        borderBottomColor: '#b8b5ab',
    },
    box:{
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    color:{
        justifyContent: 'center',
        alignItems: 'center',
        width: 15,
        height: 15,
        backgroundColor: "red",
        borderRadius: 50,
        marginRight: 20
    },
    text:{
        flex: 1,
        color: '#333',
        fontSize: FontSize.medium,
        marginLeft: 10,
        fontFamily: "Montserrat-Regular",
    },
    
})

export default EmerdResult;