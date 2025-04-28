import React, { useState } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 

const { width, height } = Dimensions.get('window');

export default function CustomerLogin() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); 

  const isPhoneValid = (input) => {
    return input.length === 10 && /^[3][0-9]{9}$/.test(input);
  };

  const handleLogin = async () => {
    if (!phone || !password) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      return;
    }
  
    if (!isPhoneValid(phone)) {
      Alert.alert('Invalid Number', 'Please enter a valid phone number: 3XXXXXXXXX');
      return;
    }
  
    try {
      const response = await axios.post('http://192.168.18.244:8000/api/customer/login', {
        phone,
        password,
      });
  
      if (response.data.message === "Login successful") {
        Alert.alert('Login Successful', 'You are now logged in!');
        navigation.navigate('Homes', { phone }); 
      } else {
        throw new Error(response.data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      Alert.alert(
        'Login Failed', 
        error.response?.data?.error || error.message || 'Server error.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Welcome</Text>
        <Text style={styles.text1}>
          {showForgotPassword ? 'Reset Your Password' : 'Access Local Service'}
        </Text>
      </View>

      <View style={styles.container1}>
        <View style={styles.inputContainer}>
          {showForgotPassword ? (
            <>
              <Text style={styles.instructions}>
                Enter your phone number and we'll send you a OTP to your number
              </Text>

              <View style={styles.phoneInputContainer}>
                <Text style={styles.prefix}>+92</Text>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="3XXXXXXXXX"
                  placeholderTextColor="#888"
                  keyboardType="number-pad"
                  maxLength={10}
                  value={phone}
                  onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ''))}
                />
              </View>

              <TouchableOpacity style={styles.resetButton} onPress={handleForgotPassword}>
                <Text style={styles.resetButtonText}>Send OTP</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setShowForgotPassword(false)}>
                <Text style={styles.backToLogin}>← Back to Login</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.phoneInputContainer}>
                <Text style={styles.prefix}>+92</Text>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="3XXXXXXXXX"
                  placeholderTextColor="#888"
                  keyboardType="number-pad"
                  maxLength={10}
                  value={phone}
                  onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ''))}
                />
              </View>

              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Password"
                  placeholderTextColor="#888"
                  secureTextEntry={!passwordVisible}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                >
                  <Ionicons
                    name={passwordVisible ? 'eye' : 'eye-off'}
                    size={width * 0.06}
                    color="#888"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => setShowForgotPassword(true)}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.resetButton} onPress={handleLogin}>
                <Text style={styles.resetButtonText}>Login</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00B1D0',
  },
  textContainer: {
    position: 'absolute',
    top: height * 0.1,
    width: '100%',
    alignItems: 'center',
  },
  text: {
    fontSize: width * 0.1,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  text1: {
    fontSize: width * 0.035,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
  },
  container1: {
    position: 'absolute',
    top: height * 0.22,
    width: '100%',
    height: height * 0.78,
    backgroundColor: '#F1FFF3',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderTopLeftRadius: width * 0.21,
    borderTopRightRadius: width * 0.21,
  },
  inputContainer: {
    width: '80%',
    alignItems: 'center',
    marginTop: height * 0.18,
  },
  input: {
    width: '100%',
    height: height * 0.062,
    backgroundColor: '#FFF',
    borderRadius: width * 0.03,
    paddingHorizontal: width * 0.04,
    fontSize: width * 0.04,
    color: '#333',
    marginBottom: height * 0.02,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: height * 0.002 },
    shadowOpacity: 0.1,
    shadowRadius: width * 0.015,
    elevation: 2,
  },
  passwordContainer: {
    width: '100%',
    position: 'relative',
  },
  passwordInput: {
    width: '100%',
    height: height * 0.062,
    backgroundColor: '#FFF',
    borderRadius: width * 0.03,
    paddingHorizontal: width * 0.04,
    fontSize: width * 0.04,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: height * 0.002 },
    shadowOpacity: 0.1,
    shadowRadius: width * 0.015,
    elevation: 2,
  },
  eyeIcon: {
    position: 'absolute',
    right: width * 0.05,
    top: '50%',
    transform: [{ translateY: -width * 0.03 }],
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPassword: {
    position: 'absolute',
    top: height * 0.02,  
    left: width * 0.05,  
    color: '#007BFF',
    fontSize: width * 0.04,
    fontWeight: '600',
  },
  instructions: {
    fontSize: width * 0.045,
    textAlign: 'center',
    color: '#333',
    marginBottom: height * 0.02,
  },
  resetButton: {
    width: '100%',
    height: height * 0.062,
    backgroundColor: '#00B1D0',
    borderRadius: width * 0.03,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.07,
  },
  resetButtonText: {
    fontSize: width * 0.045,
    color: '#FFF',
    fontWeight: '600',
  },
  backToLogin: {
    marginTop: height * 0.02,
    color: '#007BFF',
    fontSize: width * 0.04,
    fontWeight: '600',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: height * 0.062,
    backgroundColor: '#FFF',
    borderRadius: width * 0.03,
    paddingHorizontal: width * 0.04,
    marginBottom: height * 0.02,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: height * 0.002 },
    shadowOpacity: 0.1,
    shadowRadius: width * 0.015,
    elevation: 2,
  },
  prefix: {
    fontSize: width * 0.045,
    color: '#333',
    marginRight: width * 0.02,
  },
  phoneInput: {
    flex: 1,
    fontSize: width * 0.045,
    color: '#333',
  },
});
