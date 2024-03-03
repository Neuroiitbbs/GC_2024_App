import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useState } from "react";
import { Icon } from "react-native-elements";

import TopMostCard from "./Components/TopMostCard";
import OngoingUpcomingButton from "./Components/OngoingUpcomingButtons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Leaderboard from "./screens/LeaderBoard";
import Events from "./screens/Events";
import LoginScreen from "./screens/LoginPage";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
function MyTabs() {
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
          position: 'absolute', // This along with the following lines create the hovering effect
          bottom: 40, // Distance from the bottom of the screen
          left: 20,
          right: 20,
          borderRadius: 25, // Rounds the corners of the tabBar
          shadowColor: '#000', // Shadow color for iOS
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
          // Using React Native Elements for Icons
          return <Icon name={iconName} type="material-community" size={18} color={color} />;
        },
        tabBarActiveTintColor: "#D41D77",
        tabBarInactiveTintColor: "black",
      })}
    >
      <Tab.Screen name="Events" component={Events} />
      <Tab.Screen name="Leaderboard" component={Leaderboard} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simulate an authentication function
  const authenticateUser = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <MyTabs />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} authenticateUser={authenticateUser} />}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
