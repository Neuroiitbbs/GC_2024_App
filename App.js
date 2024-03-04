import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import { Icon } from "react-native-elements";

import TopMostCard from "./Components/TopMostCard";
import OngoingUpcomingButton from "./Components/OngoingUpcomingButtons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Leaderboard from "./screens/LeaderBoard";
import Events from "./screens/Events";
import LoginScreen from "./screens/LoginPage";
import AllTabs from "./screens/AllTabs";
import axios from "axios";
import AddLiveEvents from "./screens/AddLiveEvents";

//update score Admin
// import AdminOngoingScreen from './screens/AdminOngoingScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simulate an authentication function
  const authenticateUser = (status) => {
    setIsAuthenticated(status);
  };

  return (
    // <AddLiveEvents/>
    <NavigationContainer>
      {isAuthenticated ? (
        <AllTabs />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login">
            {(props) => (
              <LoginScreen {...props} authenticateUser={authenticateUser} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
