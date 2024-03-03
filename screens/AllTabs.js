import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import { Icon } from "react-native-elements";
import AdminDashboard from "./AdminDashboard";
import TopMostCard from "../Components/TopMostCard";
import OngoingUpcomingButton from "../Components/OngoingUpcomingButtons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Leaderboard from "./LeaderBoard";
import Events from "./Events";
import LoginScreen from "./LoginPage";
const Tab = createBottomTabNavigator();

export default function AllTabs() {
    const [events, setEvents] = useState([]);
  
    // useEffect(() => {
    //   fetch("http://your-backend-ip-address:your-backend-port/api/event")
    //     .then((response) => response.json())
    //     .then((data) => {
    //       setEvents(data); // Assuming data is an array of events
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching events:", error);
    //     });
    // }, []);
  
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: "#fff",
            justifyContent: "space-between",
            alignItems: "center",
            height: 49, // Adjust height as needed
            paddingBottom: 10, // Adjust padding to ensure icons and text are aligned and not touching the screen's bottom edge
            paddingTop: 10,
            paddingHorizontal: 20, // Adds horizontal padding
            position: "absolute", // This along with the following lines create the hovering effect
            bottom: 40, // Distance from the bottom of the screen
            left: 20,
            right: 20,
            borderRadius: 25, // Rounds the corners of the tabBar
            shadowColor: "#000", // Shadow color for iOS
            shadowOffset: { width: 0, height: 10 }, // Shadow position for iOS
            shadowOpacity: 0.3, // Shadow opacity for iOS
            shadowRadius: 5, // Shadow blur radius for iOS
          },
          tabBarItemStyle: {
            alignContent: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
  
            if (route.name === "Events") {
              iconName = focused ? "calendar" : "calendar-outline";
            } else if (route.name === "Leaderboard") {
              iconName = focused ? "trophy" : "trophy-outline";
            }
            else if(route.name === "AdminDashboard") {
              iconName = focused ? "cog" : "cog-outline";
            }
            // Using React Native Elements for Icons
            return (
              <Icon
                name={iconName}
                type="material-community"
                size={18}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: "#D41D77",
          tabBarInactiveTintColor: "black",
        })}
      >
        <Tab.Screen name="Events" component={Events} />
        <Tab.Screen name="Leaderboard" component={Leaderboard} />
        <Tab.Screen name="AdminDashboard" component={AdminDashboard} />
      </Tab.Navigator>
    );
  }