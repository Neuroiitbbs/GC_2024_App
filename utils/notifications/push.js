import * as Notifications from "expo-notifications";
import { Alert, Platform } from "react-native";
import Constants from "expo-constants";
import { useEffect } from "react";

export const getPushToken = async () => {
  const token = await Notifications.getExpoPushTokenAsync({
    projectId: Constants.expoConfig.extra.eas.projectId,
  });

  console.log(token, "Push 1Token");
  return token;
};

export const configurePushNotifications = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  let finalStatus = status;
  if (status !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    Alert.alert("Failed to get push token for push notification!");
    return;
  }
  const pushToken = await getPushToken();
  console.log(pushToken.data, "Push2 Token");

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  return pushToken.data;
};
