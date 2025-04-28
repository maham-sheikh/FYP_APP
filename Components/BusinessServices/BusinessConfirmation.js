import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import BackArrow from "../../assets/arrow.png";
import icon from "../../assets/icon.png";
import ExclamationIcon from "../../assets/exclamation.png";

const { width, height } = Dimensions.get("window");

const BusinessConfirmation = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    fullName,
    cnic,
    email,
    phone,
    gender,
    address,
    postalCode,
    city,
    password,
    businessCategory,
    subService,
  } = route.params;

  const handleConfirm = async () => {
    try {
      const payload = {
        fullName,
        cnic,
        email,
        phone,
        gender,
        address,
        postalCode,
        city,
        password,
        businessCategory,
        subService,
        status: "pending",
      };

      const response = await axios.post(
        "http://192.168.18.244:8000/api/business",
        payload
      );

      if (response.status === 201) {
        Alert.alert(
          "Confirmation",
          "Your application has been submitted successfully.",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("BusinessVerification"),
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      if (error.response) {
        Alert.alert(
          "Error",
          error.response.data.message || "An error occurred."
        );
      } else if (error.request) {
        Alert.alert("Error", "No response from the server. Please try again.");
      } else {
        Alert.alert("Error", "An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerhome}>
        <Image source={icon} style={styles.imageAS} />
        <Text style={styles.textAS}>FINDIGO</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("BusinessServices")}
        >
          <Image source={BackArrow} style={styles.arrowImage} />
        </TouchableOpacity>
      </View>

      <View style={styles.containerA}>
        <Text style={styles.label}>Service Name</Text>
        <Text style={styles.value}>{subService}</Text>

        <Text style={styles.label}>Category</Text>

        <Text style={styles.value}>{businessCategory}</Text>

        <View style={styles.warningContainer}>
          <Image source={ExclamationIcon} style={styles.warningIcon} />
          <Text style={styles.warningText}>
            Once you click the confirm button your application would be
            submitted
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  textAS: {
    fontFamily: "Poppins",
    fontStyle: "italic",
    fontWeight: "500",
    lineHeight: 29.26,
    textAlign: "center",
    color: "#ffffff",
    fontSize: width < 350 ? 18 : width * 0.07,
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
  value: {
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
});

export default BusinessConfirmation;
