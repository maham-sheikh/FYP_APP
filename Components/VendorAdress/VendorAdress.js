import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import BackArrow from "../../assets/arrow.png";
import Address from "../../assets/Address.png";
import ExclamationIcon from "../../assets/exclamation.png";

const { width, height } = Dimensions.get("window");

function VendorAddress() {
  const navigation = useNavigation();
  const route = useRoute();

  const { fullName, cnic, email, phone, gender } = route.params;

  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");

  const [errors, setErrors] = useState({});

  const handleContinue = () => {
    let newErrors = {};

    if (!address.trim()) newErrors.address = "Full Address is required";
    if (!city.trim()) newErrors.city = "City is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigation.navigate("VendorPassword", {
        fullName,
        cnic,
        email,
        phone,
        gender,
        address,
        postalCode,
        city,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerhome}>
        <Text style={styles.header}>Business Address</Text>
        <Image source={Address} style={styles.imageAS} />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("VendorSignup",{fullName, cnic, email, phone, gender,})}
        >
          <Image source={BackArrow} style={styles.arrowImage} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.containerA}>
        <Text style={styles.label}>Full Address</Text>
        <TextInput
          style={[styles.input, errors.address && { borderColor: "red" }]}
          placeholder="Full Address"
          value={address}
          onChangeText={setAddress}
        />
        {errors.address && (
          <Text style={styles.errorText}>{errors.address}</Text>
        )}

        <Text style={styles.label}>Postal Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Postal Code"
          value={postalCode}
          onChangeText={setPostalCode}
          keyboardType="numeric"
        />

        <Text style={styles.label}>City</Text>
        <TextInput
          style={[styles.input, errors.city && { borderColor: "red" }]}
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />
        {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}

        <View style={styles.warningContainer}>
          <Image source={ExclamationIcon} style={styles.warningIcon} />
          <Text style={styles.warningText}>
            Address must all information (including any house/apartment number)
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F1FFF3",
    paddingBottom: height * 0.1,
  },
  containerhome: {
    backgroundColor: "#00B1D0",
    width: "100%",
    height: height * 0.23,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
  },
  imageAS: {
    resizeMode: "contain",
    width: width * 0.15,
    height: width * 0.07,
    height: undefined,
    aspectRatio: 1,
    marginBottom: 20,
    marginTop: 15,
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
  header: {
    fontSize: width < 350 ? 18 : width * 0.07,
    fontWeight: "bold",
    color: "white",
    marginTop: 80,
  },
  containerA: {
    width: width * 0.8,
    marginTop: height * 0.3,
    alignSelf: "center",
  },
  label: {
    fontSize: width * 0.05,
    color: "#333",
    fontWeight: "600",
    fontFamily: "Montserrat",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    marginBottom: 20,
  },
  warningContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
    justifyContent: "flex-start",
    marginTop: 25,
  },
  warningIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  warningText: {
    color: "#333",
    fontFamily: "Poppins",
    fontSize: width * 0.04,
    fontWeight: "400",
    lineHeight: width * 0.06,
    textAlign: "left",
    flexShrink: 1,
    marginLeft: 2,
    flex: 1,
  },
  button: {
    backgroundColor: "#00B1D0",
    padding: 15,
    width: "100%",
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    width: "100%",
    textAlign: "left",
    marginBottom: 5,
  },
});

export default VendorAddress;