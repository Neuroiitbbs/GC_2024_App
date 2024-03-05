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
import EventDropDown from "./eventsDropdown";

export default function Header({ events }) {
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
      
        <Image
          source={require("../assets/logo.png")}
          style={{ width: 60, height: 60, resizeMode: "center" }} // Set explicit dimensions
        />
  
     
        <MaskedView
          maskElement={
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              GC 2024
            </Text>
          }
          style={{height:50,alignItems:"center" ,justifyContent:"center" ,flex:1}}
        >
          <LinearGradient
            colors={["#88345E", "#516FAD", "#4D73B2"]}
            start={[0, 0]}
            end={[1, 0]}
            style={{
              padding: 55,
              
              width: events ? 125 : 250,
              backgroundColor: "black",
            }}
          ></LinearGradient>
        </MaskedView>

      <View style={{ backgroundColor: "black" ,height:50 ,alignItems :"center"}}>
        {events && <EventDropDown />}
      </View>
      {/* <View>
        <TouchableOpacity onPress={openModal}>
          <Icon name="menu" size={30} color="white" />
        </TouchableOpacity>
      </View> */}
    </View>
  );
}
styles = StyleSheet.create({
  header: {

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",flex:0.4,
  
    backgroundColor: "#111319",
  },
});
