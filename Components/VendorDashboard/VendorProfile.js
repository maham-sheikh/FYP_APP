import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Logo from "../../assets/icon.png";
import Home from "../../assets/Home.png";
import Discount from "../../assets/Discounts.png";
import Location from "../../assets/Location.png";

const { width, height } = Dimensions.get("window");

function VendorProfile() {
  const navigation = useNavigation();
  const route = useRoute();
  const [vendorData, setVendorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const vendorId = route.params?.vendorId;

  useEffect(() => {
    if (!vendorId) {
      setError("No vendor ID provided");
      setLoading(false);
      return;
    }

    const fetchVendorProfile = async () => {
      try {
        const response = await fetch(
          `http://192.168.18.244:8000/api/vendor/profile?id=${vendorId}`
        );
        const data = await response.json();

        if (data.status === "success") {
          setVendorData(data.data);
        } else {
          setError(data.message || "Failed to fetch vendor data");
        }
      } catch (err) {
        setError("Network error. Please try again.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVendorProfile();
  }, [vendorId]);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => navigation.navigate("VendorLogin"),
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#00B1D0" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.containerAS}>
      {/* Top Blue Header */}
      <View style={styles.containerhome}>
        <Image source={Logo} style={styles.imageAS} />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {vendorData && (
          <View style={styles.profileContent}>
            <Text style={styles.profileName}>{vendorData.fullName}</Text>
            <Text style={styles.profileEmail}>{vendorData.email}</Text>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Business Information</Text>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Phone:</Text>
                <Text style={styles.infoValue}>{vendorData.phone}</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Business Category:</Text>
                <Text style={styles.infoValue}>
                  {vendorData.businessCategory}
                </Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Service:</Text>
                <Text style={styles.infoValue}>{vendorData.subService}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation Bar */}
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
          <Image source={Location} style={styles.footerIcon} />
          <Text style={styles.footerIconText}>Location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIconContainer}>
          <Image source={Discount} style={styles.footerIcon} />
          <Text style={styles.footerIconText}>My Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
  scrollContainer: {
    paddingHorizontal: width * 0.05,
    paddingBottom: height * 0.1,
  },
  profileContent: {
    marginTop: height * 0.03,
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    elevation: 4,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#00B1D0",
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: "#666666",
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
  },
  logoutButton: {
    backgroundColor: "#00B1D0",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
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
  footerIcon: {
    width: width < 350 ? 25 : 30,
    height: width < 350 ? 25 : 30,
  },
  footerIconText: {
    fontSize: width < 350 ? 10 : 12,
    fontStyle: "italic",
    fontWeight: "300",
    color: "#000000",
    marginTop: 5,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1FFF3",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1FFF3",
    padding: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});

export default VendorProfile;
