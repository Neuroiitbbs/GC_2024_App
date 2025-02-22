import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

import React, { useState, useContext } from "react";

import logoPaths from "../utils/logoPaths";
import setProperTeamName from "../utils/setProperTeamName";
import { backend_link } from "../utils/constants";
import { LoginContext } from "../store/LoginContext";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

// async function handleClick(eventName, eventId, LoginCtx) {
//   try {
//     // ✅ Fetch the existing event data
//     const response = await axios.get(
//       `${backend_link}api/event/getUpcomingEventsById?eventId=${eventName}`
//     );
    
//     // ✅ Extract event data (ensuring `data` exists)
//     // console.log(response.data);
//     console.log(eventId);
//     const eventData = response.data;
//     if (!eventData) {
//       console.error("No events found.");
//       return;
//     }

//     // console.log("debugging: ", eventId);

//     const eventDetails = eventData.event[eventId].data
//     // console.log("debugging: ", eventData.event[eventId]);
//     // console.log("Full eventData: ", JSON.stringify(eventData, null, 2));

//     // if (!eventData.event) {
//     //   console.log("eventData.event is undefined!");
//     // } else {
//     //   console.log("eventData.event keys: ", Object.keys(eventData.event));
//     //   console.log(`Looking for eventId: ${eventId}`);
//     // }

//     console.log("debugging: ", eventDetails);

//     const bets = eventDetails.bets || []; // Ensure bets array exists
//     const user_email = LoginCtx.user.email;

//     console.log("Current Bets:", bets);

//     // ✅ Check if user already placed a bet
//     if (!bets.includes(user_email)) {
//       const updatedBets = [...bets, user_email];

//       console.log("Updated Bets:", updatedBets);

//       // ✅ Correct API call with new format
//       console.log("Sending data to API:", JSON.stringify({
//         event: {
//           [eventId]: {
//             updatedBy: [
//               {
//                 email: user_email,
//                 timestamp: new Date().toISOString(),
//               }
//             ],
//             data: {
//               bets: updatedBets,
//               status: eventDetails.status,
//               council: "sports",
//               details: {
//                 title: eventDetails.details.title,
//                 timestamp: eventDetails.details.timestamp,
//                 location: eventDetails.details.location,
//               },
//               points: eventDetails.points,
//             },
//           },
//         },
//       }, null, 2));

//       const response = await axios.post(`${backend_link}api/event/scheduleLiveEventWithBets`, {
//         event: {
//           [eventId]: {
//             updatedBy: [
//               {
//                 email: user_email,
//                 timestamp: new Date().toISOString(),
//               }
//             ],
//             data: {
//               bets: updatedBets,
//               status: eventDetails.status,
//               council: "sports",
//               details: {
//                 title: eventDetails.details.title,
//                 timestamp: eventDetails.details.timestamp,
//                 location: eventDetails.details.location,
//               },
//               points: eventDetails.points,
//             },
//           },
//         },
//       });

//       console.log("API Response:", response.data);

//     } else {
//       console.log("User has already placed a bet.");
//     }
//   } catch (error) {
//     console.error("Error updating bets:", error.message);
//   }

// }

// async function handleClick(eventName, eventId, LoginCtx, betTeamName) {
//   try {
//     // ✅ Fetch the existing event data
//     const response = await axios.get(
//       `${backend_link}api/event/getUpcomingEventsById?eventId=${eventName}`
//     );

//     console.log("Event ID:", eventId);
//     const eventData = response.data;
//     if (!eventData) {
//       console.error("No events found.");
//       return;
//     }

//     // ✅ Extract event details
//     const eventDetails = eventData.event[eventId].data;
//     console.log("Event Details:", eventDetails);

//     const user_email = LoginCtx.user.email;

//     // ✅ Ensure points structure exists
//     if (!eventDetails.points || !eventDetails.points.teamA || !eventDetails.points.teamB) {
//       console.error("Invalid event data structure!");
//       return;
//     }

