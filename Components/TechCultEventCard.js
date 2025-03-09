import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  Modal,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { LoginContext } from "../store/LoginContext";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

function TechCultEventCard(props) {
  const navigation = props.navigation;
  const eventData = props?.data?.data || props?.data?.item || props?.data;
  const formattedDate = new Date(
    eventData.data.details?.timestamp
  ).toLocaleDateString();
  const formattedTime = new Date(
    eventData.data.details?.timestamp
  ).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const { branchCoords } = props;

  const LoginCtx = useContext(LoginContext);
  const user_branch = LoginCtx?.detail?.dept;
  const user_email = LoginCtx?.user?.email;


  const checkBranch = () => {
    if (user_branch === "ECE" || user_branch === "MM" || user_branch === "EP") {
      return branchCoords["ECE_META_EP"] === user_email;
    }
    return branchCoords[user_branch] === user_email;
  };

  return (
    <View style={{ paddingBottom: 2, paddingTop: 2 }}>
      {/* <Pressable
        onPress={() => {
          navigation.navigate("SpecificEvent", {
            data: eventData.data,
          });
        }}
      > */}
      <LinearGradient
        start={{ x: -0.4, y: 0.0 }}
        end={{ x: 0.7, y: 1 }}
        locations={[0.2, 0.8]}
        colors={["#B0B0B0", "#E0E0E0"]}
        style={styles.cardTop}
      >
        <View
          style={{
            height: 0.07 * deviceHeight,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <Text style={{ fontWeight: "600", fontSize: 20 }}>
            {eventData.data.details?.title}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 15,
          }}
        >
          <TouchableOpacity
            style={styles.navigateButton}
            onPress={() => {
              navigation.navigate("PlayerScreen", { data: props });
            }}
          >
            <Text
              style={styles.navigateText}
            >
              Participants
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navigateButton}
            onPress={() => {
              navigation.navigate("SpecificEvent", {
                data: eventData.data,
              });
            }}
          >
            <Text
              style={styles.navigateText}
            >
              Result
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navigateButton}
            onPress={() => {
              navigation.navigate("TechCultBettingScreen", { data: props });
            }}
          >
            <Text
              style={styles.navigateText}
            >
              Vote
            </Text>
          </TouchableOpacity>
        </View>
        {LoginCtx.isAdmin && checkBranch() && (
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() =>
              props.navigation.navigate("TeamRegistration", {
                data: props,
                user: user_email,
                event_category: "all_events",
                branch: user_branch,
              })
            }
          >
            <Text style={styles.registerButtonText}>Register Team</Text>
          </TouchableOpacity>
        )}
      </LinearGradient>

      <View style={styles.cardBottom}>
        <View>
          <Text style={styles.BottomTextTeams}>
            {eventData.data.details?.location}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Text style={styles.BottomTextGame}>{formattedDate}</Text>
          <Text style={styles.BottomTextTime}>{formattedTime}</Text>
        </View>
      </View>

      {/* </Pressable> */}

      
    </View>
  );
}

export default TechCultEventCard;

const styles = StyleSheet.create({
  cardTop: {
    flexDirection: "column",
    // height: 0.08 * deviceHeight,
    marginTop: 25,
    marginHorizontal: 0.04 * deviceWidth,
    backgroundColor: "white",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.75,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  navigateButton: {
    backgroundColor: "#d42070",
    // width: 0.3 * deviceWidth,
    paddingLeft:12,
    paddingRight:12,
    paddingVertical: 12,
    marginHorizontal: 0.04 * deviceWidth,
    borderRadius: 8,
    elevation: 4, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  navigateText :{
    color: "white",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
  },
  cardBottom: {
    marginBottom: 0.01 * deviceHeight,
    height: 0.07 * deviceHeight,
    marginHorizontal: "4%",
    padding: 10,
    backgroundColor: "#1A1A2E",
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    elevation: 6,
    shadowColor: "#d41d77",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 0.5,
    shadowOpacity: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  BottomTextGame: {
    color: "white",
    fontSize: 16,
  },
  BottomTextTeams: {
    color: "white",
    fontSize: 18,
  },
  BottomTextTime: {
    color: "gray",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#E2D1C3",
    padding: 10,
    borderRadius: 8,
    minWidth: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: "#D3C6B8",
    opacity: 0.6,
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalButton: {
    padding: 15,
    backgroundColor: "rgba(0,0,0,0.03)",
    marginVertical: 5,
    borderRadius: 5,
  },
  modalButtonText: {
    textAlign: "center",
    fontWeight: "600",
  },
  registerButton: {
    backgroundColor: "#E2D1C3",
    padding: 10,
    marginHorizontal: "4%",
    borderRadius: 8,
    alignItems: "center",
  },
  registerButtonText: {
    fontWeight: "600",
    fontSize: 16,
  },
});

