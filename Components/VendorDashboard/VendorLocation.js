import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import * as Location from "expo-location";

import Logo from "../../assets/icon.png";
import Home from "../../assets/Home.png";
import Discount from "../../assets/Discounts.png";
import LocationIcon from "../../assets/Location.png";

const { width, height } = Dimensions.get("window");

const DEFAULT_VALUES = {
  location: {
    latitude: 31.5204,
    longitude: 74.3587,
  },
  businessName: "",
  workingHours: "",
  serviceType: "",
};

const MapWebView = ({ latitude, longitude }) => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          html, body, #map {
            height: 100%;
            margin: 0;
            padding: 0;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          function initMap() {
            const location = { lat: ${latitude}, lng: ${longitude} };
            const map = new google.maps.Map(document.getElementById('map'), {
              zoom: 14,
              center: location,
              disableDefaultUI: true
            });
            new google.maps.Marker({
              position: location,
              map: map,
              title: "Your Location"
            });
          }
        </script>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA1t7wJwrJXT5AQEWVRQfawMdeW10fJ9Es&callback=initMap" async defer></script>
      </body>
    </html>
  `;
  return (
    <WebView
      originWhitelist={["*"]}
      source={{ html }}
      style={{ height: height * 0.3 }}
      javaScriptEnabled
      domStorageEnabled
      startInLoadingState
    />
  );
};

const VendorLocation = () => {
  const [businessName, setBusinessName] = useState(null);
  const [workingHours, setWorkingHours] = useState(null);
  const [serviceType, setServiceType] = useState(null);
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const vendorId = route.params?.vendorId;

  useEffect(() => {
    const fetchVendorLocation = async () => {
      try {
        const response = await fetch(
          `http://192.168.18.244:8000/api/location/${vendorId}`
        );
        const data = await response.json();

        if (response.ok && data.success) {
          setLocation({
            latitude: parseFloat(data.data.latitude),
            longitude: parseFloat(data.data.longitude),
          });
          setBusinessName(data.data.business_name);
          setWorkingHours(data.data.working_hours);
          setServiceType(data.data.service_type);
        } else if (response.status === 404) {
          console.log("No existing location found");
        }
      } catch (error) {
        console.error("Error fetching location:", error);
      } finally {
        setIsDataLoaded(true);
      }
    };

    if (vendorId) {
      fetchVendorLocation();
    }
  }, [vendorId]);

  const handleGetCurrentLocation = async () => {
    setIsGettingLocation(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Location permission is required");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
      Alert.alert("Success", "Current location set");
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert("Error", "Failed to get current location");
    } finally {
      setIsGettingLocation(false);
    }
  };

  const handleSave = async () => {
    if (!location) {
      Alert.alert("Error", "Location not available.");
      return;
    }

    setIsLoading(true);
    try {
      const updateResponse = await fetch(
        `http://192.168.18.244:8000/api/location/${vendorId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            latitude: location.latitude,
            longitude: location.longitude,
            businessName: businessName || DEFAULT_VALUES.businessName,
            workingHours: workingHours || DEFAULT_VALUES.workingHours,
            serviceType: serviceType || DEFAULT_VALUES.serviceType,
          }),
        }
      );

      const updateData = await updateResponse.json();

      if (updateResponse.ok) {
        Alert.alert("Success", updateData.message);
      } else if (updateResponse.status === 404) {
        const createResponse = await fetch(
          "http://192.168.18.244:8000/api/location/save",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              vendorId,
              latitude: location.latitude,
              longitude: location.longitude,
              businessName: businessName || DEFAULT_VALUES.businessName,
              workingHours: workingHours || DEFAULT_VALUES.workingHours,
              serviceType: serviceType || DEFAULT_VALUES.serviceType,
            }),
          }
        );

        const createData = await createResponse.json();
        if (createResponse.ok) {
          Alert.alert("Success", createData.message);
        } else {
          Alert.alert(
            "Error",
            createData.message || "Failed to create location"
          );
        }
      } else {
        Alert.alert("Error", updateData.message || "Failed to update location");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Failed to connect to server");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isDataLoaded) {
    return (
      <SafeAreaView style={styles.loaderSr}>
        <ActivityIndicator size="large" color="#00B1D0" />
      </SafeAreaView>
    );
  }

  const displayLocation = location || DEFAULT_VALUES.location;
  const displayBusinessName = businessName || DEFAULT_VALUES.businessName;
  const displayWorkingHours = workingHours || DEFAULT_VALUES.workingHours;
  const displayServiceType = serviceType || DEFAULT_VALUES.serviceType;

  return (
    <View style={styles.containerAS}>
      <View style={styles.containerhome}>
        <Image source={Logo} style={styles.imageAS} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <MapWebView
          latitude={displayLocation.latitude}
          longitude={displayLocation.longitude}
        />

        <TouchableOpacity
          style={styles.buttonLocation}
          onPress={handleGetCurrentLocation}
          disabled={isGettingLocation}
        >
          <Text style={styles.textLocation}>
            {isGettingLocation ? "Getting Location..." : "Use Current Location"}
          </Text>
        </TouchableOpacity>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Business Name</Text>
          <TextInput
            style={styles.input}
            value={displayBusinessName}
            onChangeText={setBusinessName}
            placeholder="e.g. ABC Store"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Working Hours</Text>
          <TextInput
            style={styles.input}
            value={displayWorkingHours}
            onChangeText={setWorkingHours}
            placeholder="e.g. 9:00 - 22:00 or 24/7"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Service Type</Text>
          <TextInput
            style={styles.input}
            value={displayServiceType}
            onChangeText={setServiceType}
            placeholder="e.g. Home Service or Cardiac Care"
          />
        </View>

        <TouchableOpacity
          style={styles.buttonSave}
          onPress={handleSave}
          disabled={isLoading}
        >
          <Text style={styles.textSave}>
            {isLoading ? "Saving..." : "Save Location"}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footerContainerAS}>
        <TouchableOpacity
          style={styles.footerIconContainer}
          onPress={() => navigation.navigate("VendorDashboard", { vendorId })}
        >
          <Image source={Home} style={styles.footerIcon} />
          <Text style={styles.footerIconText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerIconContainer}
          onPress={() => navigation.navigate("VendorLocation", { vendorId })}
        >
          <Image source={LocationIcon} style={styles.footerIcon} />
          <Text style={styles.footerIconText}>Location</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerIconContainer}
          onPress={() => navigation.navigate("VendorProfile", { vendorId })}
        >
          <Image source={Discount} style={styles.footerIcon} />
          <Text style={styles.footerIconText}>My Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerAS: {
    flex: 1,
    backgroundColor: "#F1FFF3",
    paddingBottom: height * 0.1,
  },
  containerhome: {
    backgroundColor: "#00B1D0",
    width: "100%",
    height: height * 0.25,
    alignItems: "center",
    justifyContent: "center",
  },
  imageAS: {
    width: width * 0.25,
    height: undefined,
    aspectRatio: 1,
    marginTop: width * 0.03,
  },
  scrollViewContent: {
    paddingHorizontal: width * 0.05,
    paddingTop: 10,
    paddingBottom: 100,
    gap: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: width * 0.04,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
    fontFamily: "Poppins",
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 15,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  buttonLocation: {
    backgroundColor: "#FFFFFF",
    borderColor: "#00B1D0",
    borderWidth: 1,
    width: "100%",
    borderRadius: 5,
    height: height * 0.05,
    alignItems: "center",
    justifyContent: "center",
  },
  textLocation: {
    fontFamily: "Montserrat",
    fontSize: width * 0.035,
    fontStyle: "italic",
    fontWeight: "500",
    color: "#00B1D0",
  },
  buttonSave: {
    backgroundColor: "#00B1D0",
    width: "60%",
    alignSelf: "center",
    borderRadius: 5,
    height: height * 0.05,
    alignItems: "center",
    justifyContent: "center",
  },
  textSave: {
    fontFamily: "Montserrat",
    fontSize: width * 0.035,
    fontStyle: "italic",
    fontWeight: "500",
    color: "#FFFFFF",
  },
  footerContainerAS: {
    width: "100%",
    height: height * 0.1,
    backgroundColor: "#00B1D0",
    position: "absolute",
    bottom: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingBottom: 10,
    paddingTop: 5,
  },
  footerIconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  footerIconText: {
    fontFamily: "Poppins",
    fontSize: width < 350 ? 10 : 12,
    fontStyle: "italic",
    fontWeight: "300",
    lineHeight: 12,
    textAlign: "center",
    color: "#000000",
    marginTop: 5,
  },
  footerIcon: {
    width: width < 350 ? 25 : 30,
    height: width < 350 ? 25 : 30,
  },
  loaderSr: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1FFF3",
  },
});

export default VendorLocation;
