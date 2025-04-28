import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Home from '../../assets/Home.png';
import Like from '../../assets/Favourities.png';
import Category from '../../assets/Servies.png';
import Discount from '../../assets/Discounts.png';
import Location from '../../assets/Location.png';
import verified from '../../assets/verified.png';
import mysave from '../../assets/mysave.png';
import mysaveFilled from '../../assets/filledheart.png';
import starFilled from '../../assets/starFilled.png';
import starUnfilled from '../../assets/starUnfilled.png';
import viewProfile from '../../assets/profileViewArrow.png';
import { useFonts } from 'expo-font';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import * as LocationAPI from 'expo-location';

const { width, height } = Dimensions.get('window');

const API_BASE_URL = 'http://192.168.100.148:8000/api/customer';

function Service1details({ route, navigation }) {
  const [fontsLoaded] = useFonts({
    Poppins: require('../../assets/Poppins-Regular.ttf'),
    Montserrat: require('../../assets/Montserrat-Regular.ttf'),
  });

  const [selectedDistance, setSelectedDistance] = useState('5km');
  const [savedServices, setSavedServices] = useState({});
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const isFocused = useIsFocused();

  const { mainService, subService, subServiceId, icon } = route.params;

  useEffect(() => {
    if (isFocused) {
      getCurrentLocation();
    }
  }, [isFocused]);

  useEffect(() => {
    if (userLocation) {
      fetchVendorsData();
    }
  }, [userLocation, selectedDistance]);

  const getCurrentLocation = async () => {
    try {
      let { status } = await LocationAPI.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }

      let location = await LocationAPI.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    } catch (error) {
      console.error('Error getting location:', error);
      setError('Failed to get current location');
    }
  };

  const fetchVendorsData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!userLocation) {
        throw new Error('Location not available');
      }

      const response = await axios.get(`${API_BASE_URL}/vendors`, {
        params: {
          subService,
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          maxDistance: parseInt(selectedDistance.replace('km', ''))
        }
      });

      setVendors(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching vendors:', error);
      setError(error.message || 'Failed to fetch vendors');
      setLoading(false);
    }
  };

  const calculateDistance = (vendorLat, vendorLon) => {
    if (!userLocation || !vendorLat || !vendorLon) return 'N/A';
    
    const R = 6371; 
    const dLat = deg2rad(vendorLat - userLocation.latitude);
    const dLon = deg2rad(vendorLon - userLocation.longitude);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(userLocation.latitude)) * Math.cos(deg2rad(vendorLat)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; 
    return distance.toFixed(2) + 'km';
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI/180);
  };

  const toggleSaveService = (serviceName) => {
    setSavedServices(prev => ({
      ...prev,
      [serviceName]: !prev[serviceName]
    }));
  };

  const renderServices = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#00B1D0" style={styles.loader} />;
    }

    if (error) {
      return <Text style={styles.errorText}>Error: {error}</Text>;
    }

    if (vendors.length === 0) {
      return <Text style={styles.noServicesText}>No services available for {subService} within {selectedDistance}</Text>;
    }

    return vendors.map((vendor, index) => {
      const distance = calculateDistance(vendor.latitude, vendor.longitude);
      const mockReview = (index % 5) + 1; 

      return (
        <View key={vendor.id} style={styles.serviceContainer}>
          <View style={styles.serviceRow}>
            <Text style={styles.serviceNames}>{vendor.business_name || vendor.fullName}</Text>
            {vendor.status === 'approved' && (
              <View style={styles.verifiedSection}>
                <Image source={verified} style={styles.verifiedIcon} />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            )}
          </View>
          <Text style={styles.serviceWork}>{vendor.service_type || subService}</Text>
          <View style={styles.myserviceRow}>
            <Text style={styles.serviceDistance}>{distance}</Text>
            <TouchableOpacity 
              onPress={() => toggleSaveService(vendor.business_name || vendor.fullName)} 
              style={styles.heartButton}
            >
              <View style={styles.verifiedSection}>
                <Image 
                  source={savedServices[vendor.business_name || vendor.fullName] ? mysaveFilled : mysave} 
                  style={styles.saveIcon} 
                />
                <Text style={styles.verifiedText}>
                  {savedServices[vendor.business_name || vendor.fullName] ? 'Saved' : 'Save'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          
          <View style={styles.reviewSection}>
            <Text style={styles.reviewText}>Reviews</Text>
            <View style={styles.starsContainer}>
              {[...Array(5)].map((_, starIndex) => (
                <Image
                  key={starIndex}
                  source={starIndex < mockReview ? starFilled : starUnfilled}
                  style={styles.starIcon}
                />
              ))}
              <Text style={styles.filledStarsCount}>{mockReview}</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('ViewProfile', { vendor })} 
            style={styles.viewProfileButton}
          >
            <View style={styles.profileContainer}>
              <Text style={styles.viewProfileText}>View Profile</Text>
              <Image source={viewProfile} style={styles.viewProfileImage} />
            </View>
          </TouchableOpacity>
        </View>
      );
    });
  };

  const renderButtons = () => {
    const buttons = ['5km', '10km', '15km', '20km'];
    return buttons.map((button) => (
      <TouchableOpacity
        key={button}
        style={[styles.button, selectedDistance === button && styles.selectedButton]}
        onPress={() => setSelectedDistance(button)}
      >
        <Text style={styles.buttonText}>{button}</Text>
      </TouchableOpacity>
    ));
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#00B1D0" style={styles.loaderSr} />;
  }

  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.imageAAS} />
      <Text style={styles.textAS}>{mainService}</Text>
      <Text style={styles.subServiceText}>{subService}</Text>
      
      <View style={styles.buttonsContainer}>
        {renderButtons()}
      </View>
      
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.serviceBox}>
          {renderServices()}
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
  container: {
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
  subServiceText: {
    fontFamily: 'Montserrat',
    fontSize: width * 0.05,
    color: '#00B1D0',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#00B1D0',
    borderRadius: 5,
    margin: width * 0.02,
    width: width * 0.20,
    height: height * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#0098B8',
    borderColor: '#000000',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: width * 0.04,
    color: '#FFF',
    textAlign: 'center',
  },
  scrollContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  serviceBox: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  serviceContainer: {
    marginBottom: 20,
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  serviceNames: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    flex: 1,
  },
  verifiedSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedIcon: {
    width: width * 0.04,
    height: width * 0.04,
  },
  verifiedText: {
    fontSize: width * 0.035,
    color: 'green',
    marginLeft: width * 0.01,
  },
  serviceWork: {
    fontFamily: 'Montserrat',
    fontSize: width * 0.032,
    fontStyle: 'italic',
    fontWeight: '400',
    lineHeight: width * 0.038,
    textAlign: 'left',
    color: '#50505080',
    marginTop: height * 0.008,
  },
  myserviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 5,
  },
  serviceDistance: {
    fontSize: 12,
    fontStyle: 'italic',
    fontWeight: '400',
    color: '#50505080',
  },
  heartButton: {
    padding: 10,
  },
  saveIcon: {
    width: width * 0.07,
    height: width * 0.07,
  },
  reviewSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 5,
  },
  reviewText: {
    fontSize: width * 0.032,
    fontWeight: '400',
    color: '#000000',
    fontStyle: 'italic',
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: width * 0.05,
    height: width * 0.05,
  },
  filledStarsCount: {
    fontSize: width * 0.04,
    fontStyle: 'italic',
    color: '#B0B0B0',
    marginLeft: width * 0.02,
  },
  viewProfileButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.02,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewProfileImage: {
    width: width * 0.05,
    height: width * 0.07,
    resizeMode: 'contain',
  },
  viewProfileText: {
    fontSize: 14,
    color: '#00B1D0',
    fontWeight: 'bold',
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
  loader: {
    marginVertical: 20,
  },
  noServicesText: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#505050',
    fontSize: 16,
  },
  errorText: {
    textAlign: 'center',
    marginVertical: 20,
    color: 'red',
    fontSize: 16,
  },
});

export default Service1details;