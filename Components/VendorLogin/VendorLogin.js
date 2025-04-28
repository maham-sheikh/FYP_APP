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
import BackArrow from "../../assets/arrow.png";

const { width, height } = Dimensions.get("window");

function VendorLogin({ navigation }) {
  const [fontsLoaded] = useFonts({
    Poppins: require("../../assets/Poppins-Regular.ttf"),
    Montserrat: require("../../assets/Montserrat-Regular.ttf"),
  });

  const [phone, setPhone] = useState("+92"); // Start with +92
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

    const phoneRegex = /^\+92\d{10}$/; // Only +92 and exactly 10 digits
    if (!phoneRegex.test(phone)) {
      Alert.alert("Error", "Please enter a valid phone number");
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
    <View style={styles.container}>
      <View style={styles.containerhome}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("BuisnessSide")}
        >
          <Image source={BackArrow} style={styles.arrowImage} />
        </TouchableOpacity>
        <Image source={icon} style={styles.imageAS} />
        <Text style={styles.textAS}>FINDIGO</Text>
        <Text style={styles.textAAS}>Your Business, Everyone's Solution</Text>
      </View>

      <View style={styles.containerA}>
        <Text style={styles.placeholder}>Phone Number</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            if (!text.startsWith("+92")) {
              text = "+92";
            }
            const afterPrefix = text.slice(3).replace(/[^0-9]/g, "").slice(0, 10); 
            setPhone("+92" + afterPrefix);
          }}
          value={phone}
          placeholder="Enter Your Phone Number"
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
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F1FFF3",
    paddingBottom: height * 0.02,
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
  textAS: {
    fontFamily: "Poppins",
    fontStyle: "italic",
    fontWeight: "500",
    lineHeight: 29.26,
    textAlign: "center",
    color: "#ffffff",
    fontSize: width < 350 ? 18 : width * 0.07,
  },
  textAAS: {
    fontStyle: "italic",
    fontWeight: "300",
    lineHeight: 29.26,
    textAlign: "center",
    color: "#ffffff",
    fontSize: width < 350 ? 18 : width * 0.04,
  },
  imageAS: {
    resizeMode: "contain",
    width: width * 0.15,
    height: undefined,
    aspectRatio: 1,
    marginBottom: width * 0.04,
    marginTop: width * 0.08,
  },
  containerA: {
    width: width * 0.8,
    marginTop: height * 0.28,
    alignSelf: "center",
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
    marginVertical: height * 0.05,
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
    marginTop: width * 0.01,
    fontSize: 17,
    textDecorationLine: "underline",
  },
});

export default VendorLogin;
