import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import TechCultEventCard from "../Components/TechCultEventCard";
const CultEventScreen = ({ data, navigation }) => {
  console.log("cult", data);
  return (
    <View style={styles.eventsContainer}>
      {/* <TechCultEventCard data={data[0].data} /> */}
      <FlatList
        data={data}
        renderItem={(itemData) => {
          return <TechCultEventCard data={itemData} navigation={navigation} />;
        }}
        keyExtractor={(item, index) => {
          return item.data.details.title + index;
        }}
        alwaysBounceVertical={false}
      />
    </View>
  );
};

export default CultEventScreen;

const styles = StyleSheet.create({
  eventsContainer: {
    flex: 5,
    maxHeight: "60%",
  },
});
