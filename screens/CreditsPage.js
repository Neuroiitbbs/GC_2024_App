import React from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreditsPage() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Credits Page</Text>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Credits for team members */}
        <Text style={styles.sectionTitle}>App Lead</Text>
        <View style={[styles.section, styles.elevation]}>
          <Image
            source={require("../assets/DevTeam/Ayush.jpg")}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              overflow: "hidden",
              justifyContent: "center",
              marginRight: "15%",
            }}
          />
          <Text style={styles.member}>Ayush Pratap Singh</Text>
        </View>

        <Text style={styles.sectionTitle}>Design Lead</Text>
        <View style={[styles.section, styles.elevation]}>
          <Image
            source={require("../assets/DevTeam/manish.jpg")}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              overflow: "hidden",
              marginRight: "15%",
            }}
          />
          <Text style={styles.member}>Manish Mondal</Text>
        </View>

        <Text style={styles.sectionTitle}>Backend Developers</Text>
        <View style={[styles.section, styles.elevation]}>
          <Image
            source={require("../assets/DevTeam/saurabh.jpg")}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              overflow: "hidden",
              marginRight: "15%",
            }}
          />
          <Text style={styles.member}>Kumar Saurabh</Text>
        </View>
        <View style={[styles.section, styles.elevation]}>
          <Image
            source={require("../assets/DevTeam/Akshit.jpg")}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              overflow: "hidden",
              marginRight: "15%",
            }}
          />
          <Text style={styles.member}>Akshit Dudeja</Text>
        </View>

        {/* Team Members */}
        <Text style={styles.sectionTitle}>Team Members</Text>
        <View style={[styles.section, styles.elevation]}>
          <Image
            source={require("../assets/DevTeam/Rachit.jpg")}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              overflow: "hidden",
              marginRight: "15%",
            }}
          />
          <Text style={styles.member}>Rachit Jain</Text>
        </View>
        <View style={[styles.section, styles.elevation]}>
          <Image
            source={require("../assets/DevTeam/AyushGupta.jpg")}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              overflow: "hidden",
              marginRight: "15%",
            }}
          />
          <Text style={styles.member}> Ayush Gupta</Text>
        </View>
        <View style={[styles.section, styles.elevation]}>
          <Image
            source={require("../assets/DevTeam/Devesh.jpg")}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              overflow: "hidden",
              marginRight: "15%",
            }}
          />
          <Text style={styles.member}> Devesh Patodkar</Text>
        </View>
        <View style={[styles.section, styles.elevation]}>
          <Image
            source={require("../assets/DevTeam/Karthick.jpg")}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              overflow: "hidden",
              marginRight: "15%",
            }}
          />
          <Text style={styles.member}> Cherukuri Karthick</Text>
        </View>
        <View style={[styles.section, styles.elevation]}>
          <Image
            source={require("../assets/DevTeam/Viraj.jpg")}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              overflow: "hidden",
              marginRight: "15%",
            }}
          />
          <Text style={styles.member}> Viraj Rodge</Text>
        </View>
        <View style={[styles.section, styles.elevation]}>
          <Image
            source={require("../assets/DevTeam/shubranshu.jpg")}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              overflow: "hidden",
              marginRight: "15%",
            }}
          />
          <Text style={styles.member}> Subhransu Nayak</Text>
        </View>
        <View style={[styles.section, styles.elevation]}>
          <Image
            source={require("../assets/DevTeam/Chaitnaya.jpg")}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              overflow: "hidden",
              marginRight: "15%",
            }}
          />
          <Text style={styles.member}>Chaitanya Bhardwaj</Text>
        </View>

        {/* Special Thanks */}
        <Text style={styles.sectionTitle}>Special Thanks</Text>

        <View style={[styles.section, styles.elevation]}>
          <Image
            source={require("../assets/DevTeam/Sambit.jpg")}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              overflow: "hidden",
              marginRight: "24%",
            }}
          />
          <View styles={{ alignItems: "center" }}>
            <Text style={styles.member}>Sambit Mishra</Text>
            <Text style={{ fontSize: 10, marginLeft: 20, color: "white" }}>
              Genral Secretary
            </Text>
            <Text
              style={{
                fontSize: 10,
                marginLeft: 0,
                color: "white",
              }}
            >
              STC ,Students' Gymkhana
            </Text>
          </View>
        </View>

        <View style={[styles.section, styles.elevation]}>
          <Image
            source={require("../assets/DevTeam/Ayush.jpg")}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              overflow: "hidden",
              marginRight: "24%",
            }}
          />
          {/* <Text style={styles.member}>Ayush Pratap Singh</Text> */}
          {/* <Text style={{ fontSize: 10 }}>
            Secretary The Programming Society Students' Gymkhana
          </Text> */}
          <View styles={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 20,
                marginBottom: 5,
                color: "white",
                marginLeft: -20,
              }}
            >
              Ayush Patap Singh
            </Text>
            <Text style={{ fontSize: 10, marginLeft: -10, color: "white" }}>
              NEUROMANCERS Secretary
            </Text>
            <Text style={{ fontSize: 10, marginLeft: 7, color: "white" }}>
              Students' Gymkhana
            </Text>
          </View>
        </View>
        <View style={[styles.section, styles.elevation]}>
          <Image
            source={require("../assets/DevTeam/AyushT.jpg")}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              overflow: "hidden",
              marginRight: "24%",
            }}
          />
          <Text style={styles.member}>Ayush Tiwari</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DDD0C8",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    color: "#323232",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
    backgroundColor: "#fff",
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#323232",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#323232",
  },
  memberGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  member: {
    fontSize: 20,
    marginBottom: 5,
    color: "white",
  },
  elevation: {
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
