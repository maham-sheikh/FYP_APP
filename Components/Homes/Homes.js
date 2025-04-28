import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; 
import axios from 'axios';
import Logo from '../../assets/icon.png';
import Home from '../../assets/Home.png';
import Like from '../../assets/Favourities.png';
import Category from '../../assets/Servies.png';
import Discount from '../../assets/Discounts.png';
import Location from '../../assets/Location.png';
import SavePic from '../../assets/save.png';
import addB from '../../assets/addBuisness.png';
import { useFonts } from 'expo-font';
import icon from "../../assets/icon.png";
import BackArrow from "../../assets/arrow.png";

const { width, height } = Dimensions.get('window');
const API_BASE_URL = 'http://192.168.18.244:8000/api';

function Homes() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Poppins: require('../../assets/Poppins-Regular.ttf'),
    Montserrat: require('../../assets/Montserrat-Regular.ttf'),
    Inter: require('../../assets/Inter-Regular.ttf'),
  });
  
  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  
  const customerId = 1;

  const fetchCustomerRequests = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/customer-requests`, {
        params: { customerId }
      });
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoadingRequests(false);
    }
  };

  useEffect(() => {
    fetchCustomerRequests();
    const interval = setInterval(fetchCustomerRequests, 5000);
    return () => clearInterval(interval);
  }, []);
  
  const navigateToHome = () => {
    navigation.navigate('Discountss'); 
  };

  const navigateToB = () => {
    navigation.navigate('BuisnessSide'); 
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
  const handleDeleteRequest = async (requestId) => {
    try {
      Alert.alert(
        'Delete Request',
        'Are you sure you want to delete this request?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: async () => {
              await axios.delete(`${API_BASE_URL}/delete-request`, {
                data: { requestId }
              });
              setRequests(requests.filter(req => req.id !== requestId));
            },
            style: 'destructive',
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error deleting request:', error);
      Alert.alert('Error', 'Failed to delete request');
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

  const renderRequests = () => {
    if (loadingRequests) {
      return <ActivityIndicator size="small" color="#00B1D0" style={styles.loader} />;
    }

    if (requests.length === 0) {
      return null;
    }

    return (
      <View style={styles.requestsContainer}>
        <Text style={styles.requestsHeader}>Your Service Requests</Text>
        {requests.map(request => (
          <View key={request.id} style={styles.requestCard}>
            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={() => handleDeleteRequest(request.id)}
            >
              <MaterialIcons name="delete" size={24} color="#F44336" />
            </TouchableOpacity>

            <Text style={styles.requestVendor}>{request.vendor_name}</Text>
            <Text style={styles.requestService}>{request.service_type}</Text>
            <View style={styles.requestStatusRow}>
              <Text style={[
                styles.requestStatus,
                request.status === 'accepted' && styles.statusAccepted,
                request.status === 'rejected' && styles.statusRejected
              ]}>
                Status: {request.status}
              </Text>
              <Text style={styles.requestTime}>{formatTimeAgo(request.created_at)}</Text>
            </View>
            
            {request.status === 'accepted' && (
              <TouchableOpacity 
                style={styles.completeButton}
                onPress={() => handleCompleteRequest(request.id)}
              >
                <Text style={styles.completeButtonText}>Mark Completed</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    );
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#00B1D0" style={styles.loaderSr} />;
  }

  return (
    <View style={styles.containerAS}>
      <View style={styles.containerhome}>
          <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => navigation.navigate("CustomerSide")}
                >
                  <Image source={BackArrow} style={styles.arrowImage} />
                </TouchableOpacity>
        <Image source={Logo} style={styles.imageAS} />
      </View>

      <ScrollView>
        {renderRequests()}

        <View style={styles.saveC}>
          <Text style={styles.saveT}>Enjoy Special Savings and Promotions</Text>
          <Image source={SavePic} style={styles.saveP} />
          <TouchableOpacity style={styles.buttonSave} onPress={navigateToHome} activeOpacity={0.7}>
            <Text style={styles.textSave}>Savings</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.addC}>
          <Text style={styles.addT}>Grow Your Buisness with us</Text>
          <View style={styles.addC1}>
            <View style={styles.addC2}>
              <Image source={addB} style={styles.addB1}/>
            </View>
            <View style={styles.addC3}>
              <Text style={styles.addT1}>Join us and reach an audience that's 40% more likely to convert into loyal customers. Boost your sales and watch your business grow!</Text>
              <TouchableOpacity style={styles.buttonB} onPress={navigateToB} activeOpacity={0.7}>
                <Text style={styles.addT2}>Add Business</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footerContainerAS}>
        <TouchableOpacity style={styles.footerIconContainer} onPress={() => navigation.navigate('Homes')}>
          <Image source={Home} style={styles.footerIcon} />
          <Text style={styles.footerIconText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIconContainer} onPress={() => navigation.navigate('Likes')}>
          <Image source={Like} style={styles.footerIcon} />
          <Text style={styles.footerIconText}>Favourites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIconContainer} onPress={() => navigation.navigate('Servicess')}>
          <Image source={Category} style={styles.footerIcon} />
          <Text style={styles.footerIconText}>Services</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIconContainer} onPress={() => navigation.navigate('Locationss')}>
          <Image source={Location} style={styles.footerIcon} />
          <Text style={styles.footerIconText}>Location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIconContainer} onPress={() => navigation.navigate('Discountss')}>
          <Image source={Discount} style={styles.footerIcon} />
          <Text style={styles.footerIconText}>Discounts</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerAS: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',    
    backgroundColor: '#F1FFF3',
    paddingBottom: height * 0.1,
    gap: 20,
  },
  containerhome: {
    backgroundColor: '#00B1D0',
    width: '100%',
    height: height * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
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
  imageAS: {
    width: width * 0.25, 
    height: undefined,   
    aspectRatio: 1,     
    marginTop: width * 0.03, 
  },
  saveC: {
    borderColor: '#00B1D0',
    borderWidth: 1,
    width: '96%',
    height: height * 0.15,
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: '2%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center', 
    paddingHorizontal: width * 0.03,
  },
  saveP: {
    width: width * 0.25, 
    height: width * 0.25, 
    opacity: 1,
  },
  saveT: {
    color: '#000000',
    fontFamily: 'Inter',
    fontSize: width * 0.034, 
    fontStyle: 'italic',
    fontWeight: '500',
    lineHeight: width * 0.04, 
    textAlign: 'center',
    width: width * 0.26, 
    height: height * 0.06, 
    opacity: 1,
  },
  buttonSave: {
    backgroundColor: '#00B1D0',
    width: width * 0.27,
    height: height * 0.04, 
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSave: {
    fontFamily: 'Montserrat',
    fontSize: width * 0.034, 
    fontStyle: 'italic',
    fontWeight: '500',
    lineHeight: width * 0.035, 
    textAlign: 'center',
    color: '#000000',
  },
  addC: {
    width: '96%',
    marginHorizontal: '2%',
    marginVertical: 10,
    alignItems: 'center',
    gap: 6,
    flexDirection: 'column',
  },
  addT: {
    fontFamily: 'Poppins',
    fontSize: width * 0.055,
    fontStyle: 'italic',
    fontWeight: '600',
    lineHeight: width * 0.075,
    textAlign: 'center',
    color: '#000000',
    marginBottom: height * 0.01,
  },
  addC1: {
    flexDirection: 'row', 
    width: '100%',
    padding: width * 0.022,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    gap: width * 0.05,
  },
  addC2: {
    width: '40%', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  addB1: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  addC3: {
    flex: 1, 
    flexDirection: 'column', 
    justifyContent: 'center',
    gap: height * 0.01,
  },
  addT1: {
    fontFamily: 'Inter',
    fontSize: width * 0.033,
    fontStyle: 'italic',
    fontWeight: '600',
    lineHeight: height * 0.02, 
    textAlign: 'center',
    color: '#000000',
    marginBottom: height * 0.01,
  },
  buttonB: {
    backgroundColor: '#00B1D0',
    width: '60%',
    borderRadius: 5,
    height: height * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  addT2: {
    fontFamily: 'Montserrat',
    fontSize: width * 0.035,
    fontStyle: 'italic',
    fontWeight: '500',
    lineHeight: height * 0.025,
    textAlign: 'center',
    color: '#FFFFFF',
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
  requestsContainer: {
    width: '96%',
    marginHorizontal: '2%',
    marginBottom: 20,
  },
  requestsHeader: {
    fontFamily: 'Poppins',
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#00B1D0',
    marginBottom: 10,
  },
  requestCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  requestVendor: {
    fontFamily: 'Poppins',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  requestService: {
    fontFamily: 'Poppins',
    fontSize: width * 0.035,
    color: '#505050',
    marginVertical: 5,
  },
  requestStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  requestStatus: {
    fontFamily: 'Poppins',
    fontSize: width * 0.035,
    fontStyle: 'italic',
  },
  statusAccepted: {
    color: '#4CAF50',
  },
  statusRejected: {
    color: '#F44336',
  },
  requestTime: {
    fontFamily: 'Poppins',
    fontSize: width * 0.03,
    color: '#A0A0A0',
  },
  completeButton: {
    backgroundColor: '#00B1D0',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  completeButtonText: {
    fontFamily: 'Poppins',
    fontSize: width * 0.035,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
},
  loader: {
    marginVertical: 10,
  },
});

export default Homes;