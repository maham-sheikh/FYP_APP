import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useFonts } from 'expo-font';
import { LocationContext } from '../Locationss/locationContext';
import axios from 'axios';

import Home from '../../assets/Home.png';
import Like from '../../assets/Favourities.png';
import Category from '../../assets/Servies.png';
import Discount from '../../assets/Discounts.png';
import LocationIcon from '../../assets/Location.png';
import verified from '../../assets/verified.png';
import backArrow from '../../assets/arrow.png';
import starFilled from '../../assets/starFilled.png';
import starUnfilled from '../../assets/starUnfilled.png';

const { width, height } = Dimensions.get('window');
const API_BASE_URL = 'http://192.168.18.244:8000/api';

function ViewProfile({ route, navigation }) {
  const [fontsLoaded] = useFonts({
    Poppins: require('../../assets/Poppins-Regular.ttf'),
    Montserrat: require('../../assets/Montserrat-Regular.ttf'),
  });

  const { location: userLocation } = useContext(LocationContext);
  const { vendor, serviceType, icon, customerId } = route.params;
  const [requestStatus, setRequestStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateDistance = (vendorLat, vendorLon) => {
    if (!userLocation || !vendorLat || !vendorLon) return 'N/A';

    const R = 6371; 
    const dLat = deg2rad(vendorLat - userLocation.latitude);
    const dLon = deg2rad(vendorLon - userLocation.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(userLocation.latitude)) *
        Math.cos(deg2rad(vendorLat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance.toFixed(2) + ' km';
  };

  const deg2rad = (deg) => deg * (Math.PI / 180);

  const handleRequest = async () => {
    try {
      setLoading(true);
      
      const response = await axios.post(`${API_BASE_URL}/request-service`, {
        vendorId: vendor.id,
        customerId: 1, 
        serviceType: serviceType,
        distance: calculateDistance(vendor.latitude, vendor.longitude),
        customerLocation: userLocation,
        vendorLocation: {
          latitude: vendor.latitude,
          longitude: vendor.longitude,
        },
      });
  
      if (response.data.success) {
        setRequestStatus('requested');
        Alert.alert('Success', 'Request sent to vendor');
      } else {
        Alert.alert('Failed', 'Could not send the request');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Image
        key={i}
        source={i < rating ? starFilled : starUnfilled}
        style={styles.starIcon}
      />
    ));
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#00B1D0" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image source={backArrow} style={styles.backIcon} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image source={icon} style={styles.serviceIcon} />
          <Text style={styles.serviceType}>{serviceType}</Text>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <Text style={styles.businessName}>
              {vendor.business_name || vendor.fullName}
            </Text>
            {vendor.status === 'approved' && (
              <View style={styles.verifiedSection}>
                <Image source={verified} style={styles.verifiedIcon} />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            )}
          </View>

          <View style={styles.detailsSection}>
            <Text style={styles.detailLabel}>Service Type:</Text>
            <Text style={styles.detailValue}>
              {vendor.service_type || serviceType}
            </Text>
          </View>

          {vendor.working_hours && (
            <View style={styles.detailsSection}>
              <Text style={styles.detailLabel}>Working Hours:</Text>
              <Text style={styles.detailValue}>{vendor.working_hours}</Text>
            </View>
          )}

          <View style={styles.detailsSection}>
            <Text style={styles.detailLabel}>Distance:</Text>
            <Text style={styles.detailValue}>
              {calculateDistance(vendor.latitude, vendor.longitude)}
            </Text>
          </View>

          <View style={styles.detailsSection}>
            <Text style={styles.detailLabel}>Contact:</Text>
            <Text style={styles.detailValue}>{vendor.phone || 'N/A'}</Text>
          </View>

          <View style={styles.detailsSection}>
            <Text style={styles.detailLabel}>Email:</Text>
            <Text style={styles.detailValue}>{vendor.email || 'N/A'}</Text>
          </View>

          <View style={styles.ratingSection}>
            <Text style={styles.ratingText}>Rating:</Text>
            <View style={styles.starsContainer}>
              {renderStars(4)}
              <Text style={styles.ratingValue}>4.0</Text>
            </View>
          </View>
        </View>

        <View style={styles.mapContainer}>
          <Text style={styles.mapTitle}>Location</Text>
          <View style={styles.mapPlaceholder}>
            {vendor.latitude && vendor.longitude ? (
              <Image
                source={{
                  uri: `https://maps.googleapis.com/maps/api/staticmap?center=${vendor.latitude},${vendor.longitude}&zoom=15&size=400x200&markers=color:red%7C${vendor.latitude},${vendor.longitude}&key=AIzaSyA1t7wJwrJXT5AQEWVRQfawMdeW10fJ9Es`,
                }}
                style={styles.mapImage}
              />
            ) : (
              <Text style={styles.noLocationText}>Location not available</Text>
            )}
          </View>
          <Text style={styles.addressText}>
            {vendor.business_name || vendor.fullName} location
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.requestButton,
          requestStatus === 'requested' && styles.requestedButton,
        ]}
        onPress={handleRequest}
        disabled={requestStatus === 'requested' || loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.requestButtonText}>
            {requestStatus === 'requested' ? 'Request Sent' : 'Request Service'}
          </Text>
        )}
      </TouchableOpacity>

      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.footerIconContainer}
          onPress={() => navigation.navigate('Homes')}
        >
          <Image source={Home} style={styles.footerIcon} />
          <Text style={styles.footerIconText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerIconContainer}
          onPress={() => navigation.navigate('Likes')}
        >
          <Image source={Like} style={styles.footerIcon} />
          <Text style={styles.footerIconText}>Favourites</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerIconContainer}
          onPress={() => navigation.navigate('Servicess')}
        >
          <Image source={Category} style={styles.footerIcon} />
          <Text style={styles.footerIconText}>Services</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerIconContainer}
          onPress={() => navigation.navigate('Locationss')}
        >
          <Image source={LocationIcon} style={styles.footerIcon} />
          <Text style={styles.footerIconText}>Location</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerIconContainer}
          onPress={() => navigation.navigate('Discountss')}
        >
          <Image source={Discount} style={styles.footerIcon} />
          <Text style={styles.footerIconText}>Discounts</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1FFF3',
    paddingBottom: height * 0.1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1FFF3',
  },
  backButton: {
    position: 'absolute',
    top: height * 0.05,
    left: 20,
    zIndex: 10,
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  scrollContainer: {
    paddingTop: height * 0.1,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  serviceIcon: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  serviceType: {
    fontFamily: 'Montserrat',
    fontSize: 20,
    color: '#00B1D0',
    fontWeight: 'bold',
  },
  profileSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  businessName: {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  verifiedSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  verifiedText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: 'green',
  },
  detailsSection: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailLabel: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#505050',
    width: 120,
  },
  detailValue: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#505050',
    flex: 1,
  },
  ratingSection: {
    marginTop: 15,
  },
  ratingText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#505050',
    marginBottom: 5,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 20,
    height: 20,
    marginRight: 2,
  },
  ratingValue: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#505050',
    marginLeft: 10,
  },
  mapContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mapTitle: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00B1D0',
    marginBottom: 10,
  },
  mapPlaceholder: {
    height: 150,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  noLocationText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#505050',
  },
  addressText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#505050',
  },
  requestButton: {
    backgroundColor: '#00B1D0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  requestedButton: {
    backgroundColor: '#4CAF50',
  },
  requestButtonText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  footerContainer: {
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
    fontSize: 12,
    fontStyle: 'italic',
    fontWeight: '300',
    lineHeight: 12,
    textAlign: 'center',
    color: '#000000',
    marginTop: 5,
  },
  footerIcon: {
    width: 30,
    height: 30,
  },
});

export default ViewProfile;