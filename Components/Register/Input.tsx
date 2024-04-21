import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../constants/Colors';


interface FloatingLabelTextInputProps {
  placeholder: string;
  iconName: string;
  isSecure: boolean;
  onChangeText: (text: string) => void;
  value: string;
}

const FloatingLabelTextInput: React.FC<FloatingLabelTextInputProps> = ({placeholder,iconName,isSecure,onChangeText,value}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState('');

  const handleFocus = () => {
    setIsFocused(true);
    setError('');
  };

  const handleBlur = () => setIsFocused(false);


  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, isFocused ? styles.inputContainerFocused : null]}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={isSecure} 
        />
        <Icon name={iconName} style={styles.icon} size={24} />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },

  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 2,
    borderRadius: 7,
    backgroundColor: "#f1f3ff",
  },

  inputContainerFocused: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },

  input: {
    fontFamily: "Montserrat-Regular",
    fontSize: 18,
    color: '#333',
    width: "80%",
    marginLeft: 8,
  },

  icon: {
    marginRight: 10,
    color: Colors.primary
  },

  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default FloatingLabelTextInput;