//     // ✅ Determine the correct team to update
//     const teamKey = betTeamName === 'A' ? 'teamA' : 'teamB';
//     const bets = eventDetails.points[teamKey].bets || []; // Ensure bets array exists

//     console.log(`Current Bets for ${teamKey}:`, bets);

//     // ✅ Check if user already placed a bet on this team
//     if (!bets.includes(user_email)) {
//       const updatedBets = [...bets, user_email];

//       console.log(`Updated Bets for ${teamKey}:`, updatedBets);

//       // ✅ Prepare updated event data
//       const updatedEventData = {
//         event: {
//           [eventId]: {
//             updatedBy: [
//               {
//                 email: user_email,
//                 timestamp: new Date().toISOString(),
//               }
//             ],
//             data: {
//               ...eventDetails,
//               points: {
//                 ...eventDetails.points,
//                 [teamKey]: {
//                   ...eventDetails.points[teamKey],
//                   bets: updatedBets, // ✅ Updating the correct team's bets
//                 }
//               }
//             },
//           },
//         },
//         betTeamName, // ✅ Send betTeamName explicitly to backend
//       };

//       console.log("Sending data to API:", JSON.stringify(updatedEventData, null, 2));

//       // ✅ Make API call to update the database
//       const response = await axios.post(
//         `${backend_link}api/event/scheduleLiveEventWithBets`, 
//         updatedEventData
//       );

//       console.log("API Response:", response.data);
//     } else {
//       console.log("User has already placed a bet on this team.");
//     }
//   } catch (error) {
//     console.error("Error updating bets:", error.message);
//   }
// }


// async function handleClick(eventName, eventId, LoginCtx, betTeamName) {
//   try {
//     // ✅ Fetch the existing event data
//     const response = await axios.get(
//       `${backend_link}api/event/getUpcomingEventsById?eventId=${eventName}`
//     );

//     console.log("Event ID:", eventId);
//     const eventData = response.data;
//     if (!eventData) {
//       console.error("No events found.");
//       return;
//     }

//     // ✅ Extract event details
//     const eventDetails = eventData.event[eventId].data;
//     console.log("Event Details:", eventDetails);

//     const user_email = LoginCtx.user.email;

//     // ✅ Ensure points structure exists
//     if (!eventDetails.points || !eventDetails.points.teamA || !eventDetails.points.teamB) {
//       console.error("Invalid event data structure!");
//       return;
//     }

//     // ✅ Check if the user has already placed a bet on either team
//     const userInTeamA = eventDetails.points.teamA.bets.includes(user_email);
//     const userInTeamB = eventDetails.points.teamB.bets.includes(user_email);

//     if (userInTeamA || userInTeamB) {
//       alert("❌ You have already placed a bet on this event!");
//       return; // ✅ Do NOT send a request to the backend
//     }

//     // ✅ Determine the correct team to update
//     const teamKey = betTeamName === "A" ? "teamA" : "teamB";
//     const updatedBets = [...eventDetails.points[teamKey].bets, user_email];

//     console.log(`Updated Bets for ${teamKey}:`, updatedBets);

//     // ✅ Prepare updated event data
//     const updatedEventData = {
//       event: {
//         [eventId]: {
//           updatedBy: [
//             {
//               email: user_email,
//               timestamp: new Date().toISOString(),
//             },
//           ],
//           data: {
//             ...eventDetails,
//             points: {
//               ...eventDetails.points,
//               [teamKey]: {
//                 ...eventDetails.points[teamKey],
//                 bets: updatedBets, // ✅ Updating the correct team's bets
//               },
//             },
//           },
//         },
//       },
//       betTeamName: team, // ✅ Send `betTeamName` to backend for processing (NOT stored in Firestore)
//     };

//     console.log("Sending data to API:", JSON.stringify(updatedEventData, null, 2));

//     // ✅ Make API call to update the database
//     const res = await axios.post(
//       `${backend_link}api/event/scheduleLiveEventWithBets`, 
//       updatedEventData
//     );

//     console.log("API Response:", res.data);
//   } catch (error) {
//     console.error("Error updating bets:", error.message);
//   }
// }

