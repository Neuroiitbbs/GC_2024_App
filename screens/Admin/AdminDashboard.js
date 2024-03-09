import React from "react";
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
} from "react-native";

import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";

const AdminDashboard = ({ navigation }) => {
  const AddPoints = () => {
    return navigation.navigate("AdminAddScoreStack");
  };

  return (
    <View style={styles.container}>
      <View style={{ maxHeight: "95%", paddingTop: 40 }}>
        <Text style={styles.heading}>Admin</Text>
        <Text style={styles.text}>
          Please click on the specific tile for the options related to that
          particular feature/option.
        </Text>
        <ScrollView>
          <View style={styles.subcontainer}>
            {/* Left Column */}
            <View style={styles.column}>
              <Pressable
                style={({ pressed }) => [
                  styles.cardView,
                  pressed ? styles.cardPressed : {},
                ]}
                onPress={() => {}}
              >
                <MaterialCommunityIcons
                  name="bell"
                  size={30}
                  color="#0066FF"
                  style={{ paddingVertical: 2 }}
                />
                <Text style={styles.cardTitle}>Notifications</Text>
                <Text style={styles.cardDescription}>
                  Send or Delete Notifications
                </Text>
                <AntDesign name="arrowright" size={20} color="white" />
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.cardView,
                  pressed ? styles.cardPressed : {},
                ]}
                onPress={() => {
                  navigation.navigate("AddNewsImage");
                }}
              >
                <View style={{ paddingVertical: 15 }}>
                  <Image
                    source={require("../../assets/news.png")}
                    style={{ alignSelf: "center" }}
                  />
                </View>
                <Text style={styles.cardTitle}>News</Text>
                <Text style={styles.cardDescription}>
                  Only for Oracle Members
                </Text>
                <AntDesign name="arrowright" size={20} color="white" />
              </Pressable>

              {/* <Pressable
                style={({ pressed }) => [
                  styles.cardView,
                  pressed ? styles.cardPressed : {},
                ]}
                onPress={() => {
                  AddPoints();
                }}
              >
                <Octicons
                  name="north-star"
                  size={30}
                  color="#0066FF"
                  style={{ paddingVertical: 2 }}
                />
                <Text style={styles.cardTitle}>Add Score</Text>
                <AntDesign name="arrowright" size={20} color="white" />
              </Pressable> */}
            </View>
            {/* Right Column */}
            <View style={styles.column}>
              <Pressable
                style={({ pressed }) => [
                  styles.cardView,
                  pressed ? styles.cardPressed : {},
                ]}
                onPress={() => {
                  navigation.navigate("LiveEvents");
                }}
              >
                <View style={{ paddingVertical: 10 }}>
                  <Image
                    source={require("../../assets/liveEvents.png")}
                    style={{ alignSelf: "center" }}
                  />
                </View>
                <Text style={styles.cardTitle}>Live Events</Text>
                <Text style={styles.cardDescription}>
                  Add or Update a Live Event
                </Text>
                <AntDesign name="arrowright" size={20} color="white" />
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.cardView,
                  pressed ? styles.cardPressed : {},
                ]}
                onPress={() => {
                  AddPoints();
                }}
              >
                <Octicons
                  name="north-star"
                  size={30}
                  color="#0066FF"
                  style={{ paddingVertical: 2 }}
                />
                <Text style={styles.cardTitle}>Add Score</Text>
                <AntDesign name="arrowright" size={20} color="white" />
              </Pressable>
            </View>
            {/* Right Column */}
            <View style={styles.column}>
              {/* <Pressable
            style={({ pressed }) => [
              styles.cardView,
              pressed ? styles.cardPressed : {},
            ]}
            onPress={() => {navigation.navigate('LiveEvents');}}
          >
            <View style={{ paddingVertical: 10 }}>
              <Image
                source={require("../assets/liveEvents.png")}
                style={{ alignSelf: "center" }}
              /> */}
              <Pressable
                style={({ pressed }) => [
                  styles.cardView,
                  pressed ? styles.cardPressed : {},
                ]}
                onPress={() => {
                  navigation.navigate("AddCarouselImage");
                }}
              >
                <Image
                  source={require("../../assets/carousel.png")}
                  style={{ alignSelf: "center" }}
                />
                <Text style={styles.cardTitle}>Carousel Image</Text>
                <Text style={styles.cardDescription}>
                  Add or Delete Carousel Image
                </Text>
                <AntDesign name="arrowright" size={20} color="white" />
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.cardView,
                  pressed ? styles.cardPressed : {},
                ]}
                onPress={() => {}}
              >
                <FontAwesome5
                  name="trophy"
                  size={30}
                  color="#0066FF"
                  style={{ paddingVertical: 2 }}
                />
                <Text style={styles.cardTitle}>Add Event Result</Text>
                <AntDesign name="arrowright" size={20} color="white" />
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default AdminDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#000",
  },
  heading: {
    color: "#d21d76",
    fontSize: 32,
    fontWeight: "500",
    marginVertical: 8,
  },
  text: {
    color: "#78889B",
    fontSize: 15,
    fontWeight: "400",
  },
  subcontainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  column: {
    flex: 1,
    margin: 4,
    borderRadius: 10,
    gap: 8,
  },
  cardView: {
    backgroundColor: "#111319",
    padding: 10,
    borderRadius: 10,
    paddingVertical: 15,
    marginBottom: 8,
  },
  cardTitle: {
    color: "#d21d76",
    fontSize: 15,
    fontWeight: "500",
    paddingVertical: 3,
  },
  cardDescription: {
    color: "#78889B",
    fontSize: 12,
    fontWeight: "400",
    paddingVertical: 2,
  },
  cardPressed: {
    opacity: 0.5,
  },
});
