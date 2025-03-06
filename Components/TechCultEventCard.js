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
import axios from "axios";
import { backend_link } from "../utils/constants";
import { LoginContext } from "../store/LoginContext";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

function TechCultEventCard(props) {
  const navigation = props.navigation;
  const eventData = props?.data?.data || props?.data?.item || props?.data;
  const formattedDate = new Date(eventData.data.details?.timestamp).toLocaleDateString();
  const formattedTime = new Date(eventData.data.details?.timestamp).toLocaleTimeString(
    [],
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  const {branchCoords} = props;


  const LoginCtx = useContext(LoginContext);
  const user_branch = LoginCtx.detail.dept;
  const user_email = LoginCtx.user.email;

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent] = useState(["Mtech", "ECE+META+EP", "CSE", "CIVIL", "EE", "PhD", "MECH", "MSC+ITEP"]);
  const [selectedOptions, setSelectedOptions] = useState(["First", "Second", "Third"]);
  const [activeButtonIndex, setActiveButtonIndex] = useState(null);
  const [disabledButtons, setDisabledButtons] = useState([]);

  const handleButtonPress = (index) => {
    setActiveButtonIndex(index);
    setModalVisible(true);
  };

  const handleOptionSelect = async (option) => {
    if (activeButtonIndex !== null) {
      const updatedOptions = [...selectedOptions];
      updatedOptions[activeButtonIndex] = option;

      setDisabledButtons((prev) => [...prev, activeButtonIndex]);

      if (option === "Mtech") option = "MTech";
      if (option === "ECE+META+EP") option = "ECE_META";
      if (option === "PhD") option = "PHD";
      if (option === "MSC+ITEP") option = "MSc_ITEP";

      const body = {
        index: activeButtonIndex,
        team: option,
        event: eventData.data.eventId,
        email: LoginCtx?.user?.email,
      };

      try {
        await axios.post(`${backend_link}api/event/betTechCult`, body);
        setSelectedOptions(updatedOptions);
        setModalVisible(false);
      } catch (error) {
        console.error("API request failed:", error.response?.data || error.message);
      }
    }
  };

  useEffect(() => {
    setSelectedOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
  
      Object.keys(eventData.data.pointsTable).forEach((key) => {
        if (eventData.data.pointsTable[key].bets) {
          if (eventData.data.pointsTable[key].bets.first.includes(LoginCtx?.user?.email)) {
            updatedOptions[0] = key;
            setDisabledButtons((prev) => [...prev, 0]);
          }
          if (eventData.data.pointsTable[key].bets.second.includes(LoginCtx?.user?.email)) {
            updatedOptions[1] = key;
            setDisabledButtons((prev) => [...prev, 1]);
          }
          if (eventData.data.pointsTable[key].bets.third.includes(LoginCtx?.user?.email)) {
            updatedOptions[2] = key;
            setDisabledButtons((prev) => [...prev, 2]);
          }
        }
      });
  
      return updatedOptions; // ✅ Now React updates the state correctly
    });
  }, []);

  const checkBranch = () => {
    if (user_branch === "ECE" || user_branch === "MM" || user_branch === "EP") {
      return branchCoords["ECE_META_EP"] === user_email;
    }
    return branchCoords[user_branch] === user_email;
  }

  return (
    <View style={{ paddingBottom: 2, paddingTop: 2 }}>
      <Pressable
        onPress={() => {
          navigation.navigate("SpecificEvent", {
            data: eventData.data,
          });
        }}
      >
        <LinearGradient
          start={{ x: -0.4, y: 0.0 }}
          end={{ x: 0.7, y: 1 }}
          locations={[0.2, 0.8]}
          colors={["#FDFCFB", "#E2D1C3"]}
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
        </LinearGradient>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("PlayerScreen", { data: props });
          }}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={["#F2D1C4", "#E2D1C3"]}  // Adjust these gradient colors as desired
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 12,
              marginHorizontal: 0.04 * deviceWidth,
              marginTop: 10,
              borderRadius: 8,
              elevation: 4,                // Android shadow
              shadowColor: "#000",         // iOS shadow
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
            }}
          >
            <Text
              style={{
                color: "#1A1A2E",
                textAlign: "center",
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              See Participants
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.cardBottom}>
          <View>
            <Text style={styles.BottomTextTeams}>{eventData.data.details?.location}</Text>
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

        <View style={styles.buttonContainer}>
          {Array.isArray(selectedOptions) && selectedOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                disabledButtons.includes(index) && styles.disabledButton
              ]}
              onPress={() => !disabledButtons.includes(index) && handleButtonPress(index)}
            >
              <Text style={styles.buttonText}>{option === "ECE_META" ? "ECE_META_EP" : option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Pressable>

      {
        LoginCtx.isAdmin && checkBranch() && (
          <TouchableOpacity style={styles.registerButton} 
            onPress={() => 
              props.navigation.navigate("TeamRegistration", { 
                data : props,
                user: user_email,
                event_category: "all_events",
                branch: user_branch,
              })
            }
          > 
            <Text style={styles.registerButtonText}>Register Teams</Text>
          </TouchableOpacity>

        )
      }
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              {modalContent.map((item, index) => (
                <TouchableOpacity key={index} style={styles.modalButton} onPress={() => handleOptionSelect(item)}>
                  <Text style={styles.modalButtonText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default TechCultEventCard;

const styles = StyleSheet.create({
  cardTop: {
    flexDirection: "row",
    height: 0.08 * deviceHeight,
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
