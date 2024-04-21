import React, { useState, useEffect } from "react";
import { Linking, StyleSheet, Text, TouchableOpacity, View, Animated } from "react-native";
import Layout from "../../../constants/Layout";
import FontSize from "../../../constants/FontSize";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from "../../../constants/Colors";
import { useAuth } from "../../../Context/AuthContext";

function HomeHeader() {
    const { Available_Balance, getBalance } = useAuth();
    const [rotationAngle, setRotationAngle] = useState(new Animated.Value(0));

    useEffect(() => {
        getBalance();
    }, []);

    const handleRecharge = () => {
        const url = "https://rzp.io/l/colour-cash";
        Linking.openURL(url);
    }

    const rotateCacheIcon = () => {
        Animated.timing(rotationAngle, {
            toValue: 1,
            duration: 1000, // Adjust duration as needed
            useNativeDriver: true
        }).start(() => {
            getBalance();
            setRotationAngle(new Animated.Value(0)); // Reset angle after rotation
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Available Balance: ₹ {Available_Balance}</Text>
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.button} onPress={handleRecharge}>
                    <Text style={styles.buttonText}>Recharge</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={rotateCacheIcon}>
                    <Animated.View style={[styles.iconContainer, {
                        transform: [{
                            rotate: rotationAngle.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0deg', '360deg']
                            })
                        }]
                    }]}>
                        <Icon name="cached" size={28} style={styles.icon} />
                    </Animated.View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: Layout.height * 0.14,
        width: Layout.width * 0.94,
        padding: 15,
        borderRadius: 10,
        backgroundColor: "#333",
        shadowColor: "#333",
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    },
    headerText: {
        marginTop: 2,
        fontSize: FontSize.medium,
        color: "white",
        fontFamily: "Montserrat-Regular"
    },
    bottom: {
        display: 'flex',
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        width: Layout.width * 0.4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: "Montserrat-Bold",
        letterSpacing: 1
    },
    iconContainer: {
        marginTop: 10,
    },
    icon: {
        color: "#39fc03",
    }
});

export default HomeHeader;
