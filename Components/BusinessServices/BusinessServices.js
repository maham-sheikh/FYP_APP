import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import { useNavigation, useRoute } from "@react-navigation/native"; 

import AutoRepair from "../../assets/AutoRepair.png";
import FSalon from "../../assets/FemaleSalon.png";
import HealthCare from "../../assets/HealthCare.png";
import HouseHold from "../../assets/HouseHold.png";
import Maid from "../../assets/Maid.png";
import MSalon from "../../assets/MaleSalon.png";
import TechRepair from "../../assets/TechRepair.png";
import icon from "../../assets/icon.png";
import Service1a from "../../assets/Service1.1.png";
import Service1b from "../../assets/Service1.2.png";
import Service1c from "../../assets/Service1.3.png";
import Service1d from "../../assets/Service1.4.png";
import Service1e from "../../assets/Service1.5.png";
import Service1f from "../../assets/Service1.6.png";
import Service1g from "../../assets/Service1.7.png";
import Service1h from "../../assets/Service1.8.png";
import Service1i from "../../assets/Service1.9.png";
import Service2a from "../../assets/Service2.1.png";
import Service2b from "../../assets/Service2.2.png";
import Service2c from "../../assets/Service2.3.png";
import Service2d from "../../assets/Service2.4.png";
import Service2e from "../../assets/Service2.5.png";
import Service2f from "../../assets/Service2.6.png";
import Service2g from "../../assets/Service2.7.png";
import Service3a from "../../assets/Service3.1.png";
import Service3b from "../../assets/Service3.2.png";
import Service3c from "../../assets/Service3.3.png";
import Service3d from "../../assets/Service3.4.png";
import Service3e from "../../assets/Service3.5.png";
import Service3f from "../../assets/Service3.6.png";
import Service3g from "../../assets/Service3.7.png";
import Service3h from "../../assets/Service3.8.png";
import Service3i from "../../assets/Service3.9.png";
import Service3j from "../../assets/Service3.10.png";
import Service4a from "../../assets/Service4.1.png";
import Service4c from "../../assets/Service4.3.png";
import Service4d from "../../assets/Service4.4.png";
import Service5a from "../../assets/Service5.1.png";
import Service5b from "../../assets/Service5.2.png";
import Service5c from "../../assets/Service5.3.png";
import Service5d from "../../assets/Service5.4.png";
import Service5e from "../../assets/Service5.5.png";
import Service5f from "../../assets/Service5.6.png";
import Service5g from "../../assets/Service5.7.png";
import Service6a from "../../assets/Service6.1.png";
import Service6b from "../../assets/Service6.2.png";
import Service6c from "../../assets/Service6.3.png";
import Service6d from "../../assets/Service6.4.png";
import Service6e from "../../assets/Service6.5.png";
import Service7a from "../../assets/Service7.1.png";
import Service7b from "../../assets/Service7.2.png";
import Service7c from "../../assets/Service7.3.png";
import Service7d from "../../assets/Service7.4.png";
import Service7e from "../../assets/Service7.5.png";
import Service7f from "../../assets/Service7.6.png";
import Service7g from "../../assets/Service7.7.png";
import BackArrow from "../../assets/arrow.png";

const { width, height } = Dimensions.get("window");

function BusinessServices() {
  const navigation = useNavigation();
  const route = useRoute(); 

  const { fullName, cnic, email, phone, gender, address, postalCode, city, password } =
    route.params;

  const [fontsLoaded] = useFonts({
    Poppins: require("../../assets/Poppins-Regular.ttf"),
    Montserrat: require("../../assets/Montserrat-Regular.ttf"),
  });

  const [isOpen, setIsOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [selectedSubserviceName, setSelectedSubserviceName] = useState(
    "Select Your Business"
  );
  const [isSubservice, setIsSubservice] = useState(false);
  const [selectedServiceName, setSelectedServiceName] = useState("Select a Service");

  const services = [
    {
      id: 1,
      name: "Auto Services & Maintenance",
      icon: AutoRepair,
      subservices: [
        { id: 1, name: "Car Repair", icon: Service1a },
        { id: 2, name: "AC Repair", icon: Service1b },
        { id: 3, name: "Tire Repair", icon: Service1c },
        { id: 4, name: "Paint & body work", icon: Service1d },
        { id: 5, name: "Brake Inspection", icon: Service1e },
        { id: 6, name: "Engine Repair", icon: Service1f },
        { id: 7, name: "Auto Wash", icon: Service1g },
        { id: 8, name: "Battery Repair", icon: Service1h },
        { id: 9, name: "Bike Repair", icon: Service1i },
      ],
    },
    {
      id: 2,
      name: "Household Repair",
      icon: HouseHold,
      subservices: [
        { id: 1, name: "Plumber", icon: Service2a },
        { id: 2, name: "Appliance ", icon: Service2b },
        { id: 3, name: "AC Repair", icon: Service2c },
        { id: 4, name: "Pest Control", icon: Service2d },
        { id: 5, name: "Carpenter", icon: Service2e },
        { id: 6, name: "Electrician", icon: Service2f },
        { id: 7, name: "Paint", icon: Service2g },
      ],
    },
    {
      id: 3,
      name: "Women's Salon",
      icon: FSalon,
      subservices: [
        { id: 1, name: "Hair Cut", icon: Service3a },
        { id: 2, name: "Hair Styling", icon: Service3b },
        { id: 3, name: "Mehndi", icon: Service3c },
        { id: 4, name: "Facial", icon: Service3d },
        { id: 5, name: "Massage", icon: Service3e },
        { id: 6, name: "Hair Care", icon: Service3f },
        { id: 7, name: "Makeup", icon: Service3g },
        { id: 8, name: "Nail Work", icon: Service3h },
        { id: 9, name: "Threading", icon: Service3i },
        { id: 10, name: "Waxing", icon: Service3j },
      ],
    },
    {
      id: 4,
      name: "Tech Repair",
      icon: TechRepair,
      subservices: [
        { id: 1, name: "Laptop Fix", icon: Service4a },
        { id: 2, name: "TV Fix", icon: Service4c },
        { id: 3, name: "Mobile Fix", icon: Service4d },
      ],
    },
    {
      id: 5,
      name: "Health Care",
      icon: HealthCare,
      subservices: [
        { id: 1, name: "Hospitals", icon: Service5a },
        { id: 2, name: "Pharmacies", icon: Service5b },
        { id: 3, name: "Labs", icon: Service5c },
        { id: 4, name: "Clinics", icon: Service5d },
        { id: 5, name: "Dentists", icon: Service5e },
        { id: 6, name: "Psychologist", icon: Service5f },
        { id: 7, name: "Physical Therapy", icon: Service5g },
      ],
    },
    {
      id: 6,
      name: "Maid & Cleaning",
      icon: Maid,
      subservices: [
        { id: 1, name: "Carpet Cleaning", icon: Service6a },
        { id: 2, name: "Laundry", icon: Service6b },
        { id: 3, name: "House Maid", icon: Service6c },
        { id: 4, name: "Sofa \nCleaning", icon: Service6d },
        { id: 5, name: "Water Tank Cleaning", icon: Service6e },
      ],
    },
    {
      id: 7,
      name: "Men's Salon",
      icon: MSalon,
      subservices: [
        { id: 1, name: "Facial", icon: Service7g },
        { id: 2, name: "Massage", icon: Service7b },
        { id: 3, name: "Hair Cut", icon: Service7d },
        { id: 4, name: "Hair Styling", icon: Service7c },
        { id: 5, name: "Shaving", icon: Service7e },
        { id: 6, name: "Threading", icon: Service7a },
        { id: 7, name: "Waxing", icon: Service7f },
      ],
    },
  ];

  const toggleMainDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSelectedServiceId(null);
      setSelectedSubserviceName("Select Your Business");
      setIsSubservice(false);
    }
  };

  const toggleSubDropdown = (id, name, isSub = false) => {
    if (isOpen) {
      if (selectedServiceId === id && !isSub) {
        setSelectedServiceId(null);
        setSelectedSubserviceName("Select Your Business");
        setSelectedServiceName("Select a Service");
        setIsSubservice(false);
      } else {
        setSelectedServiceId(id);
        setSelectedServiceName(services.find((service) => service.id === id)?.name);
        setSelectedSubserviceName(name);
        setIsSubservice(isSub);
      }
    }
  };

  const handleNext = () => {
    if (isSubservice) {
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
        businessCategory: selectedServiceName,
        subService: selectedSubserviceName,
      };

      navigation.navigate("BusinessConfirmation", payload);
    } else {
      Alert.alert(
        "Select a Subservice",
        "Please select a subservice before proceeding.",
        [{ text: "OK" }]
      );
    }
  };

  if (!fontsLoaded) {
    return (
      <ActivityIndicator size="large" color="#00B1D0" style={styles.loaderSr} />
    );
  }

  return (
    <View style={styles.containerAS}>
      <View style={styles.containerhome}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("VendorPassword",{fullName,
            cnic,
            email,
            phone,
            gender,
            address,
            postalCode,
            city,
            password,})}
        >
          <Image source={BackArrow} style={styles.arrowImage} />
        </TouchableOpacity>
        <Image source={icon} style={styles.imageAS} />
        <Text style={styles.textAS}>FINDIGO</Text>
      </View>

      <View style={styles.gridAAS}>
        <TouchableOpacity
          onPress={toggleMainDropdown}
          style={styles.dropdownHeader}
        >
          <Text style={styles.headerText}>{selectedSubserviceName}</Text>
          <Text style={styles.dropdownIcon}>{isOpen ? "▲" : "▼"}</Text>
        </TouchableOpacity>
        {isOpen && (
          <View style={styles.scrollableView}>
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
            >
              {services.map((service) => (
                <View key={service.id}>
                  <TouchableOpacity
                    style={styles.serviceBox}
                    onPress={() => toggleSubDropdown(service.id, service.name)}
                  >
                    <Image source={service.icon} style={styles.serviceImage} />
                    <Text style={styles.serviceText}>{service.name}</Text>
                    <Text style={styles.toggleIcon}>
                      {selectedServiceId === service.id && !isSubservice
                        ? "▲"
                        : "▼"}
                    </Text>
                  </TouchableOpacity>
                  {selectedServiceId === service.id && (
                    <View style={styles.subservicesContainer}>
                      {service.subservices.map((sub) => (
                        <TouchableOpacity
                          key={sub.id}
                          style={styles.subserviceItem}
                          onPress={() =>
                            toggleSubDropdown(service.id, sub.name, true)
                          }
                        >
                          <Image
                            source={sub.icon}
                            style={styles.subserviceImage}
                          />
                          <Text style={styles.subserviceText}>{sub.name}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </ScrollView>
          </View>
        )}
        <TouchableOpacity
          style={isSubservice ? styles.nextButton : styles.nextButtonDisabled}
          onPress={handleNext}
          activeOpacity={isSubservice ? 0.8 : 1}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
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
  },
  backButton: {
    position: "absolute",
    top: height * 0.07,
    left: width * 0.05,
    width: width * 0.10,
    height: width * 0.10,
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

  imageAS: {
    resizeMode: "contain",
    width: width * 0.15,
    height: width * 0.07,
    height: undefined,
    aspectRatio: 1,
    marginBottom: 20,
    marginTop: 15,
  },
  gridAAS: {
    flex: 1,
    width: width * 0.8,
    backgroundColor: "#00B1D0",
    borderColor: "#00B1D0",
    borderStyle: "solid",
    backgroundColor: "#F1FFF3",
  },

  dropdownHeader: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 0.91,
    borderColor: "#00B1D0",
    borderStyle: "solid",
    borderRadius: 9.14,
    shadowOffset: { width: 0, height: 2 },
  },
  headerText: {
    fontFamily: "Poppins",
    fontSize: 16,
    color: "#00B1D0",
  },
  dropdownIcon: {
    fontFamily: "Poppins",
    fontSize: 16,
    color: "#00B1D0",
    flexShrink: 1,
  },

  scrollableView: {
    width: "100%",
    maxHeight: height * 0.53,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#F1FFF3",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 0.91,
    borderColor: "#00B1D0",
    borderStyle: "solid",
    borderRadius: 9.14,
    shadowOffset: { width: 0, height: 2 },
  },

  scrollContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  serviceBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 90,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#00B1D0",
    borderColor: "#00B1D0",
    borderStyle: "solid",
    backgroundColor: "#F1FFF3",
  },
  serviceImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginRight: 40,
  },
  serviceText: {
    flexShrink: 1,
    maxWidth: "80%",
    fontFamily: "Poppins",
    fontSize: 16,
    color: "#00B1D0",
    marginRight: 10,
  },
  subservicesContainer: {
    paddingVertical: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    backgroundColor: "#F1FFF3",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowColor: "#000", 
    elevation: 2,
    borderWidth: 1,
    borderColor: "#00B1D0",
    borderStyle: "solid",
    overflow: "hidden",
  },
  subserviceItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    backgroundColor: "#F1FFF3",
  },
  toggleIcon: {
    fontFamily: "Poppins",
    fontSize: 16,
    color: "#00B1D0",
    flexShrink: 1,
    width: 20,
    textAlign: "center",
    marginRight: 10,
  },

  subserviceImage: {
    width: 40,
    height: 40,
    marginRight: 40,
    resizeMode: "contain",
  },
  subserviceText: {
    fontFamily: "Poppins",
    fontSize: 16,
    color: "#00B1D0",
    textAlign: "left",
    flexShrink: 1,
  },

  nextButton: {
    marginTop: 20,
    backgroundColor: "#00B1D0",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins",
  },
  nextButtonDisabled: {
    backgroundColor: "rgba(0, 177, 208, 0.4)", // 40% opacity of #00B1D0
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 20,
  },
});

export default BusinessServices;