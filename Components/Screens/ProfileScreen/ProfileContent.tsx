import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import ProfileTab from "./ProfileTab";
import { useAuth } from "../../../Context/AuthContext";
import FontSize from "../../../constants/FontSize";
import ChangePassModal from "./ChangePasswordModal";
import RulesModal from "./RulesModal";
import WithdrawModal from "./WithdrawModal";
import AccountDetails from "./AccountDetails";
import Share from "react-native-share"

interface ProfileContentProps{
    onPress: () => void;
}

const ProfileContent: React.FC<ProfileContentProps> = ({onPress}) => {
    const {logout,token} = useAuth();
    const [modalVisible, setModalVisible] = useState(false);
    const [ruleModal,setRuleModal] = useState(false);
    const [withdrawModal, setWithdrawModal] = useState(false);
    const [accountModal, setAccountModal] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };
    
    const closeModal = () => {
        setModalVisible(false);
    };
    const openRulesModal = () => {
        setRuleModal(true);
    };
    
    const closeRulesModal = () => {
        setRuleModal(false);
    };

    const openWithdrawModal = () => {
        setWithdrawModal(true);
    }

    const closeWithdrawModal = () => {
        setWithdrawModal(false);
    }

    const openAccountModal = () => {
        setAccountModal(true);
    }

    const closeAccountModal = () => {
        setAccountModal(false);
    }

    function userLogout(){
        logout();
    }

    const encodeImageToBase64 = async (imagePath:string) => {
        try {
            const response = await fetch(imagePath);
            const blob = await response.blob();
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            return new Promise((resolve, reject) => {
                reader.onloadend = () => {
                    resolve(reader.result);
                };
                reader.onerror = reject;
            });
        } catch (error) {
            console.log("Error encoding image to base64:", error);
            return null;
        }
    }

    const customShare = async() => {

        const shareOptions = {
            title: "App link",
            message: "Predict and win cash!!!",
            url: "https://www.colour-cash.com/",
        }
        try{
            const shareResponse = await Share.open(shareOptions);
        }catch(error){
            console.log("Error:",error);
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.headText}>Account Info :</Text>
            <ProfileTab key={0} name="account-balance" title="Add Account Details" onpress={openAccountModal}/>
            <ProfileTab key={1} name="paid" title="Withdraw Money" onpress={openWithdrawModal}/>
            <ProfileTab key={3} name="key" title="Change Password" onpress={openModal}/>
            <ProfileTab key={4} name="person" title="Account History" onpress={onPress}/>
            <ProfileTab key={5} name="logout" title="Logout" onpress={userLogout}/>
            <ProfileTab key={6} name="list" title="Rules" onpress={openRulesModal}/>
            <ProfileTab key={7} name="offline-share" title="Share with your friends " onpress={customShare}/>
            
            <ChangePassModal modalvisible={modalVisible} closemodal={closeModal} token={token}/>
            <RulesModal modalvisible={ruleModal} closemodal={closeRulesModal}/>
            <WithdrawModal modalvisible={withdrawModal} closemodal={closeWithdrawModal} token={token} />
            <AccountDetails modalvisible={accountModal} closemodal={closeAccountModal} token={token}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        marginTop:10,
    },
    headText:{
        marginTop: 10,
        fontSize: FontSize.large,
        fontFamily: 'Montserrat-Bold',
        letterSpacing: 1,
        marginBottom: 5,
        textAlign: 'left',
    }
})

export default ProfileContent;