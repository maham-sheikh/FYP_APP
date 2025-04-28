import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ActivityIndicator,ScrollView, TouchableOpacity } from 'react-native';
import locA from '../../assets/AutoRepair.png';
import Home from '../../assets/Home.png';
import Like from '../../assets/Favourities.png';
import Category from '../../assets/Servies.png';
import Discount from '../../assets/Discounts.png';
import Location from '../../assets/Location.png';
import Service1a from '../../assets/Service1.1.png';
import Service1b from '../../assets/Service1.2.png';
import Service1c from '../../assets/Service1.3.png';
import Service1d from '../../assets/Service1.4.png';
import Service1e from '../../assets/Service1.5.png';
import Service1f from '../../assets/Service1.6.png';
import Service1g from '../../assets/Service1.7.png';
import Service1h from '../../assets/Service1.8.png';
import Service1i from '../../assets/Service1.9.png';

import { useFonts } from 'expo-font';

const { width, height } = Dimensions.get('window');

function Service1({ navigation, route }) {
  const [fontsLoaded] = useFonts({
    Poppins: require('../../assets/Poppins-Regular.ttf'),
    Montserrat: require('../../assets/Montserrat-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#00B1D0" style={styles.loaderSr} />;
  }

  const { mainServiceName } = route.params;

   const services = [
    { id: 1, name: 'Car Repair', icon: Service1a},
    { id: 2, name: 'AC Repair', icon: Service1b},
    { id: 3, name: 'Tire Repair', icon: Service1c },
    { id: 4, name: 'Paint & body work', icon: Service1d },
    { id: 5, name: 'Brake Inspection', icon: Service1e},
    { id: 6, name: 'Engine Repair', icon: Service1f},
    { id: 7, name: 'Auto Wash', icon: Service1g },
    { id: 8, name: 'Battery Repair', icon: Service1h },
    { id: 9, name: 'Bike Repair', icon: Service1i },
  ];

  const handleSubServicePress = (subService) => {
    navigation.navigate('Service1details', {
      mainService: mainServiceName,  
      subService: subService.name,  
      subServiceId: subService.id,  
      icon: subService.icon         
    });
  };
  return (
    <View style={styles.containerAS}>
      <Image source={locA} style={styles.imageAAS} />
      <Text style={styles.textAS}>{mainServiceName}</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.gridContainer}>
          {services.map((subService) => (
            <TouchableOpacity 
              key={subService.id} 
              style={styles.serviceBox}
              onPress={() => handleSubServicePress(subService)}
            >
              <Image source={subService.icon} style={styles.serviceImage} />
              <Text style={styles.serviceText}>{subService.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>


      <View style={styles.footerContainerAS}>
        <View style={styles.footerIconContainer} onTouchEnd={() => navigation.navigate('Homes')}>
          <Image source={Home} style={styles.footerIcon} />
          <Text style={styles.footerIconText}>Home</Text>
        </View>
        <View style={styles.footerIconContainer} onTouchEnd={() => navigation.navigate('Likes')}>
          <Image source={Like} style={styles.footerIcon} />
          <Text style={styles.footerIconText}>Favourites</Text>
        </View>
        <View style={styles.footerIconContainer} onTouchEnd={() => navigation.navigate('Servicess')}>
          <Image source={Category} style={styles.footerIcon} />
          <Text style={styles.footerIconText}>Services</Text>
        </View>
        <View style={styles.footerIconContainer} onTouchEnd={() => navigation.navigate('Locationss')}>
          <Image source={Location} style={styles.footerIcon} />
          <Text style={styles.footerIconText}>Location</Text>
        </View>
        <View style={styles.footerIconContainer} onTouchEnd={() => navigation.navigate('Discountss')}>
          <Image source={Discount} style={styles.footerIcon} />
          <Text style={styles.footerIconText}>Discounts</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerAS: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F1FFF3',
    paddingTop: height * 0.08,
    paddingBottom: height * 0.1,
  },
  imageAAS: {
    width: width * 0.35,
    height: undefined,
    aspectRatio: 1,
    marginBottom: 10,
  },
  textAS: {
    fontFamily: 'Montserrat',
    fontSize: width < 350 ? 18 : width * 0.07,
    fontStyle: 'italic',
    fontWeight: '500',
    lineHeight: 29.26,
    textAlign: 'center',
    color: '#00B1D0',
    backgroundColor: '#F1FFF3',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  serviceBox: {
    width: width * 0.28,
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  serviceImage: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
  },
  serviceText: {
    fontFamily: 'Poppins',
    fontSize: width < 350 ? 12 : 14,
    fontWeight: '500',
    color: '#333333',
    marginTop: 5,
    textAlign: 'center',
  },
  footerContainerAS: {
    width: '100%',
    height: height * 0.1,
    backgroundColor: '#00B1D0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingBottom: 10,
    paddingTop: 5,
  },
  footerIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerIconText: {
    fontFamily: 'Poppins',
    fontSize: width < 350 ? 10 : 12,
    fontStyle: 'italic',
    fontWeight: '300',
    lineHeight: 12,
    textAlign: 'center',
    color: '#000000',
    marginTop: 5,
  },
  footerIcon: {
    width: width < 350 ? 25 : 30,
    height: width < 350 ? 25 : 30,
  },
  loaderSr: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1FFF3',
  },
});

export default Service1;
