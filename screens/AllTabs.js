import { useState, useEffect, useContext } from "react";
import { Icon } from "react-native-elements";
import { Pressable, Text, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import Leaderboard from "./LeaderBoard";

import Events from "./Events/Events";
import SpecificEvents from "./Events/SpecificEvents";

import Homepage from "./Homepage";
import NewsPage from "./NewsPage";
import SpecificNewsPage from "./specificNewsPage";

import Header from "../Components/Header";
import TeamPoints from "./TeamPoints";
import { LoginContext } from "../store/LoginContext";

import LiveEvents from "./Admin/LiveEvents";
import AddNewsImage from "./Admin/AddNewsImage";
import AddSportEvents from "./Admin/AddSportEvents";
import AdminDashboard from "./Admin/AdminDashboard";
import AddTechCultEvent from "./Admin/AddTechCultEvent";
import AddCarouselImage from "./Admin/AddCarouselImage";
import AddSportEventResult from "./Admin/AddSportResult";
import UpdateSportEvents from "./Admin/UpdateSportScore";
import UpdateTechCultEvents from "./Admin/UpdateTechCultEvent";
import UpdateSportEventResult from "./Admin/UpdateSportEventPoint";
import CheckUpdateTechCultEvents from "../Components/CheckUpdateEvent";
import CheckSportUpdateEvent from "../Components/CheckSportUpdateEvent";
import SportPoints from "./Admin/SportPoints";

import setProperTeamName from "../utils/setProperTeamName";

const Tab = createBottomTabNavigator();
const EventsStack = createStackNavigator();
const LeaderboardStack = createStackNavigator();
const AdminDashboardStack = createStackNavigator();
const HomepageStack = createStackNavigator();

// Create a stack navigator for each tab to include the Header
function EventsStackNavigator() {
  return (
    <EventsStack.Navigator>
      <EventsStack.Screen
        name="EventsStack"
        component={Events}
        options={({ route }) => ({
          headerTitle: () => <Header events={true} />,
          headerStyle: { backgroundColor: "#111319", height: 100 },
          field: route.params?.field || "Sports",
        })}
      />
      <EventsStack.Screen
        name="SpecificEvent"
        component={SpecificEvents}
        options={({ route }) => ({
          headerTitle: () => <Header />,
          headerStyle: { backgroundColor: "#111319", height: 120 },
          headerTintColor: "white",
          data: route.params.data,
        })}
      />
    </EventsStack.Navigator>
  );
}




function LeaderboardStackNavigator() {
  return (
    <LeaderboardStack.Navigator>
      <LeaderboardStack.Screen
        name="LeaderboardStack"
        component={Leaderboard}
        options={{
          headerShown: false,
          // headerTitle: (props) => <Header />,
          headerStyle: { backgroundColor: "#111319", height: 100 },
        }}
      />
    </LeaderboardStack.Navigator>
  );
}
function HomepageStackNavigator() {
  return (
    <HomepageStack.Navigator initialRouteName="HomePageStack">
      <HomepageStack.Screen
        name="HomepageStack"
        component={Homepage}
        options={{
          headerShown: true,
          headerTitle: (props) => <Header showmodal={true} />,
          headerStyle: { backgroundColor: "#111319", height: 100 },
        }}
      />
      <HomepageStack.Screen
        name="NewsPage"
        component={NewsPage}
        options={{
          headerShown: false,
          headerTitle: (props) => <Header />,
          headerStyle: { backgroundColor: "#111319", height: 100 },
        }}
      />
      <HomepageStack.Screen
        name="SpecificNewsPage"
        component={SpecificNewsPage}
        options={({ route }) => ({
          data: route.params?.data,
          // headerShown: false,
          headerTitle: (props) => <Header />,
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#111319", height: 100 },
        })}
      />
    </HomepageStack.Navigator>
  );
}
function AdminDashboardStackNavigator() {
  return (
    <AdminDashboardStack.Navigator>
      <AdminDashboardStack.Screen
        name="AdminDashboardStack"
        component={AdminDashboard}
        options={{
          headerShown: false,
          // headerTitle: () => <Header />,
          // headerStyle: { backgroundColor: "#111319", height: 100 },
        }}
      />
      <AdminDashboardStack.Screen
        name="AdminAddScoreStack"
        component={UpdateSportEvents}
        options={{
          headerTitle: () => <Header />,
          headerTintColor: "white",
          // headerLeft: null,
          headerStyle: { backgroundColor: "#111319" },
          // headerShown: false,
        }}
      />
      <AdminDashboardStack.Screen
        name="LiveEvents"
        component={LiveEvents}
        options={{
          // headerTitle: () => <Header />,
          // headerTintColor: "white", // YAY! Proper format!
          // headerStyle: { backgroundColor: "#111319" },
          headerShown: false,
        }}
      />
      <AdminDashboardStack.Screen
        name="AddSportEvent"
        component={AddSportEvents}
        options={{
          // headerTitle: () => <Header />,
          // headerTintColor: "white", // YAY! Proper format!
          // headerStyle: { backgroundColor: "#111319" },
          headerShown: false,
        }}
      />
      <AdminDashboardStack.Screen
        name="AddNewsImage"
        component={AddNewsImage}
        options={{
          // headerTitle: () => <Header />,
          // headerTintColor: "white", // YAY! Proper format!
          // headerStyle: { backgroundColor: "#111319" },
          headerShown: false,
        }}
      />
      <AdminDashboardStack.Screen
        name="AddTechCultEvent"
        component={AddTechCultEvent}
        options={{
          // headerTitle: () => <Header />,
          // headerTintColor: "white", // YAY! Proper format!
          // headerStyle: { backgroundColor: "#111319" },
          headerShown: false,
        }}
      />
      <AdminDashboardStack.Screen
        name="CheckUpdateTechCultEvent"
        component={CheckUpdateTechCultEvents}
        options={{
          // headerTitle: () => <Header />,
          // headerTintColor: "white", // YAY! Proper format!
          // headerStyle: { backgroundColor: "#111319" },
          headerShown: false,
        }}
      />
      <AdminDashboardStack.Screen
        name="UpdateTechCultEvent"
        component={UpdateTechCultEvents}
        options={{
          // headerTitle: () => <Header />,
          // headerTintColor: "white", // YAY! Proper format!
          // headerStyle: { backgroundColor: "#111319" },
          headerShown: false,
        }}
      />
      <AdminDashboardStack.Screen
        name="AddCarouselImage"
        component={AddCarouselImage}
        options={{
          // headerTitle: () => <Header />,
          // headerTintColor: "white", // YAY! Proper format!
          // headerStyle: { backgroundColor: "#111319" },
          headerShown: false,
        }}
      />
      <AdminDashboardStack.Screen
        name="SportPoints"
        component={SportPoints}
        options={{
          // headerTitle: () => <Header />,
          // headerTintColor: "white", // YAY! Proper format!
          // headerStyle: { backgroundColor: "#111319" },
          headerShown: false,
        }}
      />
      <AdminDashboardStack.Screen
        name="AddSportEventResult"
        component={AddSportEventResult}
        options={{
          // headerTitle: () => <Header />,
          // headerTintColor: "white", // YAY! Proper format!
          // headerStyle: { backgroundColor: "#111319" },
          headerShown: false,
        }}
      />
      <AdminDashboardStack.Screen
        name="CheckUpdateSportsEvent"
        component={CheckSportUpdateEvent}
        options={{
          // headerTitle: () => <Header />,
          // headerTintColor: "white", // YAY! Proper format!
          // headerStyle: { backgroundColor: "#111319" },
          headerShown: false,
        }}
      />
      <AdminDashboardStack.Screen
        name="UpdateSportEventResult"
        component={UpdateSportEventResult}
        options={{
          // headerTitle: () => <Header />,
          // headerTintColor: "white", // YAY! Proper format!
          // headerStyle: { backgroundColor: "#111319" },
          headerShown: false,
        }}
      />
    </AdminDashboardStack.Navigator>
  );
}

export default function AllTabs() {
  const LoginCtx = useContext(LoginContext);
  const navigation = useNavigation();

  const handleTabPress = () => {
    // Perform action when a tab is pressed
    navigation.navigate("   ");
  };
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          justifyContent: "space-between",
          alignItems: "center",
          height: 51, // Adjust height as needed
          paddingBottom: 0, // Adjust padding to ensure icons and text are aligned and not touching the screen's bottom edge
          paddingTop: 10,
          paddingHorizontal: 20, // Adds horizontal padding
          position: "absolute", // This along with the following lines create the hovering effect
          bottom: 25, // Distance from the bottom of the screen
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
          height: 40,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === " ") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "  ") {
            iconName = focused ? "trophy" : "trophy-outline";
          } else if (route.name === "     ") {
            iconName = focused ? "cog" : "cog-outline";
            // Using React Native Elements for Icons
          } else if (route.name === "   ") {
            iconName = focused ? "account-group" : "account-group-outline";
          } else if (route.name === "    ") {
            iconName = focused ? "home" : "home-outline";
          }
          return (
            <Icon
              name={iconName}
              type="material-community"
              size={27}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: "#D41D77",
        tabBarInactiveTintColor: "black",
      })}
      initialRouteName="    "
    >
      <Tab.Screen name=" " component={EventsStackNavigator} />
      <Tab.Screen name="  " component={LeaderboardStackNavigator} />
      <Tab.Screen name="    " component={HomepageStackNavigator} />
      <Tab.Screen
        name="   "
        component={TeamPoints}
        options={({ route }) => ({
          branch: route.params?.branch,
          key: Math.random().toString(),
          tabBarIcon: ({ focused, color, size }) => (
            <TouchableOpacity onPress={handleTabPress}>
              <Icon
                name="account-group"
                type="material-community"
                size={27}
                color={color}
              />
            </TouchableOpacity>
          ),
        })}
      />
      {LoginCtx.isAdmin && (
        <Tab.Screen name="     " component={AdminDashboardStackNavigator} />
      )}
    </Tab.Navigator>
  );
}
