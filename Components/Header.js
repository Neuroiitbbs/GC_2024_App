import { useState } from "react";

import { StatusBar } from "expo-status-bar";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import { ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import Icon from "react-native-vector-icons/MaterialIcons";
import Modal from "./Modal";

export default function Header() {
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  return (
    <View
      style={styles.header}
      // style={{
      //     // Transparent background because mask is based off alpha channel.
      //     margin: 20,
      //     backgroundColor: 'transparent',
      //     flex: 1,
      //     justifyContent: 'space-evenly',
      //     alignItems: 'center',
      // }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/logo.png")}
          style={{ width: 60, height: 60, resizeMode: "center" }} // Set explicit dimensions
        />
        {/* <Text style={styles.newsTitle}>GC 2024</Text> */}
        <MaskedView
          maskElement={
            
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "bold",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 70,
                }}
              >
                GC 2024
              </Text>
            
          }
        >
          <LinearGradient
            colors={["#88345E", "#516FAD", "#4D73B2"]}
            start={[0, 0]}
            end={[1, 0]}
            style={{
              padding: 15,
              alignItems: "center",
              borderRadius: 5,
              width: 250,
              backgroundColor: "black",
            }}
          >
            
          </LinearGradient>
        </MaskedView>
      </View>
      <TouchableOpacity onPress={openModal}>
        <Icon name="menu" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}
styles = StyleSheet.create({
  header: {
    
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111319",
    justifyContent: "space-between",
  },
});
