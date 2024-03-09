import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const SpecificNewsPage = ({ route }) => {
  const data = route.params?.data;
  const timestamp = data.timestamp;
  const date = new Date(
    timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000
  );
  const formattedDate = date.toLocaleDateString(); // Date component
  let hour = date.getHours();
  const minute = date.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  hour = hour ? hour : 12;
  const formattedTime = `${hour}:${minute < 10 ? "0" : ""}${minute} ${ampm}`;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
      <ScrollView>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.time}>{formattedTime}</Text>
        <Image
          source={{ uri: data.imageUrl }}
          style={{ width: width * 0.9, height: 150, borderRadius: 15 }}
        />
        <Text style={styles.description}>{data.description}</Text>
        <View style={{ minHeight: 70 }}></View>
      </ScrollView>
    </View>
  );
};

export default SpecificNewsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left",
  },
  date: {
    color: "white",
    fontSize: 15,
  },
  time: {
    color: "white",
    fontSize: 15,
    marginBottom: 10,
  },
  description: {
    color: "white",
    fontSize: 18,
    marginBottom: 10,
    paddingVertical: 15,
  },
});
