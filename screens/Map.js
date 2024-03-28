import { useState } from "react";
import {
  Text,
  StyleSheet,
  Modal,
  View,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
//,football
const dotNames = {
  cc: "Cc",
  sac: "Sac",
  lhc1: "Lhc1",
  lhc3: "Lhc3",
  lbc: "Lbc",
  mhrGround: "MhrGround",
  cricket: "Cricket",
  vb: "Volley ball",
  football: "Football",
};
//blue,white
const dotsList = [
  { name: dotNames.cc, top: "15%", left: "74%" },
  { name: dotNames.sac, top: "37%", left: "65%" },
  { name: dotNames.lhc1, top: "72%", left: "12%" },
  { name: dotNames.lhc3, top: "82%", left: "7%" },
  { name: dotNames.lbc, top: "88%", left: "27%" },
  { name: dotNames.mhrGround, top: "42%", left: "41%" },
  { name: dotNames.cricket, top: "19%", left: "37%" },
  { name: dotNames.vb, top: "35%", left: "56%" },
  { name: dotNames.football, top: "25%", left: "53%" },
];
const eventType = [
  { name: "TECH", color: "blue" },
  { name: "SPORTS", color: "white" },
  { name: "CULT", color: "orange" },
];

const dummyData = [
  { name: "football 1", type: eventType[0].name, location: dotNames.football },
  { name: "quiz", type: eventType[2].name, location: dotNames.lhc1 },
  { name: "css battle", type: eventType[1].name, location: dotNames.lbc },
  { name: "NBA", type: eventType[1].name, location: dotNames.mhrGround },
  { name: "NBA", type: eventType[1].name, location: dotNames.cc },
];

const Dot = ({ dot, setSelectedDot, selectedDot, eventList }) => {
  const extra =
    selectedDot == dot.name
      ? styles.dot
      : { ...styles.dot, backgroundColor: "transparent" };
  const modifiedEventList = eventList.map((each) => {
    const event = eventType.find((each1) => each1.name === each.type);
    return {
      ...each,
      eventType: event,
    };
  });

  return (
    <TouchableOpacity
      style={{
        ...extra,
        top: dot.top,
        left: dot.left,
      }}
      onPress={() => {
        setSelectedDot(dot.name);
      }}>
      {!(selectedDot == dot.name) && (
        <MaterialCommunityIcons name="map-marker" size={24} color="red" />
      )}
      {selectedDot == dot.name && (
        <View style={{ borderRadius: extra.borderRadius, overflow: "hidden" }}>
          <BlurView style={{ padding: 10 }}>
            {modifiedEventList.map((each) => (
              <Text style={{ color: each.eventType.color }}>{each.name}</Text>
            ))}
          </BlurView>
        </View>
      )}
    </TouchableOpacity>
  );
};

const FilteredDot = ({ dotInfo, selectedDot, setSelectedDot, eventList }) => {
  const filteredData = eventList.filter(
    (each) => each.location === dotInfo.name
  );
  return (
    filteredData.length > 0 && (
      <Dot
        dot={dotInfo}
        setSelectedDot={setSelectedDot}
        selectedDot={selectedDot}
        key={dotInfo.name}
        eventList={filteredData}
      />
    )
  );
};

const Legend = () => (
  <View
    style={{
      ...styles.dot,
      borderRadius: styles.dot.borderRadius,
      overflow: "hidden",
      top: "5%",

      right: "10%",
    }}>
    <BlurView style={{ padding: 10 }}>
      {eventType.map((each) => (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 10,
          }}>
          <View
            style={{
              backgroundColor: each.color,
              width: 10,
              height: 10,
            }}></View>
          <Text>{each.name}</Text>
        </View>
      ))}
    </BlurView>
  </View>
);

const Map = () => {
  const [selectedDot, setSelectedDot] = useState(null);
  const [imageHeight, setImageHeight] = useState(windowHeight);
  const [events, setEvents] = useState(dummyData);
  Image.getSize(require("../../assets/map.png"), (width, height) => {
    const scaleFactor = width / windowWidth;
    const imageHeight = height / scaleFactor;
    setImageHeight(imageHeight);
  });

  return (
    <SafeAreaView style={{ backgroundColor: "black" }}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={() => setSelectedDot(null)}>
          <ImageBackground
            source={require("../../assets/map.png")}
            style={{
              ...styles.mainContainer,
              width: windowWidth,
              height: imageHeight,
            }}>
            <Legend />
            {dotsList.map((each) => (
              <FilteredDot
                dotInfo={each}
                selectedDot={selectedDot}
                setSelectedDot={setSelectedDot}
                eventList={events}
              />
            ))}
          </ImageBackground>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: windowWidth,
  },
  dot: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    minHeight: 10,
    minWidth: 10,
    position: "absolute",
    transform: [{ rotate: "90deg" }],
    borderRadius: 5,
  },
});

export default Map;