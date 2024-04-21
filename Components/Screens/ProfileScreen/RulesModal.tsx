import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import FontSize from '../../../constants/FontSize';
import Layout from '../../../constants/Layout';
import Colors from '../../../constants/Colors';

interface ChangePassProps {
  modalvisible: boolean;
  closemodal: () => void;
}

const RulesModal: React.FC<ChangePassProps> = ({ modalvisible, closemodal }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalvisible}
      onRequestClose={closemodal}>
      <TouchableWithoutFeedback onPress={closemodal}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalHeaderContent}>
              <Text style={styles.modalheader}>RULES</Text>
              <View style={styles.modalContent}>
                <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                  <Text style={styles.text}>1. Minimum Recharge ₹100</Text>
                  <Text style={styles.textimp}>2. Use Registered Email (i.e. color cash app Registered Email) for Adding wallet balance.</Text>
                  <Text style={styles.textimp}>Otherwise, we are not responsible for your loss!!!</Text>
                  <Text style={styles.text}>3. The minimum withdrawal amount is ₹100</Text>
                  <Text style={styles.text}>4. In the color game, the odds are 1.95 times the amount bet (ex.₹100 = ₹195 on winning) </Text>
                  <Text style={styles.text}>5. In the number game, the odds are 8 times the amount bet (ex.₹100 = ₹800 on winning)</Text>
                  <Text style={styles.text}>6. 2% charge is applied on recharges made on the platform</Text>
                  <Text style={styles.text}>7. Withdrawals can be made between 10:00 AM to 6:00 PM daily</Text>
                  <Text style={styles.text}>8. Withdrawal amounts are credited within working days, with a maximum processing time</Text>
                </ScrollView>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalHeaderContent: {
    width: Layout.width * 0.85,
    backgroundColor: '#dfe9ed',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'flex-start',
  },
  modalheader: {
    color: Colors.primary,
    fontFamily: 'Montserrat-Bold',
    fontSize: FontSize.xLarge,
    textAlign: 'center',
    letterSpacing: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 10,
  },
  text: {
    marginVertical: 5,
    fontSize: 14,
    color: '#333',
    fontFamily: 'Montserrat-Regular',
  },
  textimp: {
    marginVertical: 5,
    fontSize: 14,
    color: Colors.primary,
    fontFamily: 'Montserrat-Bold',
  },
});

export default RulesModal;