async function handleClick(eventName, eventId, LoginCtx, betTeamName) {
  // console.log(LoginCtx.user.email);
  try {
    // ✅ Fetch the existing event data
    const response = await axios.get(
      `${backend_link}api/event/getUpcomingEventsById?eventId=${eventName}`
    );

    console.log("Event ID:", eventId);
    const eventData = response.data;
    if (!eventData) {
      console.error("No events found.");
      return;
    }

    // ✅ Extract event details
    const eventDetails = eventData.event[eventId].data;
    console.log("Event Details:", eventDetails);

    const user_email = LoginCtx.user.email;

    // ✅ Ensure points structure exists
    if (!eventDetails.points || !eventDetails.points.teamA || !eventDetails.points.teamB) {
      console.error("Invalid event data structure!");
      return;
    }

    // ✅ Check if the user has already placed a bet on either team
    const userInTeamA = eventDetails.points.teamA.bets.includes(user_email);
    const userInTeamB = eventDetails.points.teamB.bets.includes(user_email);

    if (userInTeamA || userInTeamB) {
      alert("❌ You have already placed a bet on this event!");
      return; // ✅ Do NOT send a request to the backend
    } 

    // ✅ Determine the correct team to update
    const teamKey = betTeamName === "A" ? "teamA" : "teamB";
    //  TODO : WRITE A FUNCTON TO CHECK IF USER HAS ALREADY BET
    const updatedBets = [...eventDetails.points[teamKey].bets, user_email];

    console.log(`Updated Bets for ${teamKey}:`, updatedBets);

    // ✅ Prepare updated event data (REMOVED `betTeamName` from request)
    const updatedEventData = {
      event: {
        [eventId]: {
          updatedBy: [
            ...eventData.event[eventId].updatedBy, // ✅ Keep existing `updatedBy` entries
            // {
            //   email: user_email,
            //   timestamp: new Date().toISOString(),
            // },
          ],
          data: {
            ...eventDetails,
            points: {
              ...eventDetails.points,
              [teamKey]: {
                ...eventDetails.points[teamKey],
                bets: updatedBets, // ✅ Updating the correct team's bets
              },
            },
          },
        },
      },
      eventName,
      user_email,
      betTeamName,
    };

    console.log("Sending data to API:", JSON.stringify(updatedEventData, null, 2));

    // ✅ Make API call to update the database
    const res = await axios.post(
      `${backend_link}api/event/scheduleLiveEventWithBets`, 
      updatedEventData
    );

    console.log("API Response:", res.data);
    Alert.alert(`Bet placed successfully on ${betTeamName}`);
  } catch (error) {
    console.error("Error updating bets:", error.message);
  }
}



// async function handleClick(eventName, eventId, LoginCtx, betTeamName) {
//   try {
//     // ✅ Fetch the existing event data
//     const response = await axios.get(
//       `${backend_link}api/event/getUpcomingEventsById?eventId=${eventName}`
//     );

//     console.log("Event ID:", eventId);
//     const eventData = response.data;
//     if (!eventData) {
//       console.error("No events found.");
//       return;
//     }

//     // ✅ Extract event details
//     const eventDetails = eventData.event[eventId]?.data;
//     console.log("Event Details:", eventDetails);

//     if (!eventDetails) {
//       console.error("Invalid event data structure!");
//       return;
//     }

//     const user_email = LoginCtx.user.email;

//     // ✅ Ensure points structure exists
//     if (!eventDetails.points?.teamA || !eventDetails.points?.teamB) {
//       console.error("Invalid event data structure!");
//       return;
//     }

//     // ✅ Determine the correct team to update
//     const teamKey = betTeamName === "A" ? "teamA" : "teamB";
//     const bets = eventDetails.points[teamKey]?.bets || []; // Ensure bets array exists

//     console.log(`${betTeamName === "A"}Current Bets for ${teamKey}:`, bets);

//     // ✅ Check if user already placed a bet on this team
//     if (!bets.includes(user_email)) {
//       const updatedBets = [...bets, user_email];

//       console.log(`Updated Bets for ${teamKey}:`, updatedBets);

