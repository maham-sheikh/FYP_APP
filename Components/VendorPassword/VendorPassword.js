import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import BackArrow from "../../assets/arrow.png";

const { width, height } = Dimensions.get("window");

function VendorPassword() {
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
  } = route.params;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});

  const handleContinue = () => {
    let newErrors = {};

    if (!password.trim()) newErrors.password = "Password is required";
    if (!confirmPassword.trim())
      newErrors.confirmPassword = "Confirm Password is required";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigation.navigate("BusinessServices", {
        fullName,
        cnic,
        email,
        phone,
        gender,
        address,
        postalCode,
        city,
        password,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerhome}>
        <Text style={styles.header}>Create Password</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("VendorAdress",{
            fullName,
            cnic,
            email,
            phone,
            gender,
            address,
            postalCode,
            city,
          })}
        >
          <Image source={BackArrow} style={styles.arrowImage} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.containerA}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={[styles.input, errors.password && { borderColor: "red" }]}
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={[
            styles.input,
            errors.confirmPassword && { borderColor: "red" },
          ]}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
        />
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        )}

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

export default VendorPassword;