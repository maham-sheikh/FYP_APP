import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { auth, firebaseConfig, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from "../../firebaseConfig";

const { width, height } = Dimensions.get("window");

function VendorVerifySignup() {
  const navigation = useNavigation();
  const route = useRoute();
  const { fullName, cnic, email, phone, gender } = route.params;

  const [code, setCode] = useState(new Array(6).fill(""));
  const inputRefs = useRef(code.map(() => React.createRef()));
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);

  useEffect(() => {
    sendOTP(); 
  }, []);

  const sendOTP = async () => {
    try {
      const formattedPhone = `+${phone}`; 
      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        recaptchaVerifier.current
      );
      setVerificationId(confirmation.verificationId);
      Alert.alert("Success", "OTP has been sent to your phone.");
    } catch (error) {
      console.error("OTP Error:", error);
      Alert.alert("Error", "Failed to send OTP. Please try again.");
    }
  };

  const handleVerify = async () => {
    const otp = code.join("");
    if (otp.length !== 6) {
      Alert.alert("Error", "Please enter a valid 6-digit code.");
      return;
    }

    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await signInWithCredential(auth, credential); 
      await auth.signOut(); 
      Alert.alert("Success", "Phone number verified successfully!");
      navigation.navigate("VendorAdress", {
        fullName,
        cnic,
        email,
        phone,
        gender,
      });
    } catch (error) {
      console.error("Verification Error:", error);
      Alert.alert("Error", "Invalid OTP. Please try again.");
    }
  };

  const handleChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < code.length - 1) {
      inputRefs.current[index + 1].current.focus();
    }
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig} 
      />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("VendorSignup")}
      >
        <Image source={require("../../assets/arrow.png")} style={styles.arrowImage} />
      </TouchableOpacity>

      <Text style={styles.header}>Check your Phone Number</Text>
      <Text style={styles.subText}>
        Verification code sent to <Text style={styles.boldText}>{phone}</Text>
      </Text>
      <Text>Enter the 6-digit code for signup verification.</Text>

      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={inputRefs.current[index]}
            style={styles.codeInput}
            value={digit}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace" && !digit && index > 0) {
                inputRefs.current[index - 1].current.focus();
              }
            }}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify Code</Text>
      </TouchableOpacity>

      <Text style={styles.resendText}>
        Haven't received the OTP?{" "}
        <Text style={styles.linkText} onPress={sendOTP}>
          Resend OTP
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1FFF3",
    paddingBottom: height * 0.1,
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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginVertical: 20,
  },
  codeInput: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    textAlign: "center",
    fontSize: 18,
    width: 40,
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: "#00B1D0",
    padding: 15,
    width: "80%",
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  resendText: {
    marginTop: 15,
  },
  linkText: {
    color: "#00B1D0",
    fontWeight: "bold",
  },
});

export default VendorVerifySignup;