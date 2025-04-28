import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BackArrow from "../../assets/arrow.png";

const { width, height } = Dimensions.get("window");

function VendorSignup() {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState("");
  const [cnic, setCnic] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState(null);

  const [errors, setErrors] = useState({});

  const handleNext = () => {
    let newErrors = {};

    if (!fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!cnic.trim()) newErrors.cnic = "CNIC is required";
    if (!phone.trim()) newErrors.phone = "Phone is required";
    if (!gender) newErrors.gender = "Gender selection is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigation.navigate("VendorVerifySignup", {
        fullName,
        cnic,
        email,
        phone,
        gender,
      });
    }
  };

  const handleTermsOfUse = () => {
    console.log("Navigate to Terms of Use");
  };

  const handlePrivacyPolicy = () => {
    console.log("Navigate to Privacy Policy");
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
        <Text style={styles.header}>Create Account</Text>
        <Text style={styles.subHeader}>Connect to trusted services</Text>
      </View>
      <ScrollView style={styles.containerA}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          placeholderTextColor="#808080"
          returnKeyType="next"
          onChangeText={(text) => {
            setFullName(text);
            setErrors((prev) => ({ ...prev, fullName: "" }));
          }}
        />
        {errors.fullName ? (
          <Text style={styles.errorText}>{errors.fullName}</Text>
        ) : null}

        <Text style={styles.label}>CNIC</Text>
        <TextInput
          style={styles.input}
          placeholder="CNIC"
          value={cnic}
          placeholderTextColor="#808080"
          onChangeText={setCnic}
          keyboardType="numeric"
          returnKeyType="next"
        />
        {errors.cnic ? (
          <Text style={styles.errorText}>{errors.cnic}</Text>
        ) : null}

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email (Optional)"
          value={email}
          placeholderTextColor="#808080"
          onChangeText={setEmail}
          keyboardType="email-address"
          returnKeyType="next"
        />

        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone"
          placeholderTextColor="#808080"
          value={phone}
          keyboardType="phone-pad"
          returnKeyType="done"
          onChangeText={(text) => {
            setPhone(text);
            setErrors((prev) => ({ ...prev, phone: "" }));
          }}
        />
        {errors.phone ? (
          <Text style={styles.errorText}>{errors.phone}</Text>
        ) : null}

        <Text style={styles.genderText}>Gender</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity
            onPress={() => {
              setGender("Male");
              setErrors((prev) => ({ ...prev, gender: "" }));
            }}
          >
            <Text>{gender === "Male" ? "🔘" : "⭕"} Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setGender("Female");
              setErrors((prev) => ({ ...prev, gender: "" }));
            }}
          >
            <Text>{gender === "Female" ? "🔘" : "⭕"} Female</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setGender("Other");
              setErrors((prev) => ({ ...prev, gender: "" }));
            }}
          >
            <Text>{gender === "Other" ? "🔘" : "⭕"} Other</Text>
          </TouchableOpacity>
        </View>

        {errors.gender ? (
          <Text style={styles.errorText}>{errors.gender}</Text>
        ) : null}

        <Text style={styles.infocontainer}>
          By continuing, you agree to
          <Text style={styles.linkText} onPress={handleTermsOfUse}>
            {" "}
            Terms of Use{" "}
          </Text>
          and
          <Text style={styles.linkText} onPress={handlePrivacyPolicy}>
            {" "}
            Privacy Policy
          </Text>
          .
        </Text>
        <View style={styles.containerAAS}>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerAAS}>
          <Text style={styles.footerText}>
            Already have an account?{" "}
            <Text
              style={styles.loginText}
              onPress={() => navigation.navigate("VendorLogin")}
            >
              Log in
            </Text>
          </Text>
        </View>
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
  header: {
    fontSize: width < 350 ? 18 : width * 0.07,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    marginTop: 40,
  },
  subHeader: {
    fontSize: width < 350 ? 12 : width * 0.05,
    color: "#000000",
    marginBottom: 20,
  },
  containerA: {
    width: width * 0.8,
    marginTop: height * 0.25,
    alignSelf: "center",
  },
  label: {
    fontSize: width * 0.04,
    color: "#333",
    fontWeight: "500",
    fontFamily: "Montserrat",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    marginBottom: 25,
    textAlign: "left",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  genderText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 8,
  },
  infocontainer: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 18,
    alignSelf: "center",
    alignItems: "center",
  },
  linkText: {
    color: "#00B1D0",
    textDecorationLine: "underline",
  },
  containerAAS: {
    width: width * 0.8,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#00B1D0",
    padding: 15,
    width: "100%",
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    marginTop: 17,
  },
  loginText: {
    color: "#00B1D0",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default VendorSignup;