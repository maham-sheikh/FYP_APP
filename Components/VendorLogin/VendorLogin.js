import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import icon from "../../assets/icon.png";
import { useFonts } from "expo-font";
import axios from "axios";

const { width, height } = Dimensions.get("window");

function VendorLogin({ navigation }) {
  const [fontsLoaded] = useFonts({
    Poppins: require("../../assets/Poppins-Regular.ttf"),
    Montserrat: require("../../assets/Montserrat-Regular.ttf"),
  });

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [vendorSession, setVendorSession] = useState(null);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#00B1D0" style={styles.loaderSr} />;
  }

  const handleLogin = async () => {
    console.log("Login button clicked");
    if (!phone || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const phoneRegex = /^\+\d{1,3}\d{9,14}$/; 
    if (!phoneRegex.test(phone)) {
      Alert.alert("Error", "Please enter a valid phone number (e.g., +923211315301).");
      return;
    }

    setIsLoading(true);
    console.log("Sending login request...");

    try {
      const response = await axios.post("http://192.168.18.244:8000/api/vendor/login", {
        phone,
        password,
      });

      console.log("API Response:", response.data);

      if (response.status === 200) {
        const vendor = response.data.vendor;

        if (vendor) {
          setVendorSession(vendor);
          Alert.alert("Success", "Login successful!", [
            {
              text: "OK",
              onPress: () => navigation.navigate("VendorDashboard", { vendorId: vendor.id }),
            },
          ]);
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);

      if (error.response) {
        if (error.response.status === 401) {
          Alert.alert("Error", "Invalid phone or password.");
        } else {
          Alert.alert("Error", error.response.data.message || "An error occurred.");
        }
      } else if (error.request) {
        Alert.alert("Error", "No response from the server. Please try again.");
      } else {
        Alert.alert("Error", "An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
      console.log("Login process completed");
    }
  };

  return (
    <View style={styles.containerAS}>
      <View style={styles.containerhome}>
        <Image source={icon} style={styles.imageAS} />
        <Text style={styles.textAS}>FINDIGO</Text>
        <Text style={styles.textAS}>Your Business, Everyone's Solution</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.placeholder}>Phone Number</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPhone}
          value={phone}
          placeholder="Enter Your Phone Number (e.g., +923211315301)"
          keyboardType="phone-pad"
          autoCapitalize="none"
        />
        <Text style={styles.placeholder}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  containerAS: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1FFF3",
    paddingBottom: height * 0.1,
    gap: 20,
  },
  containerhome: {
    backgroundColor: "#00B1D0",
    width: "100%",
    height: height * 0.25,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
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
  inputContainer: {
    padding: 10,
    marginBottom: 30,
    justifyContent: "center",
    width: width * 0.8,
  },
  placeholder: {
    fontSize: width * 0.04,
    color: "#333",
    fontWeight: "600",
    fontFamily: "Poppins",
    marginBottom: 5,
    marginTop: 5,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    marginBottom: 15,
    height: height * 0.06,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    backgroundColor: "#00B1D0",
    borderRadius: 50,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.1,
    marginVertical: height * 0.02,
    width: width * 0.75,
    height: height * 0.08,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontFamily: "Montserrat",
    fontSize: width * 0.05,
    fontWeight: "700",
    lineHeight: width * 0.07,
    textAlign: "left",
    textDecorationStyle: "solid",
    color: "#FFFFFF",
  },
  forgotPasswordText: {
    color: "#00B1D0",
    marginTop: 15,
  },
});

export default VendorLogin;