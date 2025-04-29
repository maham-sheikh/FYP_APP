import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeFavourite } from "../redux/favouritesSlice";
import Fav from "../../assets/mylikes.png";
import mysave from "../../assets/mysave.png";
import mysaveFilled from "../../assets/filledheart.png";
import starFilled from "../../assets/starFilled.png";
import starUnfilled from "../../assets/starUnfilled.png";
import viewProfile from "../../assets/profileViewArrow.png";
import Home from "../../assets/Home.png";
import Like from "../../assets/Favourities.png";
import Category from "../../assets/Servies.png";
import Discount from "../../assets/Discounts.png";
import Location from "../../assets/Location.png";
import { useFonts } from "expo-font";

const { width, height } = Dimensions.get("window");

function Likes({ navigation }) {
  const favourites = useSelector((state) => state.favourites.services);
  const dispatch = useDispatch();

  const [fontsLoaded] = useFonts({
    Poppins: require("../../assets/Poppins-Regular.ttf"),
    Montserrat: require("../../assets/Montserrat-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <ActivityIndicator size="large" color="#00B1D0" style={styles.loaderSr} />
    );
  }

  const handleRemoveFavourite = (serviceId) => {
    dispatch(removeFavourite(serviceId));
  };

  const renderFavouriteServices = () => {
    if (favourites.length === 0) {
      return <Text style={styles.noFavText}>No favourites added yet!</Text>;
    }

    return favourites.map((service, index) => (
      <View key={service.id} style={styles.serviceContainer}>
        <View style={styles.serviceRow}>
          <Text style={styles.serviceNames}>
            {service.business_name || service.fullName}
          </Text>
          <View style={styles.verifiedSection}>
            {/* <Image source={mysaveFilled} style={styles.saveIcon} /> */}
            <TouchableOpacity onPress={() => handleRemoveFavourite(service.id)}>
              <Image source={mysaveFilled} style={styles.saveIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.serviceWork}>{service.service_type}</Text>

        {service.working_hours && (
          <Text style={styles.workingHours}>
            Hours: {service.working_hours}
          </Text>
        )}

        <View style={styles.myserviceRow}>
          <Text style={styles.serviceDistance}>
            {service.distance || "N/A"}
          </Text>
        </View>

        <View style={styles.reviewSection}>
          <Text style={styles.reviewText}>Reviews</Text>
          <View style={styles.starsContainer}>
            {[...Array(5)].map((_, starIndex) => (
              <Image
                key={starIndex}
                source={starIndex < (index % 5) + 1 ? starFilled : starUnfilled}
                style={styles.starIcon}
              />
            ))}
            <Text style={styles.filledStarsCount}>{(index % 5) + 1}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ViewProfile", {
              vendor: service,
              serviceType: service.service_type,
              icon: Fav,
            })
          }
          style={styles.viewProfileButton}
        >
          <View style={styles.profileContainer}>
            <Text style={styles.viewProfileText}>View Profile</Text>
            <Image source={viewProfile} style={styles.viewProfileImage} />
          </View>
        </TouchableOpacity>
      </View>
    ));
  };

  return (
    <View style={styles.containerAS}>
      <Image source={Fav} style={styles.imageAS} />
      <Text style={styles.textAS}>Your Personal Favorites</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {renderFavouriteServices()}
      </ScrollView>

      <View style={styles.footerContainerAS}>
        <View
          style={styles.footerIconContainer}
          onTouchEnd={() => navigation.navigate("Homes")}
        >
          <Image source={Home} style={styles.footerIcon} />
          <Text style={styles.footerIconText}>Home</Text>
        </View>
        <View
          style={styles.footerIconContainer}
          onTouchEnd={() => navigation.navigate("Likes")}
        >
          <Image source={Like} style={styles.footerIcon} />
          <Text style={styles.footerIconText}>Favourites</Text>
        </View>
        <View
          style={styles.footerIconContainer}
          onTouchEnd={() => navigation.navigate("Servicess")}
        >
          <Image source={Category} style={styles.footerIcon} />
          <Text style={styles.footerIconText}>Services</Text>
        </View>
        <View
          style={styles.footerIconContainer}
          onTouchEnd={() => navigation.navigate("Locationss")}
        >
          <Image source={Location} style={styles.footerIcon} />
          <Text style={styles.footerIconText}>Location</Text>
        </View>
        <View
          style={styles.footerIconContainer}
          onTouchEnd={() => navigation.navigate("Discountss")}
        >
          <Image source={Discount} style={styles.footerIcon} />
          <Text style={styles.footerIconText}>Discounts</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerAS: {
    flex: 1,
    backgroundColor: "#F1FFF3",
    paddingTop: height * 0.08,
    paddingBottom: height * 0.1,
  },
  imageAS: {
    width: width * 0.35,
    height: undefined,
    aspectRatio: 1,
    alignSelf: "center",
  },
  textAS: {
    fontFamily: "Montserrat",
    fontSize: width < 350 ? 18 : width * 0.07,
    fontStyle: "italic",
    fontWeight: "500",
    lineHeight: 29.26,
    textAlign: "center",
    color: "#00B1D0",
    backgroundColor: "#F1FFF3",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  scrollContainer: {
    paddingHorizontal: 10,
    paddingBottom: 80,
  },
  noFavText: {
    textAlign: "center",
    marginVertical: 20,
    color: "#505050",
    fontSize: 16,
  },
  serviceContainer: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  serviceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  serviceNames: {
    fontSize: width * 0.04,
    fontWeight: "bold",
    flex: 1,
  },
  verifiedSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  saveIcon: {
    width: width * 0.07,
    height: width * 0.07,
    marginLeft: 10,
  },
  serviceWork: {
    fontFamily: "Montserrat",
    fontSize: width * 0.032,
    fontStyle: "italic",
    fontWeight: "400",
    lineHeight: width * 0.038,
    textAlign: "left",
    color: "#50505080",
    marginTop: height * 0.008,
  },
  workingHours: {
    fontFamily: "Montserrat",
    fontSize: width * 0.032,
    fontStyle: "italic",
    color: "#505050",
    marginTop: 5,
  },
  myserviceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 5,
  },
  serviceDistance: {
    fontSize: 12,
    fontStyle: "italic",
    fontWeight: "400",
    color: "#50505080",
  },
  reviewSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 5,
  },
  reviewText: {
    fontSize: width * 0.032,
    fontWeight: "400",
    color: "#000000",
    fontStyle: "italic",
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  starIcon: {
    width: width * 0.05,
    height: width * 0.05,
  },
  filledStarsCount: {
    fontSize: width * 0.04,
    fontStyle: "italic",
    color: "#B0B0B0",
    marginLeft: width * 0.02,
  },
  viewProfileButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.02,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  viewProfileImage: {
    width: width * 0.05,
    height: width * 0.07,
    resizeMode: "contain",
  },
  viewProfileText: {
    fontSize: 14,
    color: "#00B1D0",
    fontWeight: "bold",
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
  footerIconText: {
    fontFamily: "Poppins",
    fontSize: width < 350 ? 10 : 12,
    fontStyle: "italic",
    fontWeight: "300",
    lineHeight: 12,
    textAlign: "center",
    color: "#000000",
    marginTop: 5,
  },
  footerIcon: {
    width: width < 350 ? 25 : 30,
    height: width < 350 ? 25 : 30,
  },
  loaderSr: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1FFF3",
  },
});

export default Likes;
