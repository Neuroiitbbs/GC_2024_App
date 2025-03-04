// import {
//   Text,
//   View,
//   StyleSheet,
//   Dimensions,
//   Image,
//   TouchableOpacity,
//   Pressable,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";

// import logoPaths from "../utils/logoPaths";
// import setProperTeamName from "../utils/setProperTeamName";

// const deviceWidth = Dimensions.get("window").width;
// const deviceHeight = Dimensions.get("window").height;

// function TechCultEventCard(props) {
//   const navigation = props.navigation;
//   props = props?.data?.item || props?.data || props;
//   props = props?.data?.data || props?.data || props;
//   const formattedDate = new Date(props.details?.timestamp).toLocaleDateString();
//   const formattedTime = new Date(props.details?.timestamp).toLocaleTimeString(
//     [],
//     {
//       hour: "2-digit",
//       minute: "2-digit",
//     }
//   );

//   return (
//     <View style={{paddingBottom:2,paddingTop:2}}>
//       <Pressable
//         onPress={() => {
//           navigation.navigate("SpecificEvent", {
//             data: props,
//           });
//         }}
//       >
//         <LinearGradient
//           start={{ x: -0.4, y: 0.0 }}
//           end={{ x: 0.7, y: 1 }}
//           locations={[0.2, 0.8]}
//           colors={["#FDFCFB", "#E2D1C3"]}
//           style={styles.cardTop}
//         >
//           <View style={{
//             height: 0.07 * deviceHeight,
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "space-between",
//             padding: 10,
//             // backgroundColor: "black",
//           }}>
//             <Text
//              style={{ fontWeight: "600", fontSize: 20 }}
//             >
//               {props.details?.title}
//             </Text>
//             {/* <Text
//             style={{
//               fontWeight: "700",
//               paddingBottom: 20,
//               position: "relative",
//               left: deviceWidth * 0.04,
//             }}
//           >
//             {props.id}
//           </Text> */}
//             {/* <Text style={{ fontWeight: "700" }}>{props.data.details.location}</Text> */}
//           </View>
//           {/* <Image style={styles.LeftImageContainer} source={logoPaths[teamA]} /> */}
//           {/* <Image /> */}
//           {/* <Text style={styles.LEFTscoreText}>{props.scoreA}</Text> */}
//           {/* <Text style={styles.RIGHTscoreText}>{props.scoreB}</Text> */}
//           {/* <Image style={styles.RightImageContainer} source={logoPaths[teamB]} /> */}
//           {/* <Image /> */}
//         </LinearGradient>

//         <View style={styles.cardBottom}>
//           <View>
//             {/* <Text style={styles.BottomTextGame}>{props.details?.title}</Text> */}
//             <Text style={styles.BottomTextTeams}>
//               {props.details?.location}
//             </Text>
//           </View>
//           <View style={{
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "space-evenly",
//           }}>
//             <Text style={styles.BottomTextGame}>{formattedDate}</Text>
//             <Text style={styles.BottomTextTime}>{formattedTime}</Text>
//           </View>
//           {/* <VoteButton /> */}
//         </View>
//       </Pressable>
//     </View>
//   );
// }

// export default TechCultEventCard;

// const styles = StyleSheet.create({
//   cardTop: {
//     flexDirection: "row",
//     height: 0.08 * deviceHeight,
//     marginTop: 12,
//     marginHorizontal: 0.04 * deviceWidth,
//     // padding: 16,
//     backgroundColor: "white",
//     borderTopRightRadius: 16,
//     borderTopLeftRadius: 16,
//     elevation: 4,
//     shadowColor: "black",
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 6,
//     shadowOpacity: 0.75,
//     alignItems: "center",
//     justifyContent: "center",
//     textAlign: "center",
//   },
//   cardBottom: {
//     marginBottom: 0.01 * deviceHeight,
//     height: 0.07 * deviceHeight,
//     marginHorizontal: "4%",
//     padding: 10,
//     backgroundColor: "#1A1A2E",
//     borderBottomRightRadius: 16,
//     borderBottomLeftRadius: 16,
//     elevation: 6,
//     shadowColor: "#d41d77",
//      // shadowColor: "#1A1A2E",
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 0.5,
//     shadowOpacity: 1,
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   BottomTextGame: {
//     color: "white",
//     fontSize: 16,
//   },
//   BottomTextTeams: {
//     color: "white",
//     fontSize: 18,
//   },
//   BottomTextTime: {
//     color: "gray",
//     // position: "relative",
//     // right: -26,
//   },
//   LeftImageContainer: {
//     width: deviceWidth < 380 ? 26 : 46,
//     height: deviceWidth < 380 ? 26 : 46,
//     borderRadius: deviceWidth < 380 ? 13 : 23,
//     borderWidth: 3,
//     overflow: "hidden",
//     margin: 9,
//     marginTop: 36,
//     position: "absolute",
//     left: 9,
//   },
//   RightImageContainer: {
//     width: deviceWidth < 380 ? 26 : 46,
//     height: deviceWidth < 380 ? 26 : 46,
//     borderRadius: deviceWidth < 380 ? 13 : 23,
//     borderWidth: 3,
//     overflow: "hidden",
//     margin: 9,
//     marginTop: 36,
//     position: "absolute",
//     right: 9,
//   },
//   LEFTscoreText: {
//     fontSize: 26,
//     color: "#322d2d",
//     position: "absolute",
//     left: 70,
//     margin: 9,
//     marginTop: 38,
//   },
//   RIGHTscoreText: {
//     color: "#322d2d",
//     fontSize: 26,
//     position: "absolute",
//     right: 70,
//     margin: 9,
//     marginTop: 38,
//   },
// });







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

  const LoginCtx = useContext(LoginContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent] = useState(["Mtech", "ECE+META", "CSE", "CIVIL", "EE", "PhD", "MECH", "MSC+ITEP"]);
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
      if (option === "ECE+META") option = "ECE_META";
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
              <Text style={styles.buttonText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Pressable>

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
    marginTop: 12,
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
});