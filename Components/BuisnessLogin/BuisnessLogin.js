// import React, { useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native'; 

// function BusinessLogin() {
//   const navigation = useNavigation();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigation.navigate('VendorLogin'); 
//     }, 1000); 

//     return () => clearTimeout(timer);
//   }, [navigation]);

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity>  
//         <Text style={styles.textBB}>Welcome to the Business Login page!</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F1FFF3',
//     paddingHorizontal: 20, 
//   },
//   textBB: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#00B1D0',
//     textAlign: 'center',
//   },
// });

// export default BusinessLogin;