//       // ✅ Prepare updated event data WITHOUT `betTeamName`
//       const updatedEventData = {
//         event: {
//           [eventId]: {
//             updatedBy: [
//               {
//                 email: user_email,
//                 timestamp: new Date().toISOString(),
//               },
//             ],
//             data: {
//               ...eventDetails,
//               betTeam: teamKey,
//               points: {
//                 ...eventDetails.points,
//                 [teamKey]: {
//                   ...eventDetails.points[teamKey],
//                   bets: updatedBets, // ✅ Updating the correct team's bets
//                 },
//               },
//             },
//           },
//         },
//       };

//       console.log("Sending data to API:", JSON.stringify(updatedEventData, null, 2));

//       // ✅ Make API call to update the database
//       const response = await axios.post(
//         `${backend_link}api/event/scheduleLiveEventWithBets`,
//         updatedEventData
//       );

//       console.log("API Response:", response.data);
//     } else {
//       console.log("User has already placed a bet on this team.");
//     }
//   } catch (error) {
//     console.error("Error updating bets:", error.message);
//   }
// }








function UpcomingEventCard(props) {
  const timestamp = props.details?.timestamp;
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleDateString();
  let hour = date.getHours();
  const minute = date.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  const formattedTime = `${hour}:${minute < 10 ? "0" : ""}${minute} ${ampm}`;
  const LoginCtx = useContext(LoginContext);

  const teamA = setProperTeamName(props.teamA);
  const teamB = setProperTeamName(props.teamB);

  return (
    <View style={styles.cardContainer}>
      <LinearGradient
        start={{ x: 0.2, y: 0.1 }}
        end={{ x: 0.65, y: 0.5 }}
        locations={[0.6, 1]}
        colors={["white", "#e3e3e3"]}
        style={styles.cardTop}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.matchText}>{props.teamA} v/s {props.teamB}</Text>
          <Text style={styles.matchId}>{props.id}</Text>
        </View>

        <View style={styles.teamsContainer}>
          <View style={styles.teamWrapper}>
            <Image style={styles.teamImage} source={logoPaths[teamA]} />
            <Text style={styles.teamScore}>{props.scoreA}</Text>
            <TouchableOpacity style={styles.voteButton} onPress={() => handleClick(props.gameName, props.id, LoginCtx, "A")}>
              <Text style={styles.voteButtonText}>{props.teamA}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.teamWrapper}>
            <Image style={styles.teamImage} source={logoPaths[teamB]} />
            <Text style={styles.teamScore}>{props.scoreB}</Text>
            <TouchableOpacity style={styles.voteButton} onPress={() => handleClick(props.gameName, props.id, LoginCtx, "B")}>
              <Text style={styles.voteButtonText}>{props.teamB}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.cardBottom}>
        <View style={styles.detailsWrapper}>
          <Text style={styles.detailText}>{props.gameName}</Text>
          <Text style={styles.detailText}>{props.details.location}</Text>
        </View>
        <View style={styles.detailsWrapper}>
          <Text style={styles.detailText}>{formattedDate}</Text>
          <Text style={styles.detailText}>{formattedTime}</Text>
        </View>
      </View>
    </View>
  );
}

export default UpcomingEventCard;

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
  },
  cardTop: {
    padding: 12,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.75,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 5,
  },
  matchText: {
    fontWeight: "600",
    fontSize: 20,
  },
  matchId: {
    fontWeight: "700",
    fontSize: 16,
  },
  teamsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: -10,
  },
  teamWrapper: {
    alignItems: "center",
  },
  teamImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: "contain",
    marginBottom: 3,
  },
  teamScore: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 3,
  },
  voteButton: {
    backgroundColor: "blue",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  voteButtonText: {
    color: "white",
    fontSize: 14,
  },
  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#1A1A2E",
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    elevation: 6,
    shadowColor: "#d41d77",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 0.5,
    shadowOpacity: 1,
  },
  detailsWrapper: {
    alignItems: "center",
  },
  detailText: {
    color: "white",
    fontSize: 16,
  },
});

