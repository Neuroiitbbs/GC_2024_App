import React, { useState, useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Modal, ActivityIndicator } from "react-native";
import { Button, Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { LoginProvider, LoginContext } from "./store/LoginContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import CreditsPage from "./screens/CreditsPage";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import {
  auth,
  iosClientId,
  androidClientId,
  webClientId,
} from "./firebaseConfig";
import LoginScreen from "./screens/LoginPage";
import AllTabs from "./screens/AllTabs";
import { backend_link } from "./utils/constants";

import * as Notifications from "expo-notifications";
// import {
//   scheduleNotificationHandler,
//   requestPermissions,
//   receivedNotification,
//   receivedNotificationResponse,
// } from "./utils/notifications/local";

// import {
//   getPushToken,
//   configurePushNotifications,
// } from "./utils/notifications/push";
// // setNotificationHandler();

WebBrowser.maybeCompleteAuthSession();

const Stack = createStackNavigator();

export default function LoginContextWrapper() {
  return (
    <LoginProvider>
      <App />
    </LoginProvider>
  );
}
const App = () => {
  const LoginCtx = useContext(LoginContext);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    iosClientId: iosClientId,
    androidClientId: androidClientId,
    webClientId: webClientId,
  });
  // const [expoPushToken, setExpoPushToken] = useState("");
  // useEffect(() => {
  //   requestPermissions();
  // }, []);
  // useEffect(() => {
  //   const gettoken = async () => {
  //     const pushToken = await configurePushNotifications();
  //     console.log(pushToken, "Push Token");
  //     setExpoPushToken(pushToken);
  //   };
  //   gettoken();
  // }, []);

  // useEffect(() => {
  //   if (expoPushToken !== "") {
  //     const sendToken = async () => {
  //       const email = LoginCtx?.user?.email;
  //       if (email !== null && email !== undefined) {
  //         try {
  //           const response = await axios.post(
  //             backend_link +
  //               "api/expotoken/addexpotoken?email=" +
  //               email +
  //               "&token=" +
  //               expoPushToken
  //           );
  //           console.log(response.data, "Push Token");
  //         } catch (e) {
  //           console.log(e, "Error in sending push token");
  //         }
  //       }
  //     };
  //     sendToken();
  //   }
  // }, [expoPushToken, LoginCtx.isLogin]);

  // useEffect(() => {
  //   const subscription1 = receivedNotification();
  //   const subscription2 = receivedNotificationResponse();

  //   return () => {
  //     // subscription1.remove();
  //     // subscription2.remove();
  //     Notifications.removeNotificationSubscription(subscription1);
  //     Notifications.removeNotificationSubscription(subscription2);
  //   };
  // }, []);
  const [loading, setLoading] = useState(true);
  const [isLoading1, setIsLoading1] = useState(false);
  const authenticateUser = (status) => {
    LoginCtx.setIsLogin(status);
    // LoginCtx.setUser({email:'22ec01006@iitbbs.ac.in'});
  };

  const isUserLoggedIn = async () => {
    const userInfo = await AsyncStorage.getItem("userInfo");
    if (userInfo) {
      LoginCtx.setUser(JSON.parse(userInfo));
      LoginCtx.setIsLogin(true);
      setLoading(false);
    } else {
      LoginCtx.setIsLogin(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (response?.type === "success") {
      setIsLoading1(true);
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
      setLoading(false);
      setTimeout(() => {
        setIsLoading1(false);
      }, 1000 * 4);
    }
  }, [response]);

  useEffect(() => {
    isUserLoggedIn();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user, "User");
        AsyncStorage.setItem("userInfo", JSON.stringify(user));
        LoginCtx.setUser(user);
        LoginCtx.setIsLogin(true);
      } else {
        LoginCtx.setUser(null);
        LoginCtx.setIsLogin(false);
        setLoading(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (LoginCtx.isLogin) {
      //check if user is admin
      console.log("Admin logging in");
      const isAdminorNot = async () => {
        const user = LoginCtx.user;
        // const Testemail = {
        //   admin: "22EC01057@iitbbs.ac.in",
        //   user: "22EC01099@iitbbs.ac.in",
        // };
        if (user?.email !== null) {
          try {
            const response = await axios.get(
              backend_link + "api/admin/isAdmin/" + user?.email
            );
            console.log(response.data, "Admin or not");
            LoginCtx.setIsAdmin(response.data.isAdmin);
          } catch (e) {
            console.log(e, "Error in checking admin or not");
          } finally {
            setLoading(false);
          }
        }
      };
      isAdminorNot();
    }
  }, [LoginCtx.isLogin]);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <NavigationContainer>
          <StatusBar style="light" />

          {loading && (
            <Modal transparent={true} animationType="none" visible={loading}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(0,0,0,0.5)",
                }}
              >
                <ActivityIndicator size="large" color="#fff" />
              </View>
            </Modal>
          )}
          {!loading && LoginCtx.isLogin ? (
            <>
              <AllTabs />
              {/* <Button
                title="notify"
                style={{ backgroundColor: "red", padding: "10px" }}
                onPress={() => {
                  scheduleNotificationHandler("title", "body");
                  console.log("Notification");
                }}
              /> */}
            </>
          ) : (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login">
                {(props) => (
                  <>
                    <LoginScreen
                      {...props}
                      authenticateUser={authenticateUser}
                      promptAsync={promptAsync}
                      loading1={isLoading1}
                    />
                  </>
                )}
              </Stack.Screen>
              <Stack.Screen
                name="Credits"
                component={CreditsPage}
                options={({ route }) => ({
                  title: "Credits",
                })}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000",
  },
});
