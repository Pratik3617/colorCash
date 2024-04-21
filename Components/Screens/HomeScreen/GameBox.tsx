import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import Layout from "../../../constants/Layout";
import FontSize from "../../../constants/FontSize";
import { useAuth } from "../../../Context/AuthContext";
import Colors from "../../../constants/Colors";
import axios from "axios";
import TimerContext from "../../../Context/TimerContext";

const GameBox = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false); // State variable for loading indicator
  const { Available_Balance, token, gamestatus, setBetPlayed } = useAuth();
  const { period2, timer2 } = useContext(TimerContext);

  const openModal = (content: string) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setAmount("");
  };

  const isColor = (value: string) => {
    if (value == "Green" || value == "Red" || value == "Violet") {
      return true;
    } else {
      return false;
    }
  };

  const handlePredictionColor = async (value: string) => {

    if (Number(Available_Balance) < Number(amount)) {
      Alert.alert("Insufficient balance! Please Recharge your account");
    } else if (amount == "") {
      Alert.alert("Pleaser enter amount!!!");
    } else if (Number(amount) >= 10) {
      setLoading(true); // Start loading indicator
      try {
        const response = await axios.post(
          "https://www.backend.colour-cash.com/api/v1/betting/color",
          {
            amount: Number(amount),
            period: String(period2),
            color: String(value).toLowerCase(),
            type: "bcone",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status == 200) {
          setBetPlayed(true);
          closeModal();
          Alert.alert("Play Successful!!!");
        }
      } catch (error) {
        console.error("Play Failed!!!", error);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    } else {
      Alert.alert("Please enter valid input!!!");
    }
  };

  const handlePredictionNumber = async (value: string) => {
    if (Number(Available_Balance) < Number(amount)) {
      Alert.alert("Insufficient balance! Please Recharge your account");
    } else if (amount == "") {
      Alert.alert("Pleaser enter amount!!!");
    } else if (Number(amount) >= 10) {
      setLoading(true); // Start loading indicator
      try {
        const response = await axios.post(
          "https://www.backend.colour-cash.com/api/v1/betting/number",
          {
            amount: Number(amount),
            period: String(period2),
            number: String(value),
            type: "bcone",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status == 200) {
          setBetPlayed(true);
          closeModal();
          Alert.alert("Play Successful!!!");
        }
      } catch (error) {
        console.error("Play failed",error)
      } finally {
        setLoading(false); // Stop loading indicator
      }
    } else {
      Alert.alert("Please enter valid input!!!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.colorBox}>
        <TouchableOpacity onPress={() => openModal("Green")}>
          <View style={styles.green}>
            <Text style={styles.colorText}>Join Green</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openModal("Violet")}>
          <View style={styles.violet}>
            <Text style={styles.colorText}>Join Violet</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openModal("Red")}>
          <View style={styles.red}>
            <Text style={styles.colorText}>Join Red</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.NumberBox}>
        {[0, 1, 2, 3, 4].map((number) => (
          <TouchableOpacity key={number} onPress={() => openModal(number.toString())}>
            <View style={styles.NumberBlock}>
              <Text style={styles.NumberText}>{number}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.NumberBox}>
        {[5, 6, 7, 8, 9].map((number) => (
          <TouchableOpacity key={number} onPress={() => openModal(number.toString())}>
            <View style={styles.NumberBlock}>
              <Text style={styles.NumberText}>{number}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalContent}>
                <Text style={styles.modalheader}>Amount</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter Amount"
                  value={amount}
                  onChangeText={(text) => setAmount(text)}
                  keyboardType="numeric"
                />
                {loading && 
                  <ActivityIndicator size="large" color={Colors.primary} />}
                  {
                    (
                      timer2 > 10 ? (
                        gamestatus ? (
                          <TouchableOpacity
                            activeOpacity={1}
                            onPress={
                              isColor(modalContent)
                                ? () => handlePredictionColor(modalContent)
                                : () => handlePredictionNumber(modalContent)
                            }
                          >
                            <Text style={styles.play}>Play</Text>
                          </TouchableOpacity>
                        ) : (
                          <Text style={{ textAlign: "center", color: Colors.primary, fontSize: FontSize.large, fontFamily: "Montserrat-Bold" }}>Game is closed for now, Please try again after sometime!!!</Text>
                        )
                      ) : (
                        <Text style={{ textAlign: "center", color: Colors.primary, fontSize: FontSize.large, fontFamily: "Montserrat-Bold" }}>You cannot play for this period</Text>
                      )
                    )
                  }
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
  colorBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  green: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 3,
    textAlign: "center",
  },
  colorText: {
    color: "#fff",
    letterSpacing: 1,
    fontFamily: "Montserrat-Bold",
  },
  violet: {
    backgroundColor: "purple",
    padding: 10,
    borderRadius: 3,
    textAlign: "center",
  },
  red: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 3,
    textAlign: "center",
  },
  NumberBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  NumberBlock: {
    width: Layout.width * 0.15,
    height: Layout.height * 0.05,
    backgroundColor: "#0b4a27",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },
  NumberText: {
    color: "#ffffff",
    fontFamily: "Montserrat-Bold",
    fontSize: FontSize.medium,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
  },
  
  modalContent: {
    width: Layout.width * 0.8,
    backgroundColor: "#dfe9ed",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalheader: {
    color: "#333",
    fontFamily: "Montserrat-Bold",
    fontSize: FontSize.xLarge
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    width: "100%",
    borderRadius: 10,
    fontFamily: "Montserrat-Regular",
  },
  play: {
    color: "white", 
    marginTop: 10, 
    padding: 10, 
    backgroundColor: Colors.primary,
    borderRadius: 10,
    fontSize: FontSize.medium,
    letterSpacing: 1,
    fontFamily: "Montserrat-Bold",
  }
});

export default GameBox;
