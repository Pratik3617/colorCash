import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';


interface InputProps {
  placeholder: string;
  onChangeText: (text: string) => void;
  value: string;
}

const Input: React.FC<InputProps> = ({placeholder,onChangeText,value}) => {
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
          secureTextEntry 
        />
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
    fontSize: 14,
    color: '#333',
    width: "80%",
    marginLeft: 8,
    height: Layout.height*0.05
  },

  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default Input;
