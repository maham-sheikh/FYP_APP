import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator, Linking, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Logo from '../../assets/icon.png';
import Home from '../../assets/Home.png';
import Discount from '../../assets/Discounts.png';
import Location from '../../assets/Location.png';
import BackArrow from "../../assets/arrow.png";

const { width, height } = Dimensions.get('window');
const API_BASE_URL = 'http://192.168.18.244:8000/api';

function VendorDashboard() {
  const navigation = useNavigation();
  const route = useRoute();
  const vendorId = route.params?.vendorId;
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
    const interval = setInterval(fetchRequests, 5000);
    return () => clearInterval(interval);
  }, [vendorId]);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/requests`, {
        params: { vendorId }
      });
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching service requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAction = async (requestId, action) => {
    try {
      await axios.post(`${API_BASE_URL}/request-action`, {
        requestId,
        action
      });
      setRequests(requests.map(req => 
        req.id === requestId ? { ...req, status: action } : req
      ));
    } catch (error) {
      console.error('Error updating request:', error);
    }
  };

  const handleCompleteRequest = async (requestId) => {
    try {
      await axios.post(`${API_BASE_URL}/complete-request`, { requestId });
      setRequests(requests.filter(req => req.id !== requestId));
    } catch (error) {
      console.error('Error completing request:', error);
      Alert.alert('Error', 'Failed to complete request');
    }
  };

  const formatTimeAgo = (createdAt) => {
    if (!createdAt) return 'Just now';
    const now = new Date();
    const createdDate = new Date(createdAt);
    const diffInMinutes = Math.floor((now - createdDate) / (1000 * 60));
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes === 1) return '1 min ago';
    if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  const openInGoogleMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
         <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => navigation.navigate("VendorLogin")}
                >
                  <Image source={BackArrow} style={styles.arrowImage} />
                </TouchableOpacity>
      <Image source={Logo} style={styles.logo} />
        <Text style={styles.headerTitle}>Your Business, Everyone's Solution</Text>
       
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#00B1D0" style={styles.loader} />
        ) : requests.length === 0 ? (
          <Text style={styles.noRequestsText}>No service requests yet</Text>
        ) : (
          requests.map(request => (
            <View key={request.id} style={styles.requestCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.customerName}>{request.customer_name || 'Anonymous'}</Text>
                <Text style={styles.timeAgo}>{formatTimeAgo(request.created_at)}</Text>
              </View>
              
              <View style={styles.deliverySection}>
                <Text style={styles.deliverToText}>Deliver To</Text>
                <View style={styles.addressRow}>
                  <Text style={styles.addressText}>{request.delivery_address || 'No address provided'}</Text>
                  <TouchableOpacity 
                    onPress={() => {
                      if (request.vendor_location?.latitude && request.vendor_location?.longitude) {
                        openInGoogleMaps(request.vendor_location.latitude, request.vendor_location.longitude);
                      } else {
                        Alert.alert('Error', 'Location not available');
                      }
                    }}
                  >
                    <Text style={styles.viewOnMapText}>View on map</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {request.status === 'pending' && (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity 
                    style={styles.rejectButton}
                    onPress={() => handleRequestAction(request.id, 'rejected')}
                  >
                    <Text style={styles.buttonText}>Reject</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.acceptButton}
                    onPress={() => handleRequestAction(request.id, 'accepted')}
                  >
                    <Text style={styles.buttonText}>Accept</Text>
                  </TouchableOpacity>
                </View>
              )}

              {request.status === 'accepted' && (
                <TouchableOpacity 
                  style={styles.completeButton}
                  onPress={() => handleCompleteRequest(request.id)}
                >
                  <Text style={styles.completeButtonText}>Mark Completed</Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.footerIconContainer} 
          onPress={() => navigation.navigate('VendorDashboard', { vendorId })}
        >
          <Image source={Home} style={styles.footerIcon} />
          <Text style={styles.footerIconText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.footerIconContainer} 
          onPress={() => navigation.navigate('VendorLocation', { vendorId })}
        >
          <Image source={Location} style={styles.footerIcon} />
          <Text style={styles.footerIconText}>Location</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.footerIconContainer} 
          onPress={() => navigation.navigate('VendorProfile', { vendorId })}
        >
          <Image source={Discount} style={styles.footerIcon} />
          <Text style={styles.footerIconText}>My Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1FFF3',
  },
  header: {
    backgroundColor: '#00B1D0',
    width: '100%',
    height: height * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  headerTitle: {
    fontFamily: 'Montserrat',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
    textAlign: 'center',
  },
  logo: {
    width: width * 0.15,
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
    marginBottom: width * 0.04,
    marginTop: width * 0.001,
  },
  backButton: {
    position: "absolute",
    top: height * 0.07,
    left: width * 0.05,
    width: width * 0.1,
    height: width * 0.1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ECECEC",
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#1E1E1E",
  },
  arrowImage: {
    width: width * 0.03,
    height: height * 0.03,
  },
  scrollContainer: {
    width: '100%',
    padding: 20,
    paddingBottom: 100,
  },
  requestCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingBottom: 10,
  },
  customerName: {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  timeAgo: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#505050',
  },
  deliverySection: {
    marginBottom: 15,
  },
  deliverToText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00B1D0',
    marginBottom: 5,
  },
  addressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addressText: {
    fontFamily: 'Poppins',
    fontSize: 15,
    color: '#505050',
    flex: 1,
    marginRight: 10,
  },
  viewOnMapText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#00B1D0',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  rejectButton: {
    backgroundColor: '#F44336',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 10,
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  completeButton: {
    backgroundColor: '#00B1D0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
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
  loader: {
    marginVertical: 20,
  },
  noRequestsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#505050',
    marginTop: 20,
  },
});

export default VendorDashboard;