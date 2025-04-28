import React from 'react';
import { View, StyleSheet, Image } from 'react-native'; 
import Logo from '../assets/Images/Logo.png'; 

function FindigoStart() {
  return (
    <View style={styles.containerS}>
       <Image 
        source={Logo} // This is where we use the imported Logo
        style={styles.logo} // Apply the styles
      />
    </View>
  );
}

const styles = StyleSheet.create({
 containerS: {
    flex: 1, // Makes the container take the full height and width of the screen
    backgroundColor: '#00B1D0', // Background color for the container
    justifyContent: 'center', // Centers the content vertically
    alignItems: 'center', // Centers the content horizontally
  },
  logo: {
    width: 200, // Width of the logo
    height: 200, // Height of the logo
    resizeMode: 'contain', // Maintains the aspect ratio
  },
});

export default FindigoStart;