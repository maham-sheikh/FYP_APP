import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import successIcon from "../../assets/success.png";

const BusinessVerification = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('BuisnessSide'); 
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image 
        source={successIcon} 
        style={styles.icon}
      />
      <Text style={styles.headerText}>Successful</Text>
      <Text style={styles.infoText}>
        Congratulations! Your account is verified. Please wait up to 24 hours for administrative approval. After that, you will be able to log in to your business account.
      </Text>
      <Text style={styles.footerText}>
        FINDIGO will notify you via email
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F1FFF3', 
  },
  icon: {
    width: 100,
    height: 100,  
    marginBottom: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
    fontWeight:'bold',
    color:'#00B1D0',
  },
  footerText: {
    fontSize: 16,
    color: '#707070', 
    textAlign: 'center',
    fontFamily: "Poppins",
  }
});

export default BusinessVerification;
