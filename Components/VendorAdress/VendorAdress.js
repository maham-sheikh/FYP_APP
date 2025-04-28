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
  KeyboardAvoidingView,
  Platform,
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

    if (!address.trim()) {
      newErrors.address = "Full Address is required";
    } else if (address.trim().length < 10) {
      newErrors.address = "Address must be detailed (House No, Street, Area)";
    }

    if (!postalCode.trim()) {
      newErrors.postalCode = "Postal Code is required";
    } else if (!/^\d{5,6}$/.test(postalCode)) {
      newErrors.postalCode = "Postal Code must be 5 or 6 digits only";
    }

    if (!city.trim()) {
      newErrors.city = "City is required";
    } else if (!/^[a-zA-Z\s]+$/.test(city)) {
      newErrors.city = "City must contain only letters";
    }

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
        <Image source={Address} style={styles.imageAS} />
        <Text style={styles.header}>Business Address</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
            navigation.navigate("VendorSignup", {
              fullName,
              cnic,
              email,
              phone,
              gender,
            })
          }
        >
          <Image source={BackArrow} style={styles.arrowImage} />
        </TouchableOpacity>
      </View>

      {/* KeyboardAvoidingView used */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.containerA}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Full Address */}
          <Text style={styles.label}>Full Address</Text>
          <TextInput
            style={[styles.input, errors.address && { borderColor: "red" }]}
            placeholder="House No, Street, Area Name"
            value={address}
            onChangeText={setAddress}
          />
          {errors.address && (
            <Text style={styles.errorText}>{errors.address}</Text>
          )}

          {/* Postal Code */}
          <Text style={styles.label}>Postal Code</Text>
          <TextInput
            style={[styles.input, errors.postalCode && { borderColor: "red" }]}
            placeholder="Postal Code (5 or 6 digits)"
            value={postalCode}
            onChangeText={(text) => {
              const numericText = text.replace(/[^0-9]/g, "").slice(0, 6);
              setPostalCode(numericText);
            }}
            keyboardType="numeric"
          />
          {errors.postalCode && (
            <Text style={styles.errorText}>{errors.postalCode}</Text>
          )}

          {/* City */}
          <Text style={styles.label}>City</Text>
          <TextInput
            style={[styles.input, errors.city && { borderColor: "red" }]}
            placeholder="Enter City Name"
            value={city}
            onChangeText={(text) => {
              const lettersOnly = text.replace(/[^a-zA-Z\s]/g, "");
              setCity(lettersOnly);
            }}
          />
          {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}

          <View style={styles.warningContainer}>
            <Image source={ExclamationIcon} style={styles.warningIcon} />
            <Text style={styles.warningText}>
              Address must include complete details (House No, Street, Area,
              City).
            </Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    width: width * 0.2,
    height: undefined,
    aspectRatio: 1,
    marginTop: width * 0.1,
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
    marginBottom: 20,
    marginTop: 10,
  },
  containerA: {
    width: width * 0.76,
    marginTop: height * 0.27,
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
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    marginBottom: 15,
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: height * 0.052,
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
