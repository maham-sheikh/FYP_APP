import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import loc from '../../assets/myloctionss.png';
import Home from '../../assets/Home.png';
import Like from '../../assets/Favourities.png';
import Category from '../../assets/Servies.png';
import Discount from '../../assets/Discounts.png';
import Location from '../../assets/Location.png';
import { useFonts } from 'expo-font';
import { WebView } from 'react-native-webview';
import { LocationContext } from './locationContext';

const { width, height } = Dimensions.get('window');

function Locationss({ navigation }) {
  const [fontsLoaded] = useFonts({
    Poppins: require('../../assets/Poppins-Regular.ttf'),
    Montserrat: require('../../assets/Montserrat-Regular.ttf'),
  });

  const { location, error, isLoading, getCurrentLocation } = useContext(LocationContext);
  const [mapLoaded, setMapLoaded] = useState(false);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#00B1D0" style={styles.loaderSr} />;
  }

  const mapHtml = location ? `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; }
        #map { height: 100%; width: 100%; }
        .map-overlay {
          position: absolute;
          bottom: 20px;
          left: 20px;
          background: white;
          padding: 10px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
          font-family: Arial, sans-serif;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <div class="map-overlay">Your current location</div>
      <script>
        function initMap() {
          const position = { lat: ${location.latitude}, lng: ${location.longitude} };
          const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 15,
            center: position,
            mapTypeId: 'roadmap',
            styles: [
              {
                "featureType": "poi",
                "stylers": [{ "visibility": "off" }]
              },
              {
                "featureType": "transit",
                "stylers": [{ "visibility": "off" }]
              }
            ],
            disableDefaultUI: true,
            zoomControl: true
          });
          
          new google.maps.Marker({
            position: position,
            map: map,
            icon: {
              url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
            }
          });
          
          window.ReactNativeWebView.postMessage('mapLoaded');
        }
      </script>
      <script async defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA1t7wJwrJXT5AQEWVRQfawMdeW10fJ9Es&callback=initMap">
      </script>
    </body>
    </html>
  ` : '<html><body></body></html>';

  return (
    <View style={styles.containerAS}>
      <Image source={loc} style={styles.imageAS} />
      <Text style={styles.textAS}>Here's your current location</Text>
      
      <View style={styles.mapContainer}>
        {(!mapLoaded || !location || isLoading) && (
          <View style={styles.mapPlaceholder}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#00B1D0" />
            ) : error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : (
              <Text style={styles.loadingText}>Loading map...</Text>
            )}
          </View>
        )}
        <WebView 
          source={{ html: mapHtml }}
          style={styles.map}
          onMessage={(event) => {
            if (event.nativeEvent.data === 'mapLoaded') {
              setMapLoaded(true);
            }
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          mixedContentMode="always"
          onError={() => setMapLoaded(false)}
        />
      </View>

      <TouchableOpacity 
        style={[styles.refreshButton, isLoading && styles.refreshButtonDisabled]}
        onPress={getCurrentLocation}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.refreshButtonText}>
            {error ? 'Retry Location' : 'Update My Location'}
          </Text>
        )}
      </TouchableOpacity>
      
      {error && (
        <Text style={styles.helpText}>
          {error.includes('permission') 
            ? 'Please enable location permissions in settings'
            : 'Make sure you have internet connection and try again'}
        </Text>
      )}
      
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
    paddingTop: height * 0.05,
    paddingBottom: height * 0.1,
  },
  mapContainer: {
    width: '90%',
    height: height * 0.5,
    marginVertical: 20,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: '#FFF',
  },
  mapPlaceholder: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: '#F1FFF3',
  },
  loadingText: {
    fontSize: 16,
    color: '#00B1D0',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  helpText: {
    fontSize: 14,
    color: '#505050',
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 30,
  },
  map: {
    flex: 1,
  },
  imageAS: {
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
    marginBottom: 10,
  },
  refreshButton: {
    backgroundColor: '#00B1D0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginBottom: 15,
    minWidth: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshButtonDisabled: {
    backgroundColor: '#0098B8',
  },
  refreshButtonText: {
    color: '#FFF',
    fontSize: 16,
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
});

export default Locationss;